import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Search, Instagram, Facebook, Twitter, User, LogOut, ChevronDown, GraduationCap } from 'lucide-react';
import { navigationConfig } from '../config';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface NavigationProps {
  cartItems: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  isLoggedIn?: boolean;
  userType?: string;
  onLogout?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Instagram,
  Facebook,
  Twitter,
};

const Navigation = ({ 
  cartItems, 
  onRemoveFromCart, 
  onUpdateQuantity, 
  isLoggedIn = false, 
  userType = '',
  onLogout 
}: NavigationProps) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!navigationConfig.brandName) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal > 0 ? 75 : 0;
  const total = subtotal + vat;

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/payment');
  };

  const handleLogoutClick = () => {
    setShowUserMenu(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-[70px] px-4 sm:px-6 md:px-12 lg:px-[170px]">
          <Link
            to="/"
            className="group flex items-center gap-3 hover:opacity-100 transition-all duration-300"
          >
            <div className={`p-2 rounded-xl transition-all duration-500 ${
              isScrolled ? 'bg-[#8b6d4b] shadow-lg shadow-[#8b6d4b]/20' : 'bg-white/10 backdrop-blur-md border border-white/20'
            }`}>
              <GraduationCap 
                className={`w-6 h-6 transition-colors duration-500 ${
                  isScrolled ? 'text-white' : 'text-white'
                }`} 
              />
            </div>
            <div className="flex flex-col">
              <span 
                className={`font-serif text-xl sm:text-2xl tracking-tight leading-none transition-colors duration-500 ${
                  isScrolled ? 'text-black' : 'text-white'
                }`}
              >
                {navigationConfig.brandName}
              </span>
              <span className={`text-[10px] tracking-[0.2em] uppercase font-medium transition-colors duration-500 ${
                isScrolled ? 'text-[#8b6d4b]' : 'text-white/60'
              }`}>
                Placement Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationConfig.menuLinks.slice(0, 5).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm font-medium hover:text-[#8b6d4b] transition-colors"
                style={{ color: isScrolled ? '#333' : '#fff' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-black/5 rounded-full transition-all"
              style={{ color: isScrolled ? '#8b6d4b' : '#fff' }}
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs text-white bg-gradient-to-br from-[#8b6d4b] to-[#6d5639] rounded-full animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all duration-300 hover:shadow-lg ${
                    isScrolled 
                      ? 'border-[#8b6d4b] text-[#8b6d4b] hover:bg-[#8b6d4b] hover:text-white' 
                      : 'border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white' 
                      : 'bg-white text-black'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 p-2 rounded-full transition-all ${
                    isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                  }`}
                  style={{ color: isScrolled ? '#333' : '#fff' }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#8b6d4b] to-[#6d5639] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium capitalize">{userType}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 capitalize">{userType} Account</p>
                      <p className="text-xs text-gray-500">Logged in</p>
                    </div>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 w-7 p-2 hover:bg-black/5 rounded transition-all"
            >
              <span
                className={`h-[2px] w-full transition-all duration-300 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                }`}
              />
              <span
                className={`h-[2px] w-full transition-all duration-300 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                }`}
              />
            </button>

            {/* Desktop Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hidden lg:flex flex-col gap-1.5 w-7 hover:bg-black/5 rounded p-1 transition-all"
            >
              <span
                className={`h-[2px] w-full transition-all duration-300 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                }`}
              />
              <span
                className={`h-[2px] w-full transition-all duration-300 ${
                  isScrolled ? 'bg-black' : 'bg-white'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-700 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-white" />
        <div className="relative h-full flex">
          <div className="flex-1 flex flex-col justify-center items-center px-8 lg:px-20">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 lg:right-20 p-2 hover:opacity-60 transition-opacity"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            {/* Mobile Auth Buttons */}
            {!isLoggedIn && (
              <div className="flex lg:hidden items-center gap-4 mb-8">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-2 text-sm font-medium rounded-full border-2 border-[#8b6d4b] text-[#8b6d4b]"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white"
                >
                  Get Started
                </Link>
              </div>
            )}

            <div className="w-full max-w-md mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder={navigationConfig.searchPlaceholder}
                  className="w-full py-3 border-b-2 border-[#8b6d4b] bg-transparent focus:outline-none font-light text-lg"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8b6d4b]" size={20} />
              </div>
            </div>

            <nav className="flex flex-col items-center gap-4 sm:gap-6">
              {navigationConfig.menuLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-serif text-2xl sm:text-3xl lg:text-[45px] text-black hover:text-[#8b6d4b] transition-colors duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease ${index * 0.1}s`,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-6 mt-12">
              {navigationConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-[#696969] hover:text-[#8b6d4b] transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {navigationConfig.menuBackgroundImage && (
            <div
              className="hidden lg:block w-[40%] bg-cover bg-center"
              style={{
                backgroundImage: `url(${navigationConfig.menuBackgroundImage})`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'all 0.7s ease 0.2s',
              }}
            />
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-[#8b6d4b]/5 to-transparent">
              <div>
                <h3 className="font-serif text-2xl">Your Application</h3>
                <p className="text-sm text-gray-500">{totalItems} item(s)</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-gray-400" strokeWidth={1} />
                  </div>
                  <p className="text-[#696969] text-lg mb-2">{navigationConfig.cartEmptyText}</p>
                  <p className="text-gray-400 text-sm mb-6">Add items to get started</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-3 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 transition-all duration-300"
                  >
                    {navigationConfig.continueShoppingText}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-[#8b6d4b] font-semibold mt-1">₦{item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-[#8b6d4b] hover:text-[#8b6d4b] transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:border-[#8b6d4b] hover:text-[#8b6d4b] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>VAT Fee</span>
                    <span>₦{vat.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-[#8b6d4b]">₦{total.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-[#8b6d4b] to-[#6d5639] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#8b6d4b]/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {navigationConfig.cartCheckoutText}
                  <span>→</span>
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 mt-3 text-[#696969] font-medium hover:text-black transition-colors"
                >
                  {navigationConfig.continueShoppingText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
