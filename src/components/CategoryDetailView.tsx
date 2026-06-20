import { useState } from "react";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  Filter, 
  BookOpen, 
  Compass, 
  ChevronsUpDown,
  Tag,
  Briefcase
} from "lucide-react";
import { motion } from "motion/react";
import { Course } from "../data/coursesData";

interface CategoryDetailViewProps {
  categoryName: string;
  courses: Course[];
  onBack: () => void;
  onEnroll: (course: Course) => void;
}

export default function CategoryDetailView({ categoryName, courses, onBack, onEnroll }: CategoryDetailViewProps) {
  const [levelFilter, setLevelFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'priceLow' | 'priceHigh' | 'students'>('rating');

  // Filter 10 courses
  const filteredCourses = courses
    .filter(c => levelFilter === 'All' || c.level === levelFilter)
    .sort((a,b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'students') return b.students - a.students;
      
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      if (sortBy === 'priceLow') return priceA - priceB;
      if (sortBy === 'priceHigh') return priceB - priceA;
      return 0;
    });

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Back */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2.5 text-sage-navy/60 hover:text-sage-orange transition-colors duration-300 font-bold mb-8 cursor-pointer group text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to SAGE Home
        </button>

        {/* Category Page Title Cards */}
        <div className="bg-sage-navy rounded-3xl p-10 md:p-14 text-white relative overflow-hidden mb-12 shadow-xl border border-white/5">
          {/* Glowing element */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-sage-orange/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#E8650A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="bg-sage-orange text-white text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full font-bold mb-4 inline-block shadow-md">
              Specialized Syllabus Module
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-none mb-6">
              Department of <span className="text-sage-orange">{categoryName}</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 max-w-2xl font-medium">
              Explore 10 curated expert-level academic and professional certifications focusing on robust theoretical modeling, real-world simulations, and practical lab design specifications.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-white/80 pt-4 border-t border-white/10">
              <span className="flex items-center gap-2"><BookOpen size={16} className="text-sage-orange" /> 10 Industry-Grade Courses</span>
              <span className="flex items-center gap-2"><Briefcase size={16} className="text-sage-orange" /> Career-Optimized Curriculum</span>
              <span className="flex items-center gap-2"><Clock size={16} className="text-sage-orange" /> Flexible Formats</span>
            </div>
          </div>
        </div>

        {/* Filters and Sorting Strip */}
        <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Filter size={13} /> Filter Experience:
            </span>
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(lev => (
              <button
                key={lev}
                onClick={() => setLevelFilter(lev)}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  levelFilter === lev 
                    ? 'bg-sage-navy text-white shadow-md' 
                    : 'bg-gray-100 hover:bg-gray-200 text-sage-navy'
                }`}
              >
                {lev}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <ChevronsUpDown size={13} /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold border border-gray-200 focus:border-sage-orange bg-white rounded-lg px-3 py-2 outline-none cursor-pointer text-sage-navy focus:ring-1 focus:ring-sage-orange"
            >
              <option value="rating">Top Rated (Default)</option>
              <option value="students">Highest Enrollment</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 10 Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, idx) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-sage-navy/90 text-white text-[9px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                      {course.level}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 text-sage-navy text-[10px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Clock size={11} className="text-sage-orange" /> {course.duration}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-yellow-500 mb-2.5">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-black text-sage-navy">{course.rating}</span>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">({course.students} students)</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-sage-navy mb-2 group-hover:text-sage-orange transition-colors leading-tight font-serif">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mb-3.5">Instructed by {course.instructor}</p>

                    <p className="text-xs text-gray-600 leading-relaxed font-sans line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Pricing Model</span>
                      <span className="text-2xl font-black text-sage-navy font-serif">{course.price}</span>
                    </div>
                    <button 
                      onClick={() => onEnroll(course)}
                      className="bg-sage-orange text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-sage-navy hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full bg-white text-center py-20 rounded-3xl border border-gray-100">
              <Compass size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-bold mb-1 font-serif">No Courses Found</p>
              <p className="text-xs text-gray-400">Try adjusting your experience level filter constraints above.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
