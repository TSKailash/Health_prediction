import React, { useEffect, useState } from 'react';
import { 
  Heart, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  User, 
  RefreshCw,
  TrendingUp,
  Target,
  Calendar,
  Award,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const Result = () => {
  const [result, setResult] = useState(null);
  const [tips, setTips] = useState([]);
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    const storedUser = localStorage.getItem("user") || null;
    if (storedUser) {
      setUser(storedUser);
    }

    const storedResult = localStorage.getItem("latestPrediction");
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
      
      fetch(`https://health-prediction-4.onrender.com/recommendations/${parsedResult.risk}`)
        .then(res => res.json())
        .then(data => {
          setTips(data.tips);
          setTimeout(() => setAnimateCards(true), 500);
        })
        .catch(err => {
          console.error("Failed to fetch recommendations", err);
          // Fallback tips
          const fallbackTips = parsedResult.risk === 'High' 
            ? [
                "Consult with a healthcare professional immediately",
                "Monitor your symptoms closely",
                "Follow prescribed medications regularly",
                "Maintain a heart-healthy diet",
                "Get adequate rest and manage stress"
              ]
            : [
                "Continue regular exercise routine",
                "Maintain balanced nutrition",
                "Schedule annual health checkups",
                "Stay hydrated throughout the day",
                "Practice stress management techniques"
              ];
          setTips(fallbackTips);
          setTimeout(() => setAnimateCards(true), 500);
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

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

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  if (!result) return null;

  const isHighRisk = result.risk === 'High';
  const confidencePercentage = Math.round(result.probability * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className={`fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-700 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHome}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                HealthCare+
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" onClick={handleHome} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Contact</a>

              {user ? (
                <div className="flex items-center space-x-4">
                  <button 
                    className="flex items-center space-x-2 px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 cursor-pointer"
                    onClick={handleProfile}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-600 font-medium hover:text-red-800 transition-colors duration-300 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    className="px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300 cursor-pointer" 
                    onClick={handleLogin}
                  >
                    Log in
                  </button>
                  <button 
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium rounded-full hover:scale-105 shadow-lg hover:shadow-blue-300/50 transition-all duration-300 cursor-pointer"
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

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Health Assessment
              <span className="block bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Results
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on your health data, we've analyzed your risk factors and prepared personalized recommendations.
            </p>
          </div>

          <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${isHighRisk ? 'from-red-400/10 to-orange-400/10' : 'from-green-400/10 to-blue-400/10'} opacity-50`}></div>
              
              <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isHighRisk ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} animate-pulse`}>
                      {isHighRisk ? <AlertTriangle className="w-10 h-10" /> : <CheckCircle className="w-10 h-10" />}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Risk Assessment</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-lg text-gray-600 mb-2">Risk Level</p>
                      <p className={`text-4xl font-bold ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
                        {result.risk}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-gray-600 mb-2">Confidence Level</p>
                      <p className="text-2xl font-semibold text-gray-800">{confidencePercentage}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${isHighRisk ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${confidencePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Health Indicators</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Activity className={`w-6 h-6 ${isHighRisk ? 'text-red-500' : 'text-green-500'}`} />
                          <span className="font-medium text-gray-800">Overall Health</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isHighRisk ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {isHighRisk ? 'Needs Attention' : 'Good'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-6 h-6 text-blue-500" />
                          <span className="font-medium text-gray-800">Risk Trend</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                          Analyzed
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                        <div className="flex items-center space-x-3">
                          <Target className="w-6 h-6 text-purple-500" />
                          <span className="font-medium text-gray-800">Confidence</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                          {confidencePercentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`mb-12 transition-all duration-1000 delay-500 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isHighRisk ? 'Urgent Recommendations' : 'Health Maintenance Tips'}
              </h2>
              <p className="text-xl text-gray-600">
                {isHighRisk 
                  ? 'Follow these important steps to address your health concerns'
                  : 'Keep up the great work with these healthy habits'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 ${isHighRisk ? 'border-red-500 hover:border-red-600' : 'border-green-500 hover:border-green-600'} opacity-0 animate-fadeInUp`}
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isHighRisk ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {isHighRisk ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`text-center space-y-6 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                onClick={() => navigate(`/checkup/${user}`)}
              >
                <RefreshCw className="mr-2 w-5 h-5 group-hover:animate-spin" />
                Take Another Assessment
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              {isHighRisk && (
                <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center">
                  <Calendar className="mr-2 w-5 h-5" />
                  Schedule Consultation
                </button>
              )}
            </div>

            {isHighRisk && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                  <h3 className="text-xl font-semibold text-red-800">Important Notice</h3>
                </div>
                <p className="text-red-700 text-center">
                  This assessment indicates potential health concerns. We strongly recommend consulting with a healthcare professional for proper evaluation and treatment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">HealthCare+</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Committed to providing exceptional healthcare services with compassion and excellence.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300">Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Health Checkups</li>
                <li className="text-gray-400">Risk Assessment</li>
                <li className="text-gray-400">Specialist Consultation</li>
                <li className="text-gray-400">Preventive Care</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">info@healthcareplus.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">123 Health Street, Medical City</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 HealthCare+. All rights reserved. Your health, our commitment.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Result;