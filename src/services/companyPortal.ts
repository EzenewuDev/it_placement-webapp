export type PortalUserType = 'student' | 'company' | 'admin';

export interface PortalSession {
  userType: PortalUserType;
  email: string;
}

export interface CompanyOpening {
  id: number;
  companyEmail: string;
  companyName: string;
  role: string;
  internType: string;
  location: string;
  description: string;
  requirements: string;
  status: 'Open' | 'Closed';
  postedAt: string;
}

export interface StudentApplication {
  id: number;
  openingId: number;
  companyEmail: string;
  companyName: string;
  role: string;
  internType: string;
  fullName: string;
  school: string;
  phone: string;
  email: string;
  portfolio: string;
  coverNote: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  appliedAt: string;
}

const AUTH_SESSION_KEY = 'lcu-portal-session';
const OPENINGS_KEY = 'lcu-company-openings';
const APPLICATIONS_KEY = 'lcu-student-applications';
const APPLICATION_ACCESS_KEY = 'lcu-application-access';
const ADMIN_GREAT_COMPANY_EMAIL = 'hello@admingreat.co';

export const normalizeCompanyEmail = (email: string) => {
  const lowerEmail = email.toLowerCase();
  if (lowerEmail === 'admin@sips.edu.ng' || lowerEmail === 'admin@lcu.edu.ng' || lowerEmail.includes('admingreat')) {
    return ADMIN_GREAT_COMPANY_EMAIL;
  }

  return email;
};

const readArray = <T,>(key: string): T[] => {
  if (typeof window === 'undefined') return [];

  const storedValue = window.localStorage.getItem(key);
  if (!storedValue) return [];

  try {
    return JSON.parse(storedValue) as T[];
  } catch {
    return [];
  }
};

const writeArray = <T,>(key: string, value: T[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getPortalSession = (): PortalSession | null => {
  if (typeof window === 'undefined') return null;

  const storedValue = window.localStorage.getItem(AUTH_SESSION_KEY);
  if (!storedValue) return null;

  try {
    return JSON.parse(storedValue) as PortalSession;
  } catch {
    return null;
  }
};

export const setPortalSession = (session: PortalSession) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
};

export const clearPortalSession = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(AUTH_SESSION_KEY);
};

export const isApplicationAccessGranted = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(APPLICATION_ACCESS_KEY) === 'true';
};

export const setApplicationAccessGranted = (granted: boolean) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(APPLICATION_ACCESS_KEY, granted ? 'true' : 'false');
};

export const clearApplicationAccess = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(APPLICATION_ACCESS_KEY);
};

export const getCompanyOpenings = (companyEmail?: string) => {
  const openings = readArray<CompanyOpening>(OPENINGS_KEY);
  if (!companyEmail) {
    return openings.filter((opening) => opening.status === 'Open');
  }

  const normalizedEmail = normalizeCompanyEmail(companyEmail);
  return openings.filter((opening) => normalizeCompanyEmail(opening.companyEmail) === normalizedEmail);
};

export const saveCompanyOpening = (opening: Omit<CompanyOpening, 'id' | 'postedAt' | 'status'> & Partial<Pick<CompanyOpening, 'status'>>) => {
  const openings = readArray<CompanyOpening>(OPENINGS_KEY);
  const newOpening: CompanyOpening = {
    ...opening,
    companyEmail: normalizeCompanyEmail(opening.companyEmail),
    id: Date.now(),
    postedAt: new Date().toISOString(),
    status: opening.status ?? 'Open',
  };

  const nextOpenings = [newOpening, ...openings];
  writeArray(OPENINGS_KEY, nextOpenings);
  return newOpening;
};

export const updateCompanyOpening = (openingId: number, updates: Partial<CompanyOpening>) => {
  const openings = readArray<CompanyOpening>(OPENINGS_KEY);
  const nextOpenings = openings.map((opening) =>
    opening.id === openingId ? { ...opening, ...updates } : opening
  );

  writeArray(OPENINGS_KEY, nextOpenings);
};

export const getStudentApplications = (companyEmail?: string) => {
  const applications = readArray<StudentApplication>(APPLICATIONS_KEY);
  if (!companyEmail) return applications;

  const normalizedEmail = normalizeCompanyEmail(companyEmail);
  return applications.filter((application) => normalizeCompanyEmail(application.companyEmail) === normalizedEmail);
};

export const saveStudentApplication = (application: Omit<StudentApplication, 'id' | 'appliedAt' | 'status'> & Partial<Pick<StudentApplication, 'status'>>) => {
  const applications = readArray<StudentApplication>(APPLICATIONS_KEY);
  const newApplication: StudentApplication = {
    ...application,
    id: Date.now(),
    status: application.status ?? 'Pending',
    appliedAt: new Date().toISOString(),
  };

  const nextApplications = [newApplication, ...applications];
  writeArray(APPLICATIONS_KEY, nextApplications);
  return newApplication;
};

export const updateStudentApplication = (applicationId: number, updates: Partial<StudentApplication>) => {
  const applications = readArray<StudentApplication>(APPLICATIONS_KEY);
  const nextApplications = applications.map((application) =>
    application.id === applicationId ? { ...application, ...updates } : application
  );

  writeArray(APPLICATIONS_KEY, nextApplications);
};
