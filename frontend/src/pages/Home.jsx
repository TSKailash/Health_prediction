import React, { useState, useEffect } from 'react';
import { Heart, Shield, Users, Clock, CheckCircle, Phone, Mail, MapPin, Star, ArrowRight, Activity, Stethoscope, Calendar, Award, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HealthCheckupLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    checkups: 0,
    satisfaction: 0
  });
  const navigate=useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    // Check for stored user
    const storedUser = localStorage.getItem("user") || null;

    if (storedUser) {
      setUser(storedUser);
    }
    
    // Animate stats
    const animateStats = () => {
      const targets = { patients: 50000, doctors: 150, checkups: 75000, satisfaction: 98 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          patients: Math.floor(targets.patients * progress),
          doctors: Math.floor(targets.doctors * progress),
          checkups: Math.floor(targets.checkups * progress),
          satisfaction: Math.floor(targets.satisfaction * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setStats(targets);
        }
      }, stepTime);
    };
    
    const timer = setTimeout(animateStats, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setActiveService(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(serviceInterval);
  }, []);

  // Navigation handlers
  const handleLogin = () => {
    console.log('Navigate to /login');
    navigate('/login')
  };

  const handleSignup = () => {
    console.log('Navigate to /signup');
    navigate('/signup') 
  };

  const handleHome = () => {
    if (user) {
      console.log(`Navigate to /${user}`);
      navigate(`/${user}`) 
    } else {
      console.log('Navigate to /');
      navigate('/')
    }
  };

  const handleProfile = () => {
    console.log('Navigate to /myprofile');
    navigate('/myprofile') 
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    console.log('User logged out, navigate to /');
    navigate('/') 
  };

  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cardiac Screening",
      description: "Comprehensive heart health assessment with advanced ECG and stress testing"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Full Body Checkup",
      description: "Complete health evaluation including blood work and imaging studies"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Specialist Consultation",
      description: "Access to expert doctors across various medical specialties"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Preventive Care",
      description: "Proactive health monitoring and disease prevention programs"
    }
  ];

  const testimonials = [
    { name: "Sarah Johnson", rating: 5, text: "Excellent service and very professional staff. The checkup was thorough and efficient." },
    { name: "Dr. Michael Chen", rating: 5, text: "As a physician myself, I appreciate their attention to detail and modern equipment." },
    { name: "Emily Rodriguez", rating: 5, text: "The online booking system is so convenient and the reports are delivered quickly." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
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
              <a onClick={()=>navigate('/about')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Reviews</a>
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

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Health is Our
                  <span className="block bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent animate-pulse">
                    Priority
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience comprehensive health checkups with cutting-edge technology 
                  and compassionate care from certified medical professionals.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center group" onClick={() => navigate('/signup')}>
                  Checkup
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stats.patients.toLocaleString()}+</div>
                  <div className="text-gray-600">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">{stats.doctors}+</div>
                  <div className="text-gray-600">Expert Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{stats.satisfaction}%</div>
                  <div className="text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-3xl transform rotate-6 opacity-20 animate-pulse"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300">
                      <Heart className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-bounce" />
                      <h3 className="font-semibold text-gray-800">Cardiology</h3>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300">
                      <Activity className="w-12 h-12 text-green-600 mx-auto mb-3 animate-bounce" style={{animationDelay: '0.2s'}} />
                      <h3 className="font-semibold text-gray-800">Diagnostics</h3>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300">
                      <Stethoscope className="w-12 h-12 text-purple-600 mx-auto mb-3 animate-bounce" style={{animationDelay: '0.4s'}} />
                      <h3 className="font-semibold text-gray-800">Consultation</h3>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300">
                      <Shield className="w-12 h-12 text-orange-600 mx-auto mb-3 animate-bounce" style={{animationDelay: '0.6s'}} />
                      <h3 className="font-semibold text-gray-800">Prevention</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From routine checkups to specialized screenings, we provide complete healthcare solutions
              tailored to your individual needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-l-4 ${
                  index === activeService ? 'border-blue-500 scale-105' : 'border-transparent'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                  index === 0 ? 'bg-red-100 text-red-600' :
                  index === 1 ? 'bg-blue-100 text-blue-600' :
                  index === 2 ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                } transition-all duration-300 hover:scale-110`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Why Choose HealthCare+?</h2>
              <div className="space-y-6">
                {[
                  { icon: <Clock className="w-6 h-6" />, title: "Quick & Convenient", desc: "Easy online booking with minimal wait times" },
                  { icon: <Award className="w-6 h-6" />, title: "Certified Professionals", desc: "Board-certified doctors and medical staff" },
                  { icon: <Shield className="w-6 h-6" />, title: "Advanced Technology", desc: "State-of-the-art medical equipment and facilities" },
                  { icon: <Users className="w-6 h-6" />, title: "Personalized Care", desc: "Tailored treatment plans for every patient" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 rounded-3xl transform -rotate-6 opacity-30"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Health Dashboard</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-green-800 font-semibold">Blood Pressure</span>
                        <span className="text-green-600 font-bold">120/80</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                        <div className="bg-green-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-800 font-semibold">Heart Rate</span>
                        <span className="text-blue-600 font-bold">72 BPM</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                        <div className="bg-blue-500 h-2 rounded-full w-4/5 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-800 font-semibold">Cholesterol</span>
                        <span className="text-purple-600 font-bold">180 mg/dL</span>
                      </div>
                      <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                        <div className="bg-purple-500 h-2 rounded-full w-2/3 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What Our Patients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Prioritize Your Health?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Book your comprehensive health checkup today and take the first step towards a healthier tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
              <Calendar className="mr-2 w-5 h-5" />
              Book Appointment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
              Call Us Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
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
                <button onClick={handleHome} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                  Home
                </button>
                <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                  About
                </button>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300">Reviews</a></li>
                <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
                  Contact
                </button>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Health Checkups</li>
                <li className="text-gray-400">Diagnostic Tests</li>
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
    </div>
  );
};

export default HealthCheckupLanding;