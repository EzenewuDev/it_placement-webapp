import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  ClipboardList,
  LogOut,
  Mail,
  MapPin,
  PlusCircle,
  Send,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  clearPortalSession,
  getCompanyOpenings,
  getPortalSession,
  getStudentApplications,
  normalizeCompanyEmail,
  saveCompanyOpening,
  updateStudentApplication,
  type CompanyOpening,
  type StudentApplication,
} from '../../services/companyPortal';

const initialForm = {
  companyName: '',
  role: '',
  internType: '',
  location: '',
  description: '',
  requirements: '',
};

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [session] = useState(() => getPortalSession());
  const [openings, setOpenings] = useState<CompanyOpening[]>([]);
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!session || session.userType !== 'company') return;

    setOpenings(getCompanyOpenings(session.email));
    setApplications(getStudentApplications(session.email));

    if (!formData.companyName) {
      const normalizedEmail = normalizeCompanyEmail(session.email);
      setFormData((current) => ({
        ...current,
        companyName: normalizedEmail === 'hello@admingreat.co' ? 'admingreat and Co' : session.email.split('@')[0].replace(/[._-]/g, ' '),
      }));
    }
  }, [formData.companyName, session]);

  const summary = useMemo(
    () => [
      { label: 'Open roles', value: openings.length, icon: BriefcaseBusiness },
      { label: 'Applications', value: applications.length, icon: Users },
      { label: 'Active openings', value: openings.filter((opening) => opening.status === 'Open').length, icon: ClipboardList },
    ],
    [applications.length, openings]
  );

  if (!session || session.userType !== 'company') {
    return <Navigate to="/login" replace />;
  }

  const refreshData = () => {
    setOpenings(getCompanyOpenings(session.email));
    setApplications(getStudentApplications(session.email));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    saveCompanyOpening({
      companyEmail: session.email,
      companyName: formData.companyName.trim(),
      role: formData.role.trim(),
      internType: formData.internType.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      requirements: formData.requirements.trim(),
      status: 'Open',
    });

    setFormData((current) => ({
      ...initialForm,
      companyName: current.companyName,
    }));
    refreshData();
  };

  const handleLogout = () => {
    clearPortalSession();
    navigate('/login');
  };

  const handleAcceptApplication = (applicationId: number) => {
    updateStudentApplication(applicationId, { status: 'Accepted' });
    setApplications(getStudentApplications(session.email));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-[#8b6d4b]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#8b6d4b]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-xl px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b6d4b]/10 text-[#8b6d4b] text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              Company Portal
            </div>
            <h1 className="font-serif text-3xl text-gray-900">Company Dashboard</h1>
            <p className="text-gray-500 mt-1">Post open roles and review student applications forwarded from the admin portal.</p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-[#8b6d4b] hover:text-[#8b6d4b] transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summary.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl bg-white/90 backdrop-blur border border-gray-100 shadow-lg p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-2 font-serif text-3xl text-gray-900">{item.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#8b6d4b]/10 flex items-center justify-center text-[#8b6d4b]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          <div className="rounded-3xl bg-white/90 backdrop-blur border border-gray-100 shadow-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#8b6d4b]/10 flex items-center justify-center text-[#8b6d4b]">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-gray-900">Post a new opening</h2>
                <p className="text-sm text-gray-500">Share the role and the kind of interns you want.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    Company name
                  </span>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(event) => setFormData({ ...formData, companyName: event.target.value })}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <BriefcaseBusiness className="w-4 h-4 text-gray-400" />
                    Role open
                  </span>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(event) => setFormData({ ...formData, role: event.target.value })}
                    placeholder="Frontend Developer Intern"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                    required
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    Intern type
                  </span>
                  <input
                    type="text"
                    value={formData.internType}
                    onChange={(event) => setFormData({ ...formData, internType: event.target.value })}
                    placeholder="Frontend, backend, data analysis"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    Location
                  </span>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                    placeholder="Lagos, Abuja, Remote"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                    required
                  />
                </label>
              </div>

              <label className="space-y-2 block">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-gray-400" />
                  Job description
                </span>
                <textarea
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  rows={4}
                  placeholder="Explain the role, project scope, and expectations."
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none resize-none"
                  required
                />
              </label>

              <label className="space-y-2 block">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  Requirements
                </span>
                <textarea
                  value={formData.requirements}
                  onChange={(event) => setFormData({ ...formData, requirements: event.target.value })}
                  rows={3}
                  placeholder="List the skills, tools, or school level you want."
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none resize-none"
                  required
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all"
              >
                Publish opening
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl bg-white/90 backdrop-blur border border-gray-100 shadow-xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl text-gray-900">Current openings</h2>
                  <p className="text-sm text-gray-500">Roles posted under {session.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                {openings.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
                    No openings yet. Publish the first role to start receiving applications.
                  </div>
                ) : (
                  openings.map((opening) => (
                    <article key={opening.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[#8b6d4b] font-medium">{opening.status}</p>
                          <h3 className="mt-2 font-serif text-xl text-gray-900">{opening.role}</h3>
                          <p className="text-sm text-gray-500 mt-1">{opening.companyName}</p>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <CalendarClock className="w-4 h-4" />
                          {new Date(opening.postedAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium text-gray-800">Intern type:</span> {opening.internType}</p>
                        <p><span className="font-medium text-gray-800">Location:</span> {opening.location}</p>
                        <p className="leading-relaxed"><span className="font-medium text-gray-800">Description:</span> {opening.description}</p>
                        <p className="leading-relaxed"><span className="font-medium text-gray-800">Requirements:</span> {opening.requirements}</p>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white/90 backdrop-blur border border-gray-100 shadow-xl p-6 sm:p-8">
              <h2 className="font-serif text-2xl text-gray-900 mb-2">Student applications</h2>
              <p className="text-sm text-gray-500 mb-6">Students who clicked the form will appear here.</p>

              <div className="space-y-4 max-h-[34rem] overflow-y-auto pr-1">
                {applications.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
                    No applications have been submitted yet.
                  </div>
                ) : (
                  applications.map((application) => (
                    <article key={application.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{application.fullName}</h3>
                          <p className="text-sm text-[#8b6d4b] mt-1">{application.role} · {application.internType}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${application.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' : application.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                            {application.status}
                          </span>
                          <span className="text-xs text-gray-400">{new Date(application.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-600">
                        <p><span className="font-medium text-gray-800">School:</span> {application.school}</p>
                        <p><span className="font-medium text-gray-800">Phone:</span> {application.phone}</p>
                        <p><span className="font-medium text-gray-800">Email:</span> {application.email}</p>
                        {application.portfolio && <p><span className="font-medium text-gray-800">Portfolio:</span> {application.portfolio}</p>}
                        {application.coverNote && <p className="leading-relaxed"><span className="font-medium text-gray-800">Cover note:</span> {application.coverNote}</p>}
                      </div>

                      {application.status === 'Pending' && (
                        <button
                          onClick={() => handleAcceptApplication(application.id)}
                          className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-medium hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all"
                        >
                          Accept application
                        </button>
                      )}
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyDashboard;
