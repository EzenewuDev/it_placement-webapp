import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Building2, UserCog, Phone, MapPin, Check } from 'lucide-react';
import { setPortalSession } from '../services/companyPortal';

interface SignupProps {
  onSignup?: (userType: string, email: string) => void;
}

const Signup = ({ onSignup }: SignupProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'company' | 'admin'>('student');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    matricNumber: '',
    department: '',
    level: '',
    companyName: '',
    industry: '',
    location: '',
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setPortalSession({ userType, email: formData.email });
    if (onSignup) {
      onSignup(userType, formData.email);
    }
    if (userType === 'company') {
      navigate('/company/dashboard');
    } else if (userType === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const userTypes = [
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'from-blue-500 to-blue-600', description: 'Apply for IT placements' },
    { id: 'company', label: 'Company', icon: Building2, color: 'from-emerald-500 to-emerald-600', description: 'Post internship opportunities' },
    { id: 'admin', label: 'Admin', icon: UserCog, color: 'from-amber-500 to-amber-600', description: 'Manage the platform' },
  ] as const;

  const departments = ['Computer Science', 'Information Technology', 'Software Engineering', 'Cyber Security', 'Data Science'];
  const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Consulting', 'Other'];

  const renderStep1 = () => (
    <div className="space-y-5 animate-fadeIn">
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="John"
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Doe"
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
          required
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+234 123 456 7890"
          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
          required
        />
      </div>

      {/* User Type Specific Fields */}
      {userType === 'student' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Matric Number</label>
            <input
              type="text"
              value={formData.matricNumber}
              onChange={(e) => setFormData({ ...formData, matricNumber: e.target.value })}
              placeholder="LCU/UG/22/XXXXX"
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {userType === 'company' && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Company Ltd"
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Industry</label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
                required
              >
                <option value="">Select Industry</option>
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, State"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
                required
              />
            </div>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={() => setStep(2)}
        className="w-full py-4 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
      >
        Continue
        <span>→</span>
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5 animate-fadeIn">
      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Lock className="w-4 h-4 text-gray-400" />
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Create a strong password"
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 8+ chars</span>
          <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Uppercase</span>
          <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Number</span>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Confirm your password"
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl">
        <input
          type="checkbox"
          checked={formData.agreeTerms}
          onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
          className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#8b6d4b] focus:ring-[#8b6d4b]"
          required
        />
        <span className="text-sm text-gray-600">
          I agree to the{' '}
          <Link to="/terms" className="text-[#8b6d4b] hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-[#8b6d4b] hover:underline">Privacy Policy</Link>
        </span>
      </label>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#8b6d4b] hover:text-[#8b6d4b] transition-all duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading || !formData.agreeTerms}
          className="flex-[2] py-4 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-[#8b6d4b]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#8b6d4b]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10">
        {/* Left Side - Image & Info */}
        <div className="lg:w-5/12 bg-gradient-to-br from-[#8b6d4b] via-[#6d5639] to-[#4a3a26] p-8 lg:p-12 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                Join Us Today!
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Create your account to start your IT placement journey with Lead City University.
              </p>
            </div>

            <div className="flex-1" />

            {/* Progress Steps */}
            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${step >= 1 ? 'bg-white/20' : 'bg-white/5'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-white text-[#8b6d4b]' : 'bg-white/20'}`}>
                  1
                </div>
                <div>
                  <p className="font-medium text-sm">Personal Info</p>
                  <p className="text-white/60 text-xs">Basic details</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${step >= 2 ? 'bg-white/20' : 'bg-white/5'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-white text-[#8b6d4b]' : 'bg-white/20'}`}>
                  2
                </div>
                <div>
                  <p className="font-medium text-sm">Security</p>
                  <p className="text-white/60 text-xs">Password setup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-7/12 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-500">
                Select your account type to get started
              </p>
            </div>

            {/* User Type Selector */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {userTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setUserType(type.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                      userType === type.id
                        ? `border-[#8b6d4b] bg-[#8b6d4b]/5 shadow-lg shadow-[#8b6d4b]/10`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-xs font-medium ${userType === type.id ? 'text-[#8b6d4b]' : 'text-gray-600'}`}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 ? renderStep1() : renderStep2()}
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#8b6d4b] hover:text-[#6d5639] font-semibold transition-colors">
                Sign In
              </Link>
            </p>

            {/* Back to Home */}
            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
