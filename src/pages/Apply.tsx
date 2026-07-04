import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CheckCircle2, Mail, MapPin, Phone, Sparkles, User } from 'lucide-react';
import {
  getCompanyOpenings,
  saveStudentApplication,
} from '../services/companyPortal';

const initialForm = {
  fullName: '',
  school: '',
  phone: '',
  email: '',
  portfolio: '',
  coverNote: '',
};

const Apply = () => {
  const openings = useMemo(() => getCompanyOpenings(), []);
  const [selectedOpeningId, setSelectedOpeningId] = useState<number | null>(openings[0]?.id ?? null);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedOpening = openings.find((opening) => opening.id === selectedOpeningId) ?? null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedOpening) return;

    saveStudentApplication({
      openingId: selectedOpening.id,
      companyEmail: selectedOpening.companyEmail,
      companyName: selectedOpening.companyName,
      role: selectedOpening.role,
      internType: selectedOpening.internType,
      fullName: formData.fullName.trim(),
      school: formData.school.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      portfolio: formData.portfolio.trim(),
      coverNote: formData.coverNote.trim(),
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="relative max-w-lg w-full rounded-3xl bg-white/90 backdrop-blur border border-gray-100 shadow-2xl p-8 sm:p-10 text-center overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#8b6d4b]/10 blur-3xl" />
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="font-serif text-3xl text-gray-900 mb-3">Application submitted</h1>
            <p className="text-gray-600 leading-relaxed mb-8">
              Your details have been sent to {selectedOpening?.companyName}. The company dashboard will show your application so they can reach out.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-medium hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-[#8b6d4b] hover:text-[#8b6d4b] transition-colors"
              >
                Company Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-[#8b6d4b]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#8b6d4b]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <header className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-xl px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b6d4b]/10 text-[#8b6d4b] text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4" />
              Student Application
            </div>
            <h1 className="font-serif text-3xl text-gray-900">Apply for an internship role</h1>
            <p className="text-gray-500 mt-1">Choose an open role and share your details with the company.</p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-[#8b6d4b] hover:text-[#8b6d4b] transition-colors"
          >
            Return Home
          </Link>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-6 items-start">
          <div className="rounded-3xl bg-white/90 backdrop-blur border border-gray-100 shadow-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#8b6d4b]/10 flex items-center justify-center text-[#8b6d4b]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-gray-900">Open roles</h2>
                <p className="text-sm text-gray-500">Select the role you want to apply for.</p>
              </div>
            </div>

            <div className="space-y-4 max-h-[38rem] overflow-y-auto pr-1">
              {openings.map((opening) => (
                <button
                  key={opening.id}
                  onClick={() => setSelectedOpeningId(opening.id)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all ${
                    selectedOpeningId === opening.id
                      ? 'border-[#8b6d4b] bg-[#8b6d4b]/5 shadow-lg shadow-[#8b6d4b]/10'
                      : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#8b6d4b] font-medium">{opening.companyName}</p>
                      <h3 className="font-serif text-xl text-gray-900 mt-2">{opening.role}</h3>
                      <p className="text-sm text-gray-500 mt-1">{opening.internType}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {opening.location}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">{opening.description}</p>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    <span className="font-medium text-gray-800">Requirements:</span> {opening.requirements}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/90 backdrop-blur border border-gray-100 shadow-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#8b6d4b]/10 flex items-center justify-center text-[#8b6d4b]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-gray-900">Application form</h2>
                <p className="text-sm text-gray-500">Send your details to {selectedOpening?.companyName}.</p>
              </div>
            </div>

            {selectedOpening ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8b6d4b] font-medium">Selected role</p>
                  <p className="font-serif text-xl text-gray-900 mt-1">{selectedOpening.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedOpening.companyName} · {selectedOpening.internType}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Full name
                    </span>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                      required
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      School
                    </span>
                    <input
                      type="text"
                      value={formData.school}
                      onChange={(event) => setFormData({ ...formData, school: event.target.value })}
                      placeholder="Lead City University"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                      required
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Phone number
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                      required
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email address
                    </span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                      required
                    />
                  </label>
                </div>

                <label className="space-y-2 block">
                  <span className="text-sm font-medium text-gray-700">Portfolio or LinkedIn</span>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(event) => setFormData({ ...formData, portfolio: event.target.value })}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none"
                  />
                </label>

                <label className="space-y-2 block">
                  <span className="text-sm font-medium text-gray-700">Short cover note</span>
                  <textarea
                    value={formData.coverNote}
                    onChange={(event) => setFormData({ ...formData, coverNote: event.target.value })}
                    rows={4}
                    placeholder="Tell the company why you want the role and what you can bring."
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all outline-none resize-none"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all"
                >
                  Apply now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-500">
                No company openings have been posted yet. Once a company publishes a role, it will appear here for students to apply.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Apply;
