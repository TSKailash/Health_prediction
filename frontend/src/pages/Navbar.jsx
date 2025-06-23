import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Check for stored user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Navigation handlers
  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleHome = () => {
    if (user) {
      navigate(`/${user}`);
    } else {
      navigate('/');
    }
  };

  const handleProfile = () => {
    navigate('/myprofile');
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-700 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHome}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              HealthCare+
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={handleHome} 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Home
            </button>
            <a onClick={()=>navigate('/about')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              About
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              Reviews
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
              Contact
            </a>

            {/* Conditional Authentication Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
                  onClick={handleProfile}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-600 font-medium hover:text-red-800 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300" 
                  onClick={handleLogin}
                >
                  Log in
                </button>
                <button 
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium rounded-full hover:scale-105 shadow-lg hover:shadow-blue-300/50 transition-all duration-300"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
              onClick={() => {/* Add mobile menu toggle logic */}}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - You can expand this as needed */}
        <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleHome}
              className="text-left text-gray-700 hover:text-blue-600 transition-colors duration-300 px-3 py-2"
            >
              Home
            </button>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 px-3 py-2">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 px-3 py-2">
              About
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 px-3 py-2">
              Reviews
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 px-3 py-2">
              Contact
            </a>
            
            {user ? (
              <div className="flex flex-col space-y-2 px-3 pt-2 border-t border-gray-200">
                <button 
                  className="flex items-center space-x-2 text-left text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 py-2"
                  onClick={handleProfile}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-left text-red-600 font-medium hover:text-red-800 transition-colors duration-300 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-3 pt-2 border-t border-gray-200">
                <button 
                  className="text-left text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 py-2" 
                  onClick={handleLogin}
                >
                  Log in
                </button>
                <button 
                  className="text-left bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium rounded-full px-4 py-2 hover:scale-105 shadow-lg transition-all duration-300 w-fit"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;