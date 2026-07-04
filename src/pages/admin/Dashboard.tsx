import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { Users, Building2, Briefcase, TrendingUp, Activity, CheckCircle, Clock, AlertCircle, Sparkles, MapPin, Mail, Phone, User, Send } from "lucide-react";
import { getCompanyOpenings, getStudentApplications, saveStudentApplication, type StudentApplication } from "../../services/companyPortal";

const AdminDashboard: React.FC = () => {
  const { isLoading, dashboardStats, loadDashboard, activityLogs, loadActivityLogs, companies, loadCompanies } = useAdmin();
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [selectedOpeningId, setSelectedOpeningId] = useState<number | null>(null);
  const [studentApplications, setStudentApplications] = useState<StudentApplication[]>([]);
  const [applicationForm, setApplicationForm] = useState({
    companyName: '',
    role: '',
    internType: '',
    studentName: '',
    school: '',
    phone: '',
    email: '',
    portfolio: '',
  });

  useEffect(() => {
    loadDashboard();
    loadActivityLogs();
    loadCompanies();
    setStudentApplications(getStudentApplications());
  }, []);

  const selectedCompany = useMemo(
    () => companies.find((company) => company.id === selectedCompanyId) ?? null,
    [companies, selectedCompanyId]
  );

  const selectedCompanyOpenings = useMemo(
    () => (selectedCompany ? getCompanyOpenings(selectedCompany.user.email) : []),
    [selectedCompany]
  );

  const selectedOpening = useMemo(
    () => selectedCompanyOpenings.find((opening) => opening.id === selectedOpeningId) ?? selectedCompanyOpenings[0] ?? null,
    [selectedCompanyOpenings, selectedOpeningId]
  );

  useEffect(() => {
    if (selectedCompany) return;

    const preferredCompany = companies.find((company) => company.company_name.toLowerCase() === 'admingreat and co');
    if (preferredCompany) {
      setSelectedCompanyId(preferredCompany.id);
      return;
    }

    if (companies.length > 0) {
      setSelectedCompanyId(companies[0].id);
    }
  }, [companies, selectedCompany]);

  useEffect(() => {
    if (!selectedCompany) return;

    const openings = selectedCompanyOpenings;
    setSelectedOpeningId(openings[0]?.id ?? null);
    setApplicationForm((current) => ({
      ...current,
      companyName: selectedCompany.company_name,
      role: openings[0]?.role || current.role,
      internType: openings[0]?.internType || current.internType,
    }));
  }, [selectedCompany, selectedCompanyOpenings]);

  useEffect(() => {
    if (!selectedOpening) return;

    setApplicationForm((current) => ({
      ...current,
      role: selectedOpening.role,
      internType: selectedOpening.internType,
      companyName: selectedCompany?.company_name || current.companyName,
    }));
  }, [selectedCompany?.company_name, selectedOpening]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "placed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "interview":
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const stats = [
    {
      label: "Total Students",
      value: dashboardStats?.total_students || 0,
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Companies",
      value: dashboardStats?.total_companies || 0,
      icon: <Building2 className="w-8 h-8" />,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      label: "Total Placements",
      value: dashboardStats?.total_placements || 0,
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-amber-500 to-amber-600",
    },
    {
      label: "Placement Rate",
      value: `${dashboardStats?.placement_rate.toFixed(1) || 0}%`,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const handleApplicationSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedCompany) return;

    saveStudentApplication({
      openingId: selectedOpening?.id ?? selectedCompanyId ?? selectedCompany.id,
      companyEmail: selectedCompany.user.email,
      companyName: applicationForm.companyName.trim(),
      role: applicationForm.role.trim(),
      internType: applicationForm.internType.trim(),
      fullName: applicationForm.studentName.trim(),
      school: applicationForm.school.trim(),
      phone: applicationForm.phone.trim(),
      email: applicationForm.email.trim(),
      portfolio: applicationForm.portfolio.trim(),
      coverNote: '',
    });

    setStudentApplications(getStudentApplications());
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to the IT Placement System Admin Dashboard</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dashboardStats?.status_breakdown && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Placement Status Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(dashboardStats.status_breakdown).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(status)}
                        <span className="capitalize text-gray-700">{status.replace("_", " ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#003366] h-2 rounded-full"
                            style={{
                              width: `${
                                dashboardStats.total_placements > 0
                                  ? (count / dashboardStats.total_placements) * 100
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {activityLogs.length > 0 ? (
                  activityLogs.slice(0, 8).map((log) => (
                    <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="p-2 bg-[#003366]/10 rounded-lg">
                        <Activity className="w-4 h-4 text-[#003366]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{log.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(log.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.02fr_0.98fr] gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-[#003366]/10 text-[#003366]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Student application form</h3>
                  <p className="text-sm text-gray-600">Lecturers can submit internship applications directly from the admin dashboard.</p>
                </div>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      Company name
                    </span>
                    <select
                      value={selectedCompanyId ?? ''}
                      onChange={(event) => setSelectedCompanyId(Number(event.target.value))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-900"
                    >
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.company_name}
                        </option>
                      ))}
                    </select>
                  </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        Available role
                      </span>
                      <select
                        value={selectedOpeningId ?? ''}
                        onChange={(event) => {
                          const nextOpeningId = Number(event.target.value);
                          setSelectedOpeningId(nextOpeningId);
                          const nextOpening = selectedCompanyOpenings.find((opening) => opening.id === nextOpeningId);
                          if (nextOpening) {
                            setApplicationForm((current) => ({
                              ...current,
                              role: nextOpening.role,
                              internType: nextOpening.internType,
                              companyName: selectedCompany?.company_name || current.companyName,
                            }));
                          }
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-gray-900"
                        required
                      >
                        {selectedCompanyOpenings.length === 0 ? (
                          <option value="">No openings available</option>
                        ) : (
                          selectedCompanyOpenings.map((opening) => (
                            <option key={opening.id} value={opening.id}>
                              {opening.role}
                            </option>
                          ))
                        )}
                      </select>
                    </label>
                </div>

                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Available roles for {applicationForm.companyName || 'selected company'}</p>
                  {selectedCompanyOpenings.length > 0 ? (
                    <div className="space-y-2 text-sm text-gray-600">
                      {selectedCompanyOpenings.map((opening) => (
                        <div key={opening.id} className="flex items-center justify-between gap-4 rounded-lg bg-white px-3 py-2 border border-gray-100">
                          <div>
                            <p className="font-medium text-gray-900">{opening.role}</p>
                            <p>{opening.internType} · {opening.location}</p>
                          </div>
                          <span className="text-xs uppercase tracking-[0.2em] text-[#003366]">{opening.status}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">This company has not posted any openings yet.</p>
                  )}
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        Intern type
                      </span>
                      <input
                        type="text"
                        value={applicationForm.internType}
                        onChange={(event) => setApplicationForm({ ...applicationForm, internType: event.target.value })}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-[#003366]/10 transition-all outline-none"
                        required
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        Student name
                      </span>
                      <input
                        type="text"
                        value={applicationForm.studentName}
                        onChange={(event) => setApplicationForm({ ...applicationForm, studentName: event.target.value })}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-[#003366]/10 transition-all outline-none"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        School
                      </span>
                      <input
                        type="text"
                        value={applicationForm.school}
                        onChange={(event) => setApplicationForm({ ...applicationForm, school: event.target.value })}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-[#003366]/10 transition-all outline-none"
                        required
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        Phone number
                      </span>
                      <input
                        type="tel"
                        value={applicationForm.phone}
                        onChange={(event) => setApplicationForm({ ...applicationForm, phone: event.target.value })}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-[#003366]/10 transition-all outline-none"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        Email address
                      </span>
                      <input
                        type="email"
                        value={applicationForm.email}
                        onChange={(event) => setApplicationForm({ ...applicationForm, email: event.target.value })}
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-[#003366]/10 transition-all outline-none"
                        required
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        Company location
                      </span>
                      <input
                        type="text"
                        value={selectedCompany?.location || ''}
                        readOnly
                        className="w-full px-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 outline-none"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 block">
                    <span className="text-sm font-medium text-gray-700">Portfolio / profile link</span>
                    <input
                      type="url"
                      value={applicationForm.portfolio}
                      onChange={(event) => setApplicationForm({ ...applicationForm, portfolio: event.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#003366] focus:ring-4 focus:ring-[#003366]/10 transition-all outline-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#003366] text-white font-semibold hover:bg-[#003366]/90 transition-colors"
                  >
                    Submit application
                    <Send className="w-4 h-4" />
                  </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Forwarded applications</h3>
              <div className="space-y-4 max-h-[28rem] overflow-y-auto pr-1">
                {studentApplications.length > 0 ? studentApplications.map((application) => (
                  <div key={application.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{application.fullName}</p>
                        <p className="text-sm text-[#003366] mt-1">{application.companyName}</p>
                        <p className="text-sm text-gray-600 mt-1">{application.role} · {application.internType}</p>
                      </div>
                      <div className="text-xs text-gray-400">{new Date(application.appliedAt).toLocaleDateString()}</div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium text-gray-800">School:</span> {application.school}</p>
                      <p><span className="font-medium text-gray-800">Phone:</span> {application.phone}</p>
                      <p><span className="font-medium text-gray-800">Email:</span> {application.email}</p>
                      {application.portfolio && <p><span className="font-medium text-gray-800">Portfolio:</span> {application.portfolio}</p>}
                    </div>
                  </div>
                )) : (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
                    No student applications have been submitted yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;