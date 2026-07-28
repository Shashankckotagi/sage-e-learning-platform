import { useState } from 'react';
import {
  Briefcase,
  Compass,
  CheckCircle,
  MessageSquare,
  PhoneCall,
  FileText,
  Headphones,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Users,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CONSULTING_TRACKS,
  CONSULTING_STEPS,
  ConsultingTrack
} from '../data/consultingData';

interface ConsultingViewProps {
  onBackToHome: () => void;
  onSelectTrackContact: (trackName: string) => void;
}

export default function ConsultingView({ onBackToHome, onSelectTrackContact }: ConsultingViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'Recent Graduate' | 'Industry Engineer' | 'Team/Organization Training'>('Industry Engineer');

  const currentTrack: ConsultingTrack = CONSULTING_TRACKS.find(t => t.category === selectedCategory) || CONSULTING_TRACKS[1];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="text-sage-orange" size={24} />;
      case 'PhoneCall': return <PhoneCall className="text-blue-600" size={24} />;
      case 'FileText': return <FileText className="text-purple-600" size={24} />;
      case 'Headphones': return <Headphones className="text-green-600" size={24} />;
      default: return <Briefcase className="text-sage-orange" size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-sage-navy font-sans">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#070b19] via-[#0b1329] to-[#122240] text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{
               backgroundImage: `radial-gradient(circle at 50% 50%, #e8650a 0%, transparent 60%)`,
             }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-sage-orange rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/10 shadow-sm">
              Shastry Associates Global Enterprises
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight mb-6">
              Engineering <span className="text-sage-orange">Consulting</span>
            </h1>
            <p className="max-w-3xl mx-auto text-white/80 text-base md:text-lg leading-relaxed font-sans">
              Expert technical advisory, customized workforce development, and course mapping for engineers, researchers, and global tech organizations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sub-header Bar */}
      <div className="bg-slate-900 border-b border-white/10 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sage-orange">
            <Briefcase size={16} />
            <span>SAGE Technical Advisory & Services</span>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center space-x-1 text-xs text-white/60 hover:text-sage-orange transition-colors cursor-pointer"
          >
            <span>Back to Home</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* 1. Intro/Overview Section */}
        <section>
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 bg-sage-orange/10 rounded-xl text-sage-orange">
                <Briefcase size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage-orange">
                Overview
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-sage-navy">
              Consulting & Technical Advisory Services
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              <strong className="text-sage-navy font-semibold">Shastry Associates Global Enterprises (SAGE)</strong> offers comprehensive consulting services in RF, microwave, and wireless engineering — helping individuals and organizations with practical guidance, training direction, and technical problem-solving. Whether you are an engineer navigating complex electromagnetic design challenges or an enterprise building custom workforce capabilities, SAGE delivers tailored academic and technical direction.
            </p>
          </div>
        </section>

        {/* 2. "Find Your Course" Section */}
        <section id="pathway-selector">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 bg-sage-orange/10 rounded-xl text-sage-orange">
                <Compass size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage-orange">
                Pathway Selector
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-sage-navy mb-3">
              Find Your Course & Consulting Track
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Select your career stage or organization type below to explore recommended consulting pathways and courses.
            </p>
          </div>

          {/* Interactive Selection Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                category: 'Recent Graduate' as const,
                icon: GraduationCap,
                label: 'Recent Graduate',
                desc: 'Bachelor & Master graduates entering RF'
              },
              {
                category: 'Industry Engineer' as const,
                icon: Briefcase,
                label: 'Industry Engineer',
                desc: 'Practicing RF, Microwave & Systems Designers'
              },
              {
                category: 'Team/Organization Training' as const,
                icon: Users,
                label: 'Team / Organization',
                desc: 'Enterprise R&D & Technical Teams'
              }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedCategory === tab.category;
              return (
                <button
                  key={tab.category}
                  onClick={() => setSelectedCategory(tab.category)}
                  className={`p-6 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-sage-navy text-white border-sage-navy shadow-lg ring-2 ring-sage-orange'
                      : 'bg-white text-sage-navy border-gray-200 hover:border-sage-orange/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-sage-orange text-white' : 'bg-sage-orange/10 text-sage-orange'}`}>
                      <Icon size={24} />
                    </div>
                    {isSelected && (
                      <span className="bg-sage-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Active Track
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{tab.label}</h3>
                    <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Track Details Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
            >
              <div className="max-w-3xl">
                <span className="text-xs font-bold uppercase tracking-widest text-sage-orange bg-sage-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                  {currentTrack.category} Track
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-sage-navy mb-2">
                  {currentTrack.title}
                </h3>
                <p className="text-xs font-bold text-gray-500 mb-6">
                  {currentTrack.subtitle}
                </p>

                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-8">
                  {currentTrack.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8 pt-6 border-t border-gray-100">
                  {/* Key Benefits */}
                  <div>
                    <h4 className="text-sm font-bold text-sage-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle size={16} className="text-sage-orange" />
                      Key Benefits & Offerings
                    </h4>
                    <ul className="space-y-3">
                      {currentTrack.keyBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-sage-orange shrink-0 mt-2"></span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Courses */}
                  <div>
                    <h4 className="text-sm font-bold text-sage-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BookOpen size={16} className="text-sage-orange" />
                      Recommended Courses & Modules
                    </h4>
                    <ul className="space-y-3">
                      {currentTrack.recommendedCourses.map((course, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs md:text-sm font-bold text-sage-navy bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <ChevronRight size={14} className="text-sage-orange shrink-0" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Track Pathway Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => onSelectTrackContact(currentTrack.title)}
                    className="bg-sage-navy hover:bg-sage-orange text-white text-xs md:text-sm font-bold px-7 py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg cursor-pointer flex items-center space-x-2"
                  >
                    <span>Get in Touch for {currentTrack.category}</span>
                    <ArrowRight size={16} />
                  </button>

                  <a
                    href="#contact"
                    className="text-xs md:text-sm font-bold text-sage-navy hover:text-sage-orange px-5 py-3.5 transition-colors cursor-pointer"
                  >
                    Learn More & Contact
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 3. How Consulting Works Section */}
        <section>
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 bg-sage-orange/10 rounded-xl text-sage-orange">
                <FileText size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage-orange">
                Process Overview
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-sage-navy mb-3">
              How Consulting Works
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              A straightforward 4-step collaborative journey from initial requirement to continuous technical support.
            </p>
          </div>

          {/* Step Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONSULTING_STEPS.map((step) => (
              <motion.div
                key={step.stepNumber}
                whileHover={{ y: -4 }}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200/60">
                      {getStepIcon(step.iconName)}
                    </div>
                    <span className="text-3xl font-serif font-black text-sage-orange/40">
                      0{step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-sage-navy mb-3 border-b border-slate-200/80 pb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  <span>Step {step.stepNumber} of 4</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Contact/Next Steps Section */}
        <section id="contact" className="scroll-mt-36">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-white/10">
            <div className="max-w-3xl">
              <span className="text-sage-orange text-xs font-bold uppercase tracking-widest mb-3 block">
                Next Steps
              </span>
              <h2 className="text-2xl md:text-4xl font-serif font-black mb-4">
                Ready to Discuss Your Consulting Needs?
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
                Get in touch with SAGE to discuss customized course roadmaps, corporate team training, or direct technical advisory.
              </p>

              {/* Plain Contact Block (reused from About Us contact style) */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sage-orange mb-6">
                  Direct Contact Information
                </h4>
                <div className="grid sm:grid-cols-3 gap-6 text-white/80 text-xs">
                  <div className="flex items-start gap-3">
                    <Mail className="text-sage-orange shrink-0" size={18} />
                    <div>
                      <span className="block font-bold text-white mb-0.5">Email</span>
                      <a href="mailto:info@shastryassociates.com" className="hover:text-sage-orange transition-colors">
                        info@shastryassociates.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="text-sage-orange shrink-0" size={18} />
                    <div>
                      <span className="block font-bold text-white mb-0.5">Phone</span>
                      <a href="tel:+15551234567" className="hover:text-sage-orange transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-sage-orange shrink-0" size={18} />
                    <div>
                      <span className="block font-bold text-white mb-0.5">Location</span>
                      <span>123 Engineering Way, Tech City, TC 12345</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Plain Button/Link */}
              <div>
                <a
                  href="mailto:info@shastryassociates.com?subject=SAGE%20Consulting%20Inquiry"
                  className="inline-flex items-center space-x-2 text-xs md:text-sm font-bold text-white hover:text-sage-orange underline transition-colors"
                >
                  <span>Send an Email Inquiry to info@shastryassociates.com</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
