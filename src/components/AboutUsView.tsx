import { useState, useEffect } from 'react';
import {
  Users,
  Target,
  Compass,
  Award,
  ArrowRight,
  ChevronRight,
  Sparkles,
  CheckCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  EXECUTIVE_BOARD,
  ADVISORY_BOARD,
  YOUTH_WING,
  ASSOCIATES,
  ALL_TEAM_MEMBERS,
  TeamMember
} from '../data/teamData';

interface AboutUsViewProps {
  initialSection?: 'team' | 'mission';
  onBackToHome: () => void;
}

export default function AboutUsView({ initialSection = 'team', onBackToHome }: AboutUsViewProps) {
  const [activeTab, setActiveTab] = useState<'team' | 'mission'>(initialSection);
  const [activeTeamCategory, setActiveTeamCategory] = useState<'all' | 'executive' | 'advisory' | 'youth' | 'associates'>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isFullTeamModalOpen, setIsFullTeamModalOpen] = useState(false);

  useEffect(() => {
    if (initialSection) {
      setActiveTab(initialSection);
      const element = document.getElementById(initialSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [initialSection]);

  const scrollToSection = (sectionId: 'team' | 'mission') => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100; // Account for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-sage-navy font-sans">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#070b19] via-[#0b1329] to-[#122240] text-white">
        {/* Background glow and subtle mesh */}
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
              About <span className="text-sage-orange">SAGE</span>
            </h1>
            <p className="max-w-3xl mx-auto text-white/80 text-base md:text-lg leading-relaxed font-sans">
              Dedicated to advancing global engineering excellence by disseminating cutting-edge knowledge, practical industry insights, and foundational education in applied electromagnetics, RF, microwave, and wireless systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visible In-Page Sticky Anchor Navigation Bar */}
      <div className="sticky top-[72px] z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex space-x-2 md:space-x-8 py-3">
            <button
              onClick={() => scrollToSection('team')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-sage-orange text-white shadow-lg shadow-sage-orange/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={16} />
              <span>SAGE Team</span>
            </button>
            <button
              onClick={() => scrollToSection('mission')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'mission'
                  ? 'bg-sage-orange text-white shadow-lg shadow-sage-orange/30'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target size={16} />
              <span>Mission, Vision & Goals</span>
            </button>
          </div>

          <button
            onClick={onBackToHome}
            className="hidden sm:flex items-center space-x-1 text-xs text-white/60 hover:text-sage-orange transition-colors cursor-pointer"
          >
            <span>Back to Home</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* SUBSECTION 1: Overview + Team */}
        <section id="team" className="scroll-mt-36">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 bg-sage-orange/10 rounded-xl text-sage-orange">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage-orange">
                Subsection 1: Leadership & Expertise
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-sage-navy mb-6">
              SAGE Team & Overview
            </h2>
            
            {/* Short Intro Paragraph */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                <strong className="text-sage-navy font-semibold">Shastry Associates Global Enterprises (SAGE)</strong> is a world-renowned professional education and engineering organization. Our primary focus is knowledge-sharing, curriculum development, and technical workforce enhancement in the fields of <span className="text-sage-orange font-medium">RF, Microwave, Millimeter-Wave, and Wireless Engineering</span>. Through our global network of academics, industry pioneers, and research leaders, SAGE bridges the vital gap between theoretical electromagnetic principles and real-world technology deployment.
              </p>
            </div>
          </div>

          {/* Meet the Team Teaser */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-sage-navy">Meet the Team</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Renowned scholars, industry executives, and youth ambassadors guiding SAGE.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Teaser' },
                  { id: 'executive', label: 'Executive Board' },
                  { id: 'advisory', label: 'Advisory Board' },
                  { id: 'youth', label: 'Youth Wing' },
                  { id: 'associates', label: 'Associates' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTeamCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeTeamCategory === cat.id
                        ? 'bg-sage-navy text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Members Grid Teaser */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {(activeTeamCategory === 'all'
                ? [
                    ...EXECUTIVE_BOARD,
                    ...ADVISORY_BOARD.slice(0, 3),
                    ...YOUTH_WING.slice(0, 3),
                    ...ASSOCIATES.slice(0, 4)
                  ]
                : ALL_TEAM_MEMBERS.filter(m => m.group === activeTeamCategory)
              ).map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center group cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3 rounded-full overflow-hidden border-2 border-sage-orange/20 group-hover:border-sage-orange transition-colors">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-sage-navy group-hover:text-sage-orange transition-colors line-clamp-1">
                    {member.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                    {member.role}
                  </p>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-sage-orange mt-2 bg-sage-orange/10 px-2 py-0.5 rounded-full">
                    {member.group}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* View Full Team Button */}
            <div className="pt-6 text-center">
              <button
                onClick={() => setIsFullTeamModalOpen(true)}
                className="inline-flex items-center space-x-3 bg-sage-navy hover:bg-sage-orange text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>View Full Team</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* SUBSECTION 2: Mission, Vision & Goals */}
        <section id="mission" className="scroll-mt-36">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 bg-sage-orange/10 rounded-xl text-sage-orange">
                <Target size={24} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage-orange">
                Subsection 2: Strategic Pillars
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-sage-navy">
              Mission, Vision & Goals
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-orange-100 text-sage-orange rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-sage-navy mb-4 border-b border-sage-orange/20 pb-3">
                  Mission
                </h3>
                <p className="text-gray-700 text-base leading-relaxed font-sans">
                  To disseminate knowledge and information in the area of applied electromagnetics and wireless systems.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center text-xs text-sage-orange font-bold">
                <CheckCircle size={14} className="mr-1.5" />
                <span>Core Institutional Purpose</span>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Compass size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-sage-navy mb-4 border-b border-blue-500/20 pb-3">
                  Vision
                </h3>
                <p className="text-gray-700 text-base leading-relaxed font-sans">
                  To be the leader in disseminating knowledge and information in radio frequency wireless systems engineering and technologies globally.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center text-xs text-blue-600 font-bold">
                <Sparkles size={14} className="mr-1.5" />
                <span>Global Technology Standard</span>
              </div>
            </motion.div>

            {/* Goals Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between md:col-span-1"
            >
              <div>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Award size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-sage-navy mb-4 border-b border-purple-500/20 pb-3">
                  Goals
                </h3>
                <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed font-sans">
                  <p className="bg-white p-4 rounded-xl border border-gray-200/80 italic text-sage-navy font-medium shadow-2xs">
                    &quot;To make available practical engineering and technology information on RF, Millimeter-Wave, and Microwave circuits, components, sub-systems, and systems.&quot;
                  </p>
                  <p>
                    To provide and deliver tutorials, courses, workshops, and training for recent college graduates (Bachelor and Master levels) and engineers in industry at appropriate levels on-site, off-site, and online.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center text-xs text-purple-600 font-bold">
                <CheckCircle size={14} className="mr-1.5" />
                <span>Actionable Objectives</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 bg-sage-navy/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 text-center relative shadow-2xl border border-gray-100"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-sage-navy p-2 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-sage-orange/20 mb-4 shadow-md">
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[10px] uppercase font-bold tracking-widest text-sage-orange bg-sage-orange/10 px-3 py-1 rounded-full inline-block mb-2">
                {selectedMember.group}
              </span>
              <h3 className="text-xl font-serif font-black text-sage-navy">
                {selectedMember.name}
              </h3>
              <p className="text-xs font-bold text-gray-500 mt-1">
                {selectedMember.role}
              </p>

              {selectedMember.bio && (
                <p className="text-xs text-gray-600 mt-4 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {selectedMember.bio}
                </p>
              )}

              <button
                onClick={() => setSelectedMember(null)}
                className="w-full mt-6 bg-sage-navy text-white text-xs font-bold py-3 rounded-xl hover:bg-sage-orange transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Team Roster Modal */}
      <AnimatePresence>
        {isFullTeamModalOpen && (
          <div className="fixed inset-0 bg-sage-navy/85 backdrop-blur-md z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100"
            >
              {/* Header */}
              <div className="px-8 py-6 bg-sage-navy text-white flex justify-between items-center border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-serif font-black flex items-center gap-2">
                    <Users className="text-sage-orange" size={24} />
                    SAGE Complete Team Directory
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    Executive Board, Advisory Board, Youth Wing, and Technical Associates
                  </p>
                </div>
                <button
                  onClick={() => setIsFullTeamModalOpen(false)}
                  className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Roster Scroll Container */}
              <div className="overflow-y-auto p-8 space-y-10">
                {/* Executive Board */}
                <div>
                  <h4 className="text-lg font-bold text-sage-navy border-b border-sage-orange/30 pb-2 mb-4 uppercase tracking-wider text-xs">
                    Executive Board ({EXECUTIVE_BOARD.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {EXECUTIVE_BOARD.map((m) => (
                      <div key={m.id} className="p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
                        <img src={m.photo} alt={m.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border border-sage-orange/30" />
                        <h5 className="font-bold text-xs text-sage-navy line-clamp-1">{m.name}</h5>
                        <p className="text-[10px] text-gray-500 line-clamp-1">{m.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advisory Board */}
                <div>
                  <h4 className="text-lg font-bold text-sage-navy border-b border-blue-500/30 pb-2 mb-4 uppercase tracking-wider text-xs">
                    Advisory Board ({ADVISORY_BOARD.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {ADVISORY_BOARD.map((m) => (
                      <div key={m.id} className="p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
                        <img src={m.photo} alt={m.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border border-blue-500/30" />
                        <h5 className="font-bold text-xs text-sage-navy line-clamp-1">{m.name}</h5>
                        <p className="text-[10px] text-gray-500 line-clamp-1">{m.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Youth Wing */}
                <div>
                  <h4 className="text-lg font-bold text-sage-navy border-b border-green-500/30 pb-2 mb-4 uppercase tracking-wider text-xs">
                    Youth Wing ({YOUTH_WING.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {YOUTH_WING.map((m) => (
                      <div key={m.id} className="p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
                        <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-full object-cover mx-auto mb-2 border border-green-500/30" />
                        <h5 className="font-bold text-xs text-sage-navy line-clamp-1">{m.name}</h5>
                        <p className="text-[10px] text-gray-500 line-clamp-1">{m.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Associates */}
                <div>
                  <h4 className="text-lg font-bold text-sage-navy border-b border-purple-500/30 pb-2 mb-4 uppercase tracking-wider text-xs">
                    Associates & Consultants ({ASSOCIATES.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {ASSOCIATES.map((m) => (
                      <div key={m.id} className="p-3 bg-gray-50 rounded-xl text-center border border-gray-100">
                        <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-full object-cover mx-auto mb-2 border border-purple-500/30" />
                        <h5 className="font-bold text-xs text-sage-navy line-clamp-1">{m.name}</h5>
                        <p className="text-[10px] text-gray-500 line-clamp-1">{m.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setIsFullTeamModalOpen(false)}
                  className="bg-sage-navy text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-sage-orange transition-colors cursor-pointer"
                >
                  Close Directory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
