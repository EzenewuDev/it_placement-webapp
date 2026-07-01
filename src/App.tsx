import { useState, useCallback, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { siteConfig } from './config';
import type { Product } from './config';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import SubHero from './sections/SubHero';
import VideoSection from './sections/VideoSection';
import Products from './sections/Products';
import Features from './sections/Features';
import Blog from './sections/Blog';
import FAQ from './sections/FAQ';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Payment from './pages/Payment';
import Loader from './components/ui/Loader';
import BackToTop from './components/ui/BackToTop';
import { AdminProvider } from './context/AdminContext';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import StudentsPage from './pages/admin/Students';
import CompaniesPage from './pages/admin/Companies';
import PlacementsPage from './pages/admin/Placements';
import ActivityLogsPage from './pages/admin/ActivityLogs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Home Page Component
const HomePage = ({ onAddToCart }: { onAddToCart: (product: Product) => void }) => (
  <main>
    <Hero />
    <SubHero />
    <VideoSection />
    <Products onAddToCart={onAddToCart} />
    <Features />
    <Blog />
    <FAQ />
    <About />
    <Contact />
  </main>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
  }, []);

  const handleRemoveFromCart = useCallback((id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleLogin = useCallback((type: string) => {
    setIsLoggedIn(true);
    setUserType(type);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUserType('');
  }, []);

  return (
    <Router>
      {isLoading && <Loader />}
      <BackToTop />
      <div 
        className={`min-h-screen bg-white transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`} 
        lang={siteConfig.language || undefined}
      >
        <Routes>
          {/* Auth Routes */}
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={<Signup onSignup={handleLogin} />} 
          />
          
          {/* Payment Route */}
          <Route 
            path="/payment" 
            element={
              <Payment 
                cartItems={cartItems} 
                clearCart={handleClearCart}
              />
            } 
          />
          
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              isLoggedIn && userType === 'admin' ? (
                <AdminProvider>
                  <AdminLayout onLogout={handleLogout}>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/students" element={<StudentsPage />} />
                      <Route path="/companies" element={<CompaniesPage />} />
                      <Route path="/placements" element={<PlacementsPage />} />
                      <Route path="/activity-logs" element={<ActivityLogsPage />} />
                      <Route path="*" element={<Navigate to="/admin" replace />} />
                    </Routes>
                  </AdminLayout>
                </AdminProvider>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Home Route */}
          <Route 
            path="/" 
            element={
              <>
                <Navigation
                  cartItems={cartItems}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  isLoggedIn={isLoggedIn}
                  userType={userType}
                  onLogout={handleLogout}
                />
                <HomePage onAddToCart={handleAddToCart} />
                <Footer />
              </>
            } 
          />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
