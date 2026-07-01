const API_BASE_URL = "http://localhost:8000";

export interface Student {
  id: number;
  user_id: number;
  matric_number: string;
  department: string;
  level?: string;
  skills?: string;
  resume_url?: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  preferred_location?: string;
  bio?: string;
  is_profile_complete: boolean;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  };
  created_at: string;
}

export interface Company {
  id: number;
  user_id: number;
  company_name: string;
  industry: string;
  location: string;
  description?: string;
  website?: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  is_verified: boolean;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
  };
  created_at: string;
}

export interface Placement {
  id: number;
  student_id: number;
  company_id: number;
  job_requirement_id?: number;
  status: string;
  match_score?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: number;
  activity_type: string;
  description: string;
  admin_id?: number;
  student_id?: number;
  company_id?: number;
  placement_id?: number;
  ip_address?: string;
  created_at: string;
}

export interface MatchingResult {
  student: Student;
  match_score: number;
  matched_skills: string[];
}

export interface DashboardStats {
  total_students: number;
  total_companies: number;
  total_placements: number;
  placed_students: number;
  placement_rate: number;
  status_breakdown: Record<string, number>;
  recent_activities: ActivityLog[];
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem("auth_token");
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: "Unknown error",
      }));
      throw new Error(error.detail || "Request failed");
    }

    return response.json();
  }

  async login(email: string, password: string, userType: string) {
    return this.request<{ access_token: string; token_type: string }>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password, user_type: userType }),
    });
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>("/admin/dashboard/stats");
  }

  async getStudents(params?: {
    department?: string;
    skip?: number;
    limit?: number;
  }): Promise<Student[]> {
    const searchParams = new URLSearchParams();
    if (params?.department) searchParams.append("department", params.department);
    if (params?.skip !== undefined) searchParams.append("skip", params.skip.toString());
    if (params?.limit !== undefined) searchParams.append("limit", params.limit.toString());
    return this.request<Student[]>(`/admin/students?${searchParams.toString()}`);
  }

  async getStudent(id: number): Promise<Student> {
    return this.request<Student>(`/admin/students/${id}`);
  }

  async updateStudent(id: number, data: Partial<Student>): Promise<Student> {
    return this.request<Student>(`/admin/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteStudent(id: number): Promise<void> {
    return this.request<void>(`/admin/students/${id}`, {
      method: "DELETE",
    });
  }

  async getCompanies(params?: {
    industry?: string;
    skip?: number;
    limit?: number;
  }): Promise<Company[]> {
    const searchParams = new URLSearchParams();
    if (params?.industry) searchParams.append("industry", params.industry);
    if (params?.skip !== undefined) searchParams.append("skip", params.skip.toString());
    if (params?.limit !== undefined) searchParams.append("limit", params.limit.toString());
    return this.request<Company[]>(`/admin/companies?${searchParams.toString()}`);
  }

  async getCompany(id: number): Promise<Company> {
    return this.request<Company>(`/admin/companies/${id}`);
  }

  async updateCompany(id: number, data: Partial<Company>): Promise<Company> {
    return this.request<Company>(`/admin/companies/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteCompany(id: number): Promise<void> {
    return this.request<void>(`/admin/companies/${id}`, {
      method: "DELETE",
    });
  }

  async verifyCompany(id: number): Promise<Company> {
    return this.request<Company>(`/admin/companies/${id}/verify`, {
      method: "POST",
    });
  }

  async getPlacements(params?: {
    status?: string;
    skip?: number;
    limit?: number;
  }): Promise<Placement[]> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append("status", params.status);
    if (params?.skip !== undefined) searchParams.append("skip", params.skip.toString());
    if (params?.limit !== undefined) searchParams.append("limit", params.limit.toString());
    return this.request<Placement[]>(`/admin/placements?${searchParams.toString()}`);
  }

  async updatePlacement(id: number, data: Partial<Placement>): Promise<Placement> {
    return this.request<Placement>(`/admin/placements/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async forwardProfile(placementId: number): Promise<void> {
    return this.request<void>(`/admin/placements/${placementId}/forward`, {
      method: "POST",
    });
  }

  async bulkForward(placementIds: number[]): Promise<void> {
    return this.request<void>("/admin/placements/bulk", {
      method: "POST",
      body: JSON.stringify(placementIds),
    });
  }

  async findMatches(
    companyId: number,
    jobRequirementId?: number,
    requiredSkills?: string,
    location?: string
  ): Promise<MatchingResult[]> {
    return this.request<MatchingResult[]>("/admin/matching/find", {
      method: "POST",
      body: JSON.stringify({
        company_id: companyId,
        job_requirement_id: jobRequirementId,
        required_skills: requiredSkills,
        location,
      }),
    });
  }

  async autoMatch(
    companyId: number,
    minScore: number = 50,
    jobRequirementId?: number
  ): Promise<{ message: string; placements_count: number }> {
    const searchParams = new URLSearchParams();
    searchParams.append("min_score", minScore.toString());
    return this.request(`/admin/matching/auto?${searchParams.toString()}`, {
      method: "POST",
      body: JSON.stringify({
        company_id: companyId,
        job_requirement_id: jobRequirementId,
      }),
    });
  }

  async getActivityLogs(params?: {
    activity_type?: string;
    skip?: number;
    limit?: number;
  }): Promise<ActivityLog[]> {
    const searchParams = new URLSearchParams();
    if (params?.activity_type) searchParams.append("activity_type", params.activity_type);
    if (params?.skip !== undefined) searchParams.append("skip", params.skip.toString());
    if (params?.limit !== undefined) searchParams.append("limit", params.limit.toString());
    return this.request<ActivityLog[]>(`/admin/activity-logs?${searchParams.toString()}`);
  }
}

export const apiService = new ApiService();