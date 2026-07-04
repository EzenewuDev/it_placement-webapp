import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { apiService } from "../services/adminApi";
import type { Student, Company, Placement, ActivityLog, DashboardStats, MatchingResult } from "../services/adminApi";

// Mock data for demo
const mockStudents: Student[] = [
  {
    id: 1,
    user_id: 1,
    matric_number: "LCU/UG/22/CS/001",
    department: "Computer Science",
    level: "400",
    skills: "Python, JavaScript, React, Node.js, SQL",
    preferred_location: "Lagos",
    bio: "Passionate software developer with experience in web development and mobile apps.",
    github_url: "https://github.com/seunadebayo",
    linkedin_url: "https://linkedin.com/in/seunadebayo",
    is_profile_complete: true,
    user: {
      id: 1,
      email: "oluwaseun.adebayo@lcu.edu.ng",
      first_name: "Oluwaseun",
      last_name: "Adebayo",
      phone: "+234 801 234 5678",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 2,
    matric_number: "LCU/UG/22/CS/002",
    department: "Information Technology",
    level: "300",
    skills: "Java, Spring Boot, Python, Data Science",
    preferred_location: "Abuja",
    bio: "IT enthusiast focused on data analytics and backend development.",
    github_url: "https://github.com/fatimamohammed",
    linkedin_url: "https://linkedin.com/in/fatimamohammed",
    is_profile_complete: true,
    user: {
      id: 2,
      email: "fatima.mohammed@lcu.edu.ng",
      first_name: "Fatima",
      last_name: "Mohammed",
      phone: "+234 802 345 6789",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    user_id: 3,
    matric_number: "LCU/UG/21/SE/001",
    department: "Software Engineering",
    level: "400",
    skills: "TypeScript, Angular, Node.js, AWS, Docker",
    preferred_location: "Lagos",
    bio: "Full stack developer with cloud computing experience.",
    github_url: "https://github.com/chideraokoro",
    linkedin_url: "https://linkedin.com/in/chideraokoro",
    is_profile_complete: true,
    user: {
      id: 3,
      email: "chidera.okoro@lcu.edu.ng",
      first_name: "Chidera",
      last_name: "Okoro",
      phone: "+234 803 456 7890",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    user_id: 4,
    matric_number: "LCU/UG/22/CS/003",
    department: "Computer Science",
    level: "300",
    skills: "Python, Machine Learning, TensorFlow, Data Analysis",
    preferred_location: "Kano",
    bio: "AI and machine learning enthusiast.",
    github_url: "https://github.com/ibrahimyusuf",
    is_profile_complete: false,
    user: {
      id: 4,
      email: "ibrahim.yusuf@lcu.edu.ng",
      first_name: "Ibrahim",
      last_name: "Yusuf",
      phone: "+234 804 567 8901",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    user_id: 5,
    matric_number: "LCU/UG/21/CY/001",
    department: "Cyber Security",
    level: "400",
    skills: "Cybersecurity, Network Security, Python, Ethical Hacking",
    preferred_location: "Lagos",
    bio: "Cyber security professional in training.",
    linkedin_url: "https://linkedin.com/in/zainababdullahi",
    is_profile_complete: true,
    user: {
      id: 5,
      email: "zainab.abdullahi@lcu.edu.ng",
      first_name: "Zainab",
      last_name: "Abdullahi",
      phone: "+234 805 678 9012",
    },
    created_at: new Date().toISOString(),
  },
];

const mockCompanies: Company[] = [
  {
    id: 0,
    user_id: 10,
    company_name: "admingreat and Co",
    industry: "Technology",
    location: "Lagos",
    description: "Internal company account used for lecturer-submitted internship applications.",
    website: "https://admingreat.co",
    contact_person: "Admin Great",
    contact_email: "hello@admingreat.co",
    contact_phone: "+234 800 000 0000",
    is_verified: true,
    user: {
      id: 10,
      email: "hello@admingreat.co",
      first_name: "Admin",
      last_name: "Great",
      phone: "+234 800 000 0000",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 1,
    user_id: 6,
    company_name: "Tech Nigeria Limited",
    industry: "Technology",
    location: "Lagos",
    description: "Leading technology company in Nigeria, providing innovative solutions.",
    website: "https://technigeria.com",
    contact_person: "Adewale Johnson",
    contact_email: "hr@technigeria.com",
    contact_phone: "+234 801 234 5678",
    is_verified: true,
    user: {
      id: 6,
      email: "hr@technigeria.com",
      first_name: "Tech",
      last_name: "Nigeria HR",
      phone: "+234 123 456 7890",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 7,
    company_name: "FinTech Solutions Nigeria",
    industry: "Finance",
    location: "Lagos",
    description: "Innovative financial technology company transforming banking.",
    website: "https://fintechsolutions.ng",
    contact_person: "Blessing Okafor",
    contact_email: "careers@fintechsolutions.ng",
    contact_phone: "+234 802 345 6789",
    is_verified: true,
    user: {
      id: 7,
      email: "careers@fintechsolutions.ng",
      first_name: "FinTech",
      last_name: "Solutions HR",
      phone: "+234 234 567 8901",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    user_id: 8,
    company_name: "Data Insights Analytics",
    industry: "Data Science",
    location: "Abuja",
    description: "Data analytics and business intelligence company.",
    website: "https://datainsights.ng",
    contact_person: "Ibrahim Musa",
    contact_email: "hr@datainsights.ng",
    contact_phone: "+234 803 456 7890",
    is_verified: true,
    user: {
      id: 8,
      email: "hr@datainsights.ng",
      first_name: "Data",
      last_name: "Insights HR",
      phone: "+234 345 678 9012",
    },
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    user_id: 9,
    company_name: "SecureTech Nigeria",
    industry: "Cybersecurity",
    location: "Lagos",
    description: "Cybersecurity solutions provider for businesses.",
    website: "https://securetech.ng",
    contact_person: "Fatima Abdullahi",
    contact_email: "careers@securetech.ng",
    contact_phone: "+234 804 567 8901",
    is_verified: false,
    user: {
      id: 9,
      email: "careers@securetech.ng",
      first_name: "Secure",
      last_name: "Tech HR",
      phone: "+234 456 789 0123",
    },
    created_at: new Date().toISOString(),
  },
];

const mockPlacements: Placement[] = [
  {
    id: 1,
    student_id: 1,
    company_id: 1,
    status: "shortlisted",
    match_score: 85.5,
    notes: "Excellent match for Python developer role",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    student_id: 2,
    company_id: 3,
    status: "forwarded",
    match_score: 78.0,
    notes: "Good data science candidate",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 3,
    student_id: 5,
    company_id: 4,
    status: "interview",
    match_score: 92.0,
    notes: "Perfect match for cybersecurity role",
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const mockActivityLogs: ActivityLog[] = [
  {
    id: 1,
    activity_type: "student_register",
    description: "Oluwaseun Adebayo registered as a new student",
    admin_id: 1,
    student_id: 1,
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 2,
    activity_type: "company_register",
    description: "Tech Nigeria Limited registered as a new company",
    admin_id: 1,
    company_id: 1,
    created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
  },
  {
    id: 3,
    activity_type: "matching",
    description: "Auto-matching completed for Tech Nigeria Limited, created 2 placements",
    admin_id: 1,
    company_id: 1,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 4,
    activity_type: "profile_forward",
    description: "Forwarded student profile to FinTech Solutions Nigeria",
    admin_id: 1,
    placement_id: 2,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

const mockDashboardStats: DashboardStats = {
  total_students: 5,
  total_companies: 4,
  total_placements: 3,
  placed_students: 1,
  placement_rate: 33.3,
  status_breakdown: {
    applied: 0,
    shortlisted: 1,
    forwarded: 1,
    interview: 1,
    selected: 0,
    rejected: 0,
    placed: 1,
  },
  recent_activities: mockActivityLogs,
};

interface AdminContextType {
  isLoading: boolean;
  dashboardStats: DashboardStats | null;
  students: Student[];
  companies: Company[];
  placements: Placement[];
  activityLogs: ActivityLog[];
  loadDashboard: () => Promise<void>;
  loadStudents: () => Promise<void>;
  loadCompanies: () => Promise<void>;
  loadPlacements: () => Promise<void>;
  loadActivityLogs: () => Promise<void>;
  updateStudent: (id: number, data: Partial<Student>) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  updateCompany: (id: number, data: Partial<Company>) => Promise<void>;
  deleteCompany: (id: number) => Promise<void>;
  verifyCompany: (id: number) => Promise<void>;
  updatePlacement: (id: number, data: Partial<Placement>) => Promise<void>;
  forwardProfile: (placementId: number) => Promise<void>;
  bulkForward: (placementIds: number[]) => Promise<void>;
  findMatches: (companyId: number, requiredSkills?: string, location?: string) => Promise<MatchingResult[]>;
  autoMatch: (companyId: number, minScore?: number) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      const stats = await apiService.getDashboardStats();
      setDashboardStats(stats);
    } catch {
      console.log("API not available, using mock dashboard data");
      setDashboardStats(mockDashboardStats);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getStudents();
      setStudents(data);
    } catch {
      console.log("API not available, using mock students data");
      setStudents(mockStudents);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getCompanies();
      setCompanies(data);
    } catch {
      console.log("API not available, using mock companies data");
      setCompanies(mockCompanies);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlacements = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getPlacements();
      setPlacements(data);
    } catch {
      console.log("API not available, using mock placements data");
      setPlacements(mockPlacements);
    } finally {
      setIsLoading(false);
    }
  };

  const loadActivityLogs = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getActivityLogs();
      setActivityLogs(data);
    } catch {
      console.log("API not available, using mock activity logs data");
      setActivityLogs(mockActivityLogs);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStudent = async (id: number, data: Partial<Student>) => {
    try {
      await apiService.updateStudent(id, data);
      await loadStudents();
    } catch {
      console.log("API not available, updating mock data");
      setStudents(prev => prev.map(student => 
        student.id === id ? { ...student, ...data } : student
      ));
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await apiService.deleteStudent(id);
      await loadStudents();
      await loadDashboard();
    } catch {
      console.log("API not available, updating mock data");
      setStudents(prev => prev.filter(student => student.id !== id));
    }
  };

  const updateCompany = async (id: number, data: Partial<Company>) => {
    try {
      await apiService.updateCompany(id, data);
      await loadCompanies();
    } catch {
      console.log("API not available, updating mock data");
      setCompanies(prev => prev.map(company => 
        company.id === id ? { ...company, ...data } : company
      ));
    }
  };

  const deleteCompany = async (id: number) => {
    try {
      await apiService.deleteCompany(id);
      await loadCompanies();
      await loadDashboard();
    } catch {
      console.log("API not available, updating mock data");
      setCompanies(prev => prev.filter(company => company.id !== id));
    }
  };

  const verifyCompany = async (id: number) => {
    try {
      await apiService.verifyCompany(id);
      await loadCompanies();
    } catch {
      console.log("API not available, updating mock data");
      setCompanies(prev => prev.map(company => 
        company.id === id ? { ...company, is_verified: true } : company
      ));
    }
  };

  const updatePlacement = async (id: number, data: Partial<Placement>) => {
    try {
      await apiService.updatePlacement(id, data);
      await loadPlacements();
      await loadDashboard();
    } catch {
      console.log("API not available, updating mock data");
      setPlacements(prev => prev.map(placement => 
        placement.id === id ? { ...placement, ...data, updated_at: new Date().toISOString() } : placement
      ));
    }
  };

  const forwardProfile = async (placementId: number) => {
    try {
      await apiService.forwardProfile(placementId);
      await loadPlacements();
    } catch {
      console.log("API not available, updating mock data");
      setPlacements(prev => prev.map(placement => 
        placement.id === placementId 
          ? { ...placement, status: "forwarded", updated_at: new Date().toISOString() } 
          : placement
      ));
    }
  };

  const bulkForward = async (placementIds: number[]) => {
    try {
      await apiService.bulkForward(placementIds);
      await loadPlacements();
    } catch {
      console.log("API not available, updating mock data");
      setPlacements(prev => prev.map(placement => 
        placementIds.includes(placement.id) 
          ? { ...placement, status: "forwarded", updated_at: new Date().toISOString() } 
          : placement
      ));
    }
  };

  const findMatches = async (companyId: number, requiredSkills?: string, location?: string) => {
    try {
      return await apiService.findMatches(companyId, undefined, requiredSkills, location);
    } catch {
      console.log("API not available, using mock matching");
      const matches: MatchingResult[] = [];
      
      mockStudents.forEach(student => {
        if (student.is_profile_complete) {
          matches.push({
            student,
            match_score: 70 + Math.random() * 30,
            matched_skills: student.skills ? student.skills.split(", ").slice(0, 3) : [],
          });
        }
      });
      
      matches.sort((a, b) => b.match_score - a.match_score);
      return matches.slice(0, 5);
    }
  };

  const autoMatch = async (companyId: number, minScore: number = 50) => {
    try {
      await apiService.autoMatch(companyId, minScore);
      await loadPlacements();
      await loadDashboard();
    } catch {
      console.log("API not available, simulating auto-match");
      const newPlacement: Placement = {
        id: Date.now(),
        student_id: 3,
        company_id: companyId,
        status: "shortlisted",
        match_score: 75.5,
        notes: "Auto-matched placement",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPlacements(prev => [...prev, newPlacement]);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isLoading,
        dashboardStats,
        students,
        companies,
        placements,
        activityLogs,
        loadDashboard,
        loadStudents,
        loadCompanies,
        loadPlacements,
        loadActivityLogs,
        updateStudent,
        deleteStudent,
        updateCompany,
        deleteCompany,
        verifyCompany,
        updatePlacement,
        forwardProfile,
        bulkForward,
        findMatches,
        autoMatch,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
