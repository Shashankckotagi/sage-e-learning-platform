import { FormEvent, useState, useEffect } from 'react';
import {
  Search,
  Menu,
  X,
  Radio,
  Waves,
  Wifi,
  Antenna,
  Cpu,
  Zap,
  Star,
  Users,
  CheckCircle,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { ALL_COURSES, Course } from './data/coursesData';
import CategoryDetailView from './components/CategoryDetailView';
import SAGEAIAssistant from './components/SAGEAIAssistant';
import BlurText from './components/BlurText';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import TiltedCard from './components/TiltedCard';

const CATEGORIES = [
  { name: 'RF Engineering', icon: Radio, color: 'bg-orange-100 text-sage-orange' },
  { name: 'Microwave', icon: Waves, color: 'bg-blue-100 text-blue-600' },
  { name: 'Wireless', icon: Wifi, color: 'bg-green-100 text-green-600' },
  { name: 'Antennas', icon: Antenna, color: 'bg-purple-100 text-purple-600' },
  { name: 'Signal Processing', icon: Cpu, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Circuit Design', icon: Zap, color: 'bg-red-100 text-red-600' },
];

const COURSES = [
  ALL_COURSES.find(c => c.id === 1)!,
  ALL_COURSES.find(c => c.id === 11)!,
  ALL_COURSES.find(c => c.id === 21)!,
  ALL_COURSES.find(c => c.id === 31)!,
  ALL_COURSES.find(c => c.id === 41)!,
  ALL_COURSES.find(c => c.id === 51)!
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'John Anderson',
    role: 'Senior RF Engineer',
    text: 'SAGE provided me with the practical skills I needed to excel in my career. The instructors are true industry experts.',
    avatar: 'https://i.pravatar.cc/150?u=john'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Wireless Systems Architect',
    text: 'The 5G course was comprehensive and up-to-date with the latest industry standards. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?u=priya'
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    role: 'Graduate Student',
    text: 'As a student, the foundational courses in Microwave engineering were exactly what I needed to bridge the gap between theory and practice.',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  }
];

const AUTH_EMAIL = 'admin@sage.com';
const AUTH_PASSWORD = 'admin@123';
const AUTH_STORAGE_KEY = 'sage-authenticated';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Custom navigation & interaction states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [featuredTab, setFeaturedTab] = useState<'featured' | 'top'>('featured');
  const [enrolledCourse, setEnrolledCourse] = useState<Course | null>(null);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthenticated(window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft scroll-reset when category is updated
  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedCategory]);

  // Toast message auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Filtered/displayed courses based on search or active tab
  const displayedCourses = searchQuery
    ? ALL_COURSES.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : (featuredTab === 'featured'
      ? COURSES
      : ALL_COURSES.filter(c => c.rating >= 4.8).slice(0, 6)
    );

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (authEmail === AUTH_EMAIL && authPassword === AUTH_PASSWORD) {
      window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setAuthError('');
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
      setToastMessage('Successfully logged in as Admin.');
      return;
    }

    setAuthError('Invalid credentials. Use the provided SAGE admin login.');
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setIsMobileMenuOpen(false);
    setSelectedCategory(null);
    setViewingCourse(null);
    setEnrolledCourse(null);
    setAuthEmail('');
    setAuthPassword('');
    setAuthError('');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-sage-orange selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${(isScrolled || selectedCategory !== null) ? 'bg-sage-navy py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              onClick={() => {
                setSelectedCategory(null);
                setViewingCourse(null);
                setEnrolledCourse(null);
                setIsLoginModalOpen(false);
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <img src="/SAGE Hexagon Logo.png" alt="SAGE Logo" className="w-[46px] h-[46px] shrink-0 hover:rotate-6 transition-transform duration-300 object-contain" />
              <div className="flex flex-col text-white">
                <BlurText
                  text="SAGE"
                  delay={150}
                  animateBy="letters"
                  direction="top"
                  className="font-serif font-bold text-xl leading-none tracking-tight text-white"
                />
                <span className="text-[10px] uppercase tracking-widest opacity-80">Professional Education</span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'Courses', 'Tutorials', 'Workshops', 'Training', 'Consulting', 'About Us'].map((item) => (
                <a
                  key={item}
                  href={item === 'Home' || item === 'Courses' || item === 'About Us' ? undefined : '#'}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item === 'Home') {
                      setSelectedCategory(null);
                      setViewingCourse(null);
                      setEnrolledCourse(null);
                      setIsLoginModalOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else if (item === 'Courses') {
                      setSelectedCategory(null);
                      setTimeout(() => {
                        const el = document.getElementById('courses');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    } else if (item === 'About Us') {
                      setSelectedCategory(null);
                      setTimeout(() => {
                        const el = document.getElementById('about-us');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 50);
                    } else {
                      const messages: Record<string, string> = {
                        'Tutorials': 'Access to our interactive Jupyter notebooks and RF tutorials is coming soon.',
                        'Workshops': 'Our hands-on virtual RF modeling workshop calendar is being updated.',
                        'Training': 'Custom training paths for corporate teams are coming soon.',
                        'Consulting': 'Consulting bookings with Dr. Shastry will open next month.'
                      };
                      setToastMessage(messages[item]);
                    }
                  }}
                  className="text-sm font-semibold transition-colors hover:text-sage-orange cursor-pointer text-white/90"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-semibold px-4 py-2 transition-colors hover:text-sage-orange text-white cursor-pointer"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setToastMessage(`Signed in as ${AUTH_EMAIL}`)}
                    className="bg-sage-orange text-white text-sm font-bold px-6 py-2.5 rounded-md hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Admin Access
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-sage-orange text-white text-sm font-bold px-6 py-2.5 rounded-md hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle & Login */}
            <div className="lg:hidden flex items-center space-x-4">
              {!isAuthenticated ? (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-sage-orange text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-white text-xs font-semibold px-3 py-2 transition-colors hover:text-sage-orange cursor-pointer"
                >
                  Logout
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-sage-navy border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {['Home', 'Courses', 'Tutorials', 'Workshops', 'Training', 'Consulting', 'About Us'].map((item) => (
                  <a
                    key={item}
                    href={item === 'Home' || item === 'Courses' || item === 'About Us' ? undefined : '#'}
                    className="block px-3 py-4 text-base font-medium text-white hover:bg-white/10 rounded-md cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      if (item === 'Home') {
                        setSelectedCategory(null);
                        setViewingCourse(null);
                        setEnrolledCourse(null);
                        setIsLoginModalOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else if (item === 'Courses') {
                        setSelectedCategory(null);
                        setTimeout(() => {
                          const el = document.getElementById('courses');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 50);
                      } else if (item === 'About Us') {
                        setSelectedCategory(null);
                        setTimeout(() => {
                          const el = document.getElementById('about-us');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 50);
                      } else {
                        const messages: Record<string, string> = {
                          'Tutorials': 'Access to our interactive Jupyter notebooks and RF tutorials is coming soon.',
                          'Workshops': 'Our hands-on virtual RF modeling workshop calendar is being updated.',
                          'Training': 'Custom training paths for corporate teams are coming soon.',
                          'Consulting': 'Consulting bookings with Dr. Shastry will open next month.'
                        };
                        setToastMessage(messages[item]);
                      }
                    }}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 flex flex-col space-y-3 px-3">
                  {!isAuthenticated ? (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="w-full text-center py-3 bg-sage-orange text-white font-bold rounded-md cursor-pointer"
                    >
                      Login
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setToastMessage(`Signed in as ${AUTH_EMAIL}`);
                        }}
                        className="w-full text-center py-3 bg-sage-orange text-white font-bold rounded-md cursor-pointer"
                      >
                        Admin Access
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-center py-3 text-white font-bold border border-white/20 rounded-md cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setToastMessage('Registration is currently restricted to pre-approved corporate clients.');
                    }}
                    className="w-full text-center py-3 border border-white/10 text-white/70 font-semibold rounded-md cursor-pointer animate-pulse"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {selectedCategory !== null ? (
        <CategoryDetailView
          categoryName={selectedCategory}
          courses={ALL_COURSES.filter(c => c.category === selectedCategory)}
          onBack={() => setSelectedCategory(null)}
          onEnroll={(course) => setEnrolledCourse(course)}
        />
      ) : (
        <>
          {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
        {/* Premium Midnight & Electromagnetic Grid Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#070b19] via-[#0b1329] to-[#122240]" />
          
          {/* Radial glow spots */}
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-sage-orange/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" />
          
          {/* Subtle Electromagnetic grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04]" 
            style={{ 
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
              `, 
              backgroundSize: '40px 40px' 
            }}
          />
          
          {/* Concentric smith-chart-like design pattern in background */}
          <div className="absolute right-[5%] top-[10%] w-[600px] h-[600px] rounded-full border border-white/[0.02] flex items-center justify-center pointer-events-none">
            <div className="w-[450px] h-[450px] rounded-full border border-white/[0.03] flex items-center justify-center">
              <div className="w-[300px] h-[300px] rounded-full border border-white/[0.04] flex items-center justify-center">
                <div className="w-[150px] h-[150px] rounded-full border border-white/[0.05] border-dashed" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start text-left"
            >
              <span className="inline-block px-4 py-1.5 bg-white/5 text-sage-orange rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 shadow-sm">
                Excellence in RF & Wireless
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
                <BlurText
                  text="Master the Art of Microwave & RF Engineering"
                  delay={60}
                  animateBy="words"
                  direction="top"
                  highlightText="Microwave"
                  highlightClassName="bg-gradient-to-r from-sage-orange to-amber-500 bg-clip-text text-transparent font-black"
                />
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
                Unlock expert-led training in high-frequency engineering. Bridge the gap between electromagnetic theory and practical laboratory design.
              </p>
              
              {/* Sleek CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => {
                    const el = document.getElementById('courses');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sage-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-[0_10px_20px_rgba(232,101,10,0.3)] flex items-center gap-2 group cursor-pointer"
                >
                  Explore Courses <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('about-us');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  Our Consulting
                </button>
              </div>
            </motion.div>

            {/* Right Interactive Logo/Visual Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex justify-center items-center relative"
            >
              <div className="relative z-10 w-full max-w-[420px] aspect-square flex items-center justify-center">
                {/* Floating, glowing background ring */}
                <div className="absolute inset-0 bg-sage-orange/10 rounded-full blur-3xl animate-pulse"></div>
                
                {/* SAGE Brand Logo Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full cursor-pointer"
                >
                  <TiltedCard
                    altText="SAGE Hero Logo"
                    captionText="SAGE Global"
                    containerHeight="380px"
                    containerWidth="380px"
                    imageHeight="340px"
                    imageWidth="340px"
                    rotateAmplitude={14}
                    scaleOnHover={1.04}
                    showMobileWarning={false}
                    showTooltip={false}
                    displayOverlayContent={true}
                    className="mx-auto h-[380px] w-[380px]"
                    overlayContent={
                      <div className="relative flex h-[340px] w-[340px] items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.22)_0%,rgba(251,146,60,0.08)_36%,transparent_68%)] blur-2xl" />
                        <div className="absolute inset-[18%] rounded-full bg-white/8 blur-3xl" />
                        <img
                          src="/SAGE Hexagon Logo.png"
                          alt="SAGE Logo"
                          className="relative z-10 h-[320px] w-[320px] object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.42)]"
                        />
                      </div>
                    }
                  />
                </motion.div>
              </div>

              {/* Apple-Style Glassmorphic Floating Stats Badges */}
              {/* Bottom-left Badge */}
              <div className="absolute -bottom-6 -left-8 bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3)] z-20 flex items-center gap-4 transition-transform hover:-translate-y-1">
                <div className="w-11 h-11 bg-sage-orange/20 rounded-xl flex items-center justify-center text-sage-orange">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white leading-tight">15k+</p>
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Active Students</p>
                </div>
              </div>

              {/* Top-right Badge */}
              <div className="absolute -top-6 -right-6 bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3)] z-20 flex items-center gap-4 transition-transform hover:-translate-y-1">
                <div className="w-11 h-11 bg-sage-orange/20 rounded-xl flex items-center justify-center text-sage-orange">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white leading-tight">50+</p>
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Expert Courses</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

          {/* Course Categories */}
          <section className="py-24 bg-sage-accent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-sage-navy mb-4">Explore Top Categories</h2>
                <div className="w-24 h-1.5 bg-sage-orange mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {CATEGORIES.map((cat, idx) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full min-h-[220px]"
                  >
                    <TiltedCard
                      altText={cat.name}
                      captionText={cat.name}
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      rotateAmplitude={10}
                      scaleOnHover={1.05}
                      showMobileWarning={false}
                      showTooltip={true}
                      displayOverlayContent={true}
                      onClick={() => setSelectedCategory(cat.name)}
                      className="h-full w-full cursor-pointer"
                      overlayContent={
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group text-center flex h-full flex-col items-center justify-center border border-white/60">
                          <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                            <cat.icon size={32} />
                          </div>
                          <h3 className="font-bold text-sage-navy transition-colors group-hover:text-sage-orange">
                            {cat.name}
                          </h3>
                        </div>
                      }
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured & Top Courses Segment */}
          <section className="py-24" id="courses">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div className="max-w-2xl">
                  <span className="text-sage-orange font-bold text-xs uppercase tracking-widest bg-sage-accent px-3 py-1.5 rounded-full inline-block mb-3.5 shadow-sm">
                    SAGE Global Curriculum
                  </span>

                  {searchQuery ? (
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <h2 className="text-2xl md:text-4xl font-serif font-black text-sage-navy">
                        Search Results
                      </h2>
                      <span className="bg-sage-orange/10 text-sage-orange text-xs font-bold px-3 py-1 rounded-full">
                        {displayedCourses.length} matches
                      </span>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-gray-500 hover:text-sage-orange underline font-semibold transition-colors cursor-pointer"
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Tabs header instead of single title */}
                      <div className="flex gap-6 border-b border-gray-100 pb-2">
                        <button
                          onClick={() => setFeaturedTab('featured')}
                          className={`text-2xl md:text-4xl font-serif font-black relative pb-3 transition-all duration-300 cursor-pointer ${featuredTab === 'featured' ? 'text-sage-navy' : 'text-gray-400 hover:text-sage-navy/75'
                            }`}
                        >
                          Featured Courses
                          {featuredTab === 'featured' && (
                            <motion.div layoutId="course-tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-sage-orange rounded-full" />
                          )}
                        </button>
                        <button
                          onClick={() => setFeaturedTab('top')}
                          className={`text-2xl md:text-4xl font-serif font-black relative pb-3 transition-all duration-300 cursor-pointer ${featuredTab === 'top' ? 'text-sage-navy' : 'text-gray-400 hover:text-sage-navy/75'
                            }`}
                        >
                          Top Courses
                          {featuredTab === 'top' && (
                            <motion.div layoutId="course-tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-sage-orange rounded-full" />
                          )}
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm md:text-base mt-4 font-sans max-w-xl">
                        {featuredTab === 'featured'
                          ? "Hand-picked foundational and design courses curated by Shastry Associates to jumpstart your radio frequency systems path."
                          : "SAGE's gold-standard advanced programs showing our highest user feedback and professional industry ratings (>= 4.8)."
                        }
                      </p>
                    </>
                  )}
                </div>

                {!searchQuery && (
                  <button
                    onClick={() => setSelectedCategory('RF Engineering')}
                    className="text-sage-orange font-bold flex items-center gap-2 hover:gap-3 transition-all border-b-2 border-sage-orange pb-1 cursor-pointer text-sm"
                  >
                    Browse RF Studies <ChevronRight size={18} />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedCourses.length > 0 ? (
                  displayedCourses.map((course, idx) => (
                    <motion.div
                      key={`${featuredTab}-${course.id}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-gray-100 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-4 left-4 bg-sage-navy text-white text-[9px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md">
                            {course.category}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-1.5 text-yellow-500 mb-3">
                            <Star size={15} fill="currentColor" />
                            <span className="text-xs font-black text-sage-navy">{course.rating}</span>
                            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">({course.students} trainees)</span>
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-sage-navy mb-2 group-hover:text-sage-orange transition-colors leading-tight font-serif min-h-[50px] flex items-center">
                            {course.title}
                          </h3>
                          <p className="text-gray-500 text-xs mb-4">Under supervision of {course.instructor}</p>
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                            {"description" in course ? (course as any).description : "Advance your operational understanding with state-of-the-art simulation sandboxes, vector diagrams and analytical modeling guidelines."}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
                          <span className="text-xl md:text-2xl font-black text-sage-navy font-serif">{course.price}</span>
                          <button
                            onClick={() => {
                              const fullCourse = ALL_COURSES.find(c => c.id === course.id) || course;
                              setViewingCourse(fullCourse as Course);
                            }}
                            className="bg-sage-accent text-sage-orange text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-sage-orange hover:text-white transition-all cursor-pointer"
                          >
                            View Syllabus
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-lg mb-2">No courses found matching "{searchQuery}"</p>
                    <p className="text-gray-500 text-sm">Try using different keywords like "microwave", "RF", "design", or an instructor name.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Why SAGE Section */}
          <section id="about-us" className="py-24 bg-sage-navy text-white overflow-hidden relative">
            {/* Decorative Hexagon */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-sage-orange opacity-10 hexagon"></div>
            <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-white opacity-5 hexagon"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-4">Why Choose SAGE?</h2>
                <p className="text-white/60 max-w-2xl mx-auto text-lg">We provide more than just education; we provide the tools for your professional success in the wireless industry.</p>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <ScrollStack 
                  useWindowScroll={true} 
                  innerPaddingBottom="8rem"
                  itemDistance={80} 
                  itemScale={0.03} 
                  itemStackDistance={35} 
                  baseScale={0.92}
                  rotationAmount={-1}
                  blurAmount={1}
                >
                  {[
                    {
                      title: 'Expert Instructors',
                      desc: 'Learn from PhDs and industry veterans with decades of practical experience in RF and Microwave systems.',
                      icon: Award
                    },
                    {
                      title: 'Flexible Learning',
                      desc: 'Access your courses anytime, anywhere. Our platform is optimized for both desktop and mobile learning.',
                      icon: BookOpen
                    },
                    {
                      title: 'Industry Certifications',
                      desc: 'Earn recognized certificates that validate your expertise and help you stand out in the job market.',
                      icon: CheckCircle
                    }
                  ].map((feature) => (
                    <ScrollStackItem key={feature.title}>
                      <div className="bg-slate-950/88 backdrop-blur-2xl border border-white/12 p-8 md:p-10 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-6 max-w-3xl mx-auto shadow-2xl shadow-black/35 transition-all duration-300 hover:border-white/18">
                        <div className="w-16 h-16 shrink-0 bg-sage-orange/18 text-sage-orange rounded-2xl flex items-center justify-center shadow-inner ring-1 ring-white/10">
                          <feature.icon size={32} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-2xl font-bold mb-2 text-white font-serif">{feature.title}</h3>
                          <p className="text-white/82 leading-relaxed text-sm md:text-base font-sans">{feature.desc}</p>
                        </div>
                      </div>
                    </ScrollStackItem>
                  ))}
                </ScrollStack>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-sage-navy mb-4">What Our Students Say</h2>
                <div className="w-24 h-1.5 bg-sage-orange mx-auto rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, idx) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-sage-accent p-8 rounded-3xl relative"
                  >
                    <div className="absolute -top-6 left-8">
                      <div className="w-12 h-12 bg-sage-orange rounded-full flex items-center justify-center text-white shadow-lg">
                        <span className="text-2xl font-serif">"</span>
                      </div>
                    </div>
                    <p className="text-sage-navy/80 italic mb-8 pt-4 leading-relaxed">
                      {t.text}
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                      <div>
                        <h4 className="font-bold text-sage-navy">{t.name}</h4>
                        <p className="text-xs text-sage-orange font-bold uppercase tracking-wider">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-sage-orange rounded-[2rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Advance Your Career?</h2>
                  <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Join thousands of engineers who are already learning with SAGE. Start your journey today.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-white text-sage-orange px-10 py-4 rounded-xl font-black text-lg hover:bg-sage-navy hover:text-white transition-all shadow-xl">
                      Get Started Now
                    </button>
                    <button className="bg-sage-navy text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-opacity-90 transition-all shadow-xl">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      <footer className="bg-sage-navy text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img src="/SAGE Hexagon Logo.png" alt="SAGE Logo" className="w-[46px] h-[46px] shrink-0 object-contain" />
                <span className="font-serif font-bold text-2xl leading-none tracking-tight">SAGE</span>
              </div>
              <p className="text-white/60 leading-relaxed">
                Shastry Associates Global Enterprises (SAGE) is a leader in professional education for RF, Microwave, and Wireless Engineering.
              </p>
              <div className="flex space-x-4">
                {/* Social icons would go here */}
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-sage-orange transition-colors cursor-pointer">
                  <Wifi size={20} />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-sage-orange transition-colors cursor-pointer">
                  <Radio size={20} />
                </div>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-sage-orange transition-colors cursor-pointer">
                  <Antenna size={20} />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-8 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-sage-orange rounded-full"></span>
              </h4>
              <ul className="space-y-4 text-white/60">
                {['Home', 'Courses', 'Tutorials', 'Workshops', 'Training', 'Consulting', 'About Us'].map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-sage-orange transition-colors flex items-center gap-2">
                      <ChevronRight size={14} /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-bold mb-8 relative inline-block">
                Support
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-sage-orange rounded-full"></span>
              </h4>
              <ul className="space-y-4 text-white/60">
                {['Help Center', 'Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Sitemap', 'Career'].map(link => (
                  <li key={link}>
                    <a href="#" className="hover:text-sage-orange transition-colors flex items-center gap-2">
                      <ChevronRight size={14} /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-8 relative inline-block">
                Contact Us
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-sage-orange rounded-full"></span>
              </h4>
              <ul className="space-y-6 text-white/60">
                <li className="flex items-start gap-4">
                  <Mail className="text-sage-orange shrink-0" size={20} />
                  <span>info@shastryassociates.com</span>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="text-sage-orange shrink-0" size={20} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="text-sage-orange shrink-0" size={20} />
                  <span>123 Engineering Way, Tech City, TC 12345</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
            <p>SAGE © 2026. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* SAGE AI assistant floating panel */}
      <SAGEAIAssistant onSelectCourse={(course) => setViewingCourse(course)} />

      {/* Viewing / Syllabus Modal Panel */}
      <AnimatePresence>
        {viewingCourse && (
          <div className="fixed inset-0 bg-sage-navy/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2rem] max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col justify-between max-h-[85vh]"
            >
              <div className="overflow-y-auto p-8 space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="bg-sage-orange/10 text-sage-orange text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
                      {viewingCourse.category}
                    </span>
                    <h3 className="text-2xl font-serif font-black text-sage-navy mt-2.5 leading-tight">
                      {viewingCourse.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Instructor: {viewingCourse.instructor}</p>
                  </div>
                  <button
                    onClick={() => setViewingCourse(null)}
                    className="text-gray-400 hover:text-sage-navy hover:bg-gray-100 p-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="relative h-48 rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src={viewingCourse.image}
                    alt={viewingCourse.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex gap-4 text-white text-xs font-bold">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {viewingCourse.duration}</span>
                    <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {viewingCourse.rating} ({viewingCourse.students} students)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-sage-navy uppercase tracking-wider border-b pb-2">Academic Description</h4>
                  <p className="text-xs leading-relaxed text-gray-600 font-sans">
                    {viewingCourse.description}
                  </p>
                </div>

                <div className="bg-sage-accent/50 p-5 rounded-2xl border border-sage-orange/10 space-y-2">
                  <p className="text-xs font-bold text-sage-navy flex items-center gap-2">
                    <Sparkles size={14} className="text-sage-orange" /> Recommended Prerequisite Profile
                  </p>
                  <p className="text-xs text-gray-600">
                    Traiinees should have a baseline understanding of linear electromagnetic equations, vectors, basic circuit design, and signal behaviors. SAGE provides prep-materials prior to onboarding.
                  </p>
                </div>
              </div>

              {/* Modal footer */}
              <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tuition Fees</span>
                  <span className="text-2xl font-serif font-black text-sage-navy">{viewingCourse.price}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setViewingCourse(null)}
                    className="text-xs font-bold text-gray-500 hover:text-sage-navy px-5 py-3 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const selected = viewingCourse;
                      setViewingCourse(null);
                      setEnrolledCourse(selected);
                    }}
                    className="bg-sage-orange text-white text-xs font-bold px-7 py-3 rounded-xl hover:bg-sage-navy transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Confirm Enrollment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enrollment Celebration Dialog */}
      <AnimatePresence>
        {enrolledCourse && (
          <div className="fixed inset-0 bg-sage-navy/80 backdrop-blur-md z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-10 max-w-lg w-full text-center relative overflow-hidden shadow-2xl border border-gray-100"
            >
              {/* Confetti effect background elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-sage-orange/10 rounded-full blur-2xl"></div>

              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Check size={32} strokeWidth={3} />
              </div>

              <span className="bg-sage-accent text-sage-orange text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-3">
                Admission Successful
              </span>
              <h3 className="text-2xl font-serif font-black text-sage-navy mb-3">
                Welcome to SAGE Professional Education!
              </h3>
              <p className="text-xs text-gray-600 mb-6 font-sans leading-relaxed">
                You have been successfully registered for <span className="font-bold text-sage-navy">{enrolledCourse.title}</span>. Our admissions coordinator will forward the student dashboard guidelines, lab credentials, and live syllabus schedule straight to your registered address.
              </p>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left mb-6 flex items-center gap-4">
                <img
                  src={enrolledCourse.image}
                  alt={enrolledCourse.title}
                  className="w-16 h-16 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-xs text-sage-navy line-clamp-1">{enrolledCourse.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Under tutor: {enrolledCourse.instructor}</p>
                  <p className="text-[10px] text-sage-orange font-bold mt-0.5">{enrolledCourse.duration}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEnrolledCourse(null);
                  setToastMessage('SAGE student dashboard portal access is currently restricted to active VPC client networks.');
                }}
                className="w-full bg-sage-navy text-white text-xs font-bold py-3.5 rounded-xl hover:bg-sage-orange transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Enter Student Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-sage-navy/80 backdrop-blur-md z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900/90 border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] max-w-md w-full relative animate-fadeIn"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsLoginModalOpen(false);
                  setAuthError('');
                }}
                className="absolute top-6 right-6 text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="mb-6 text-white text-left">
                <p className="text-sage-orange text-xs font-bold uppercase tracking-[0.28em] mb-3">Demo Sign In</p>
                <h2 className="text-3xl font-black mb-3">Admin Portal Login</h2>
                <p className="text-white/65 text-sm leading-relaxed">
                  Sign in to access the protected SAGE learning portal.
                </p>
              </div>

              {/* Demo Credentials Box */}
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60 space-y-1 text-left">
                <span className="font-bold text-sage-orange uppercase tracking-wider block">Demo Credentials</span>
                <p>Email: <code className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">admin@sage.com</code></p>
                <p>Password: <code className="text-white bg-white/10 px-1.5 py-0.5 rounded font-mono">admin@123</code></p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2 text-left">
                  <label htmlFor="auth-email" className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                    Username / Email
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    value={authEmail}
                    onChange={(e) => {
                      setAuthEmail(e.target.value);
                      setAuthError('');
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-white outline-none transition-colors focus:border-sage-orange"
                    placeholder="admin@sage.com"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label htmlFor="auth-password" className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                    Password
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    value={authPassword}
                    onChange={(e) => {
                      setAuthPassword(e.target.value);
                      setAuthError('');
                    }}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-white outline-none transition-colors focus:border-sage-orange"
                    placeholder="••••••••"
                  />
                </div>

                {authError && (
                  <div className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm text-red-200 text-left">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-sage-orange text-white py-4 rounded-2xl font-black text-base hover:bg-opacity-90 transition-all shadow-[0_14px_30px_rgba(232,101,10,0.35)] cursor-pointer"
                >
                  Sign In to SAGE
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Alert Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] max-w-md w-[calc(100%-2rem)] md:w-auto md:min-w-[380px] bg-sage-navy/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl flex items-start gap-3.5 text-white"
          >
            <div className="p-2 bg-sage-orange/20 rounded-xl text-sage-orange shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-bold text-xs uppercase tracking-wider text-sage-orange">System Notice</h4>
              <p className="text-xs text-white/80 leading-relaxed font-sans">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/40 hover:text-white transition-colors cursor-pointer ml-auto"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

