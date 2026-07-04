import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle, 
  FileText, 
  ArrowLeft,
  Building,
  User,
  Calendar,
  Hash
} from 'lucide-react';
import { setApplicationAccessGranted } from '../services/companyPortal';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface PaymentProps {
  cartItems?: CartItem[];
  clearCart?: () => void;
}

const Payment = ({ cartItems = [], clearCart }: PaymentProps) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal > 0 ? 75 : 0; // ₦75 VAT fee
  const total = subtotal + vat;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setTransactionId(`LCU-${Date.now()}`);
    setIsComplete(true);
    setApplicationAccessGranted(true);
    
    if (clearCart) {
      clearCart();
    }
    
    // Redirect after showing success
    setTimeout(() => {
      navigate('/');
    }, 4000);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 lg:p-12 text-center animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-2">
            Your application has been submitted successfully.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Transaction ID: <span className="font-mono text-[#8b6d4b]">{transactionId}</span>
          </p>
          <div className="bg-emerald-50 rounded-xl p-4 mb-8">
            <p className="text-emerald-700 text-sm">
              You will receive a confirmation email shortly. Check your dashboard for application status.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 lg:p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            You haven't added any items to your application cart yet.
          </p>
          <Link
            to="/#products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all duration-300"
          >
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 lg:py-12 px-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-[#8b6d4b]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#8b6d4b]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-[#8b6d4b] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3">
            Complete Your Payment
          </h1>
          <p className="text-gray-600">
            Secure payment processing for your IT Placement application
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              {/* Payment Method Tabs */}
              <div className="flex gap-3 mb-8">
                {[
                  { id: 'card', label: 'Card Payment', icon: CreditCard },
                  { id: 'bank', label: 'Bank Transfer', icon: Building },
                  { id: 'ussd', label: 'USSD', icon: Hash },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                        paymentMethod === method.id
                          ? 'border-[#8b6d4b] bg-[#8b6d4b]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-[#8b6d4b]' : 'text-gray-400'}`} />
                      <span className={`text-xs font-medium ${paymentMethod === method.id ? 'text-[#8b6d4b]' : 'text-gray-600'}`}>
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none font-mono text-lg"
                        required
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                        <div className="w-10 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded" />
                        <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Card Holder Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      placeholder="Name as shown on card"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none"
                      required
                    />
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) })}
                        placeholder="MM/YY"
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-gray-400" />
                        CVV
                      </label>
                      <input
                        type="password"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        placeholder="123"
                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#8b6d4b] focus:ring-4 focus:ring-[#8b6d4b]/10 transition-all duration-300 outline-none font-mono"
                        required
                      />
                    </div>
                  </div>

                  {/* Save Card */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.saveCard}
                      onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-[#8b6d4b] focus:ring-[#8b6d4b]"
                    />
                    <span className="text-gray-600">Save card for future payments</span>
                  </label>

                  {/* Security Badge */}
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl">
                    <ShieldCheck className="w-8 h-8 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-800">Secure Payment</p>
                      <p className="text-sm text-emerald-600">Your payment information is encrypted and secure</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-5 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay ₦{total.toLocaleString()}
                      </>
                    )}
                  </button>
                </form>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="font-semibold text-amber-800 mb-4">Bank Transfer Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-amber-700">Bank Name:</span>
                        <span className="font-medium text-amber-900">First Bank of Nigeria</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700">Account Name:</span>
                        <span className="font-medium text-amber-900">Lead City University</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700">Account Number:</span>
                        <span className="font-mono font-medium text-amber-900">0123456789</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-700">Amount:</span>
                        <span className="font-medium text-amber-900">₦{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Please make the transfer and click the button below to confirm your payment.
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full py-5 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all duration-300 disabled:opacity-70"
                  >
                    {isProcessing ? 'Confirming...' : 'I Have Made the Transfer'}
                  </button>
                </div>
              )}

              {paymentMethod === 'ussd' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-800 mb-4">USSD Payment</h3>
                    <p className="text-blue-700 text-sm mb-4">
                      Dial the code below on your registered mobile number:
                    </p>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <code className="text-xl font-mono text-blue-900">*894*Amount*0123456789#</code>
                    </div>
                    <p className="text-blue-600 text-sm mt-4 text-center">
                      Amount: ₦{total.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full py-5 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all duration-300 disabled:opacity-70"
                  >
                    {isProcessing ? 'Confirming...' : 'I Have Completed the USSD Transfer'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 sticky top-8">
              <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8b6d4b]" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                      <p className="text-[#8b6d4b] font-semibold text-sm">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (3.75%)</span>
                  <span>₦{vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#8b6d4b]">₦{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                <Lock className="w-5 h-5 text-emerald-600" />
                <p className="text-xs text-gray-600">
                  Secured by 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
