import React, { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Upload, 
  Sparkles, 
  FileText, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ALL_COURSES, Course } from "../data/coursesData";

interface SAGEAIAssistantProps {
  onSelectCourse: (course: Course) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isResumeAnalysis?: boolean;
  recommendations?: {
    course: Course;
    matchPercentage: number;
    whyDescription: string;
  }[];
}

export default function SAGEAIAssistant({ onSelectCourse }: SAGEAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I am your SAGE AI Assistant. Please upload or paste your resume below, and I will analyze your experience to find the absolute best courses that fit your career goals and skill requirements."
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pastedResume, setPastedResume] = useState("");
  const [showResumeInput, setShowResumeInput] = useState(true);
  const [uploadError, setUploadError] = useState("");
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle file import (reading .txt files directly)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processResumeFile(files[0]);
    }
  };

  const processResumeFile = (file: File) => {
    setUploadError("");
    if (file.type !== "text/plain" && !file.name.endsWith(".txt") && !file.name.endsWith(".md")) {
      setUploadError("Only standard text resumes (.txt, .md) are supported via direct upload. For other types, please Copy & Paste your resume text below!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text && text.trim().length > 10) {
        submitResumeText(text, file.name);
      } else {
        setUploadError("The file seems to be empty or too short. Please try pasting the text instead.");
      }
    };
    reader.onerror = () => {
      setUploadError("Error reading file. Please try copy-pasting your resume text.");
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processResumeFile(files[0]);
    }
  };

  // Submit Text to express backend `/api/analyze-resume`
  const submitResumeText = async (text: string, sourceName?: string) => {
    setIsLoading(true);
    setUploadError("");
    
    // Add User message indicating upload
    const userMsgId = `upload-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      {
        id: userMsgId,
        role: "user",
        content: sourceName ? `📁 Uploaded resume file: ${sourceName}` : "📝 Pasted resume details for analysis"
      }
    ]);

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      
      if (data.recommendations && Array.isArray(data.recommendations)) {
        // Map recommended ID back to Course objects
        const resolvedRecs = data.recommendations.map((rec: any) => {
          const matchedCourse = ALL_COURSES.find(c => c.id === rec.courseId);
          if (matchedCourse) {
            return {
              course: matchedCourse,
              matchPercentage: rec.matchPercentage || 90,
              whyDescription: rec.whyDescription
            };
          }
          return null;
        }).filter(Boolean) as { course: Course; matchPercentage: number; whyDescription: string }[];

        setMessages(prev => [
          ...prev,
          {
            id: `assistant-rec-${Date.now()}`,
            role: "assistant",
            content: "I have successfully analyzed your resume! Based on your technical profile and skills, I've selected the top SAGE courses that will benefit you most:",
            isResumeAnalysis: true,
            recommendations: resolvedRecs
          }
        ]);
        
        setShowResumeInput(false); // Hide the resume uploader since it's completed
      } else {
        throw new Error("Invalid recommendations structure received");
      }

    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: "assistant",
          content: `Oops! I couldn't complete the resume analysis. ${err.message || 'Make sure your backend server is loaded and the GEMINI_API_KEY secret is configured correctly.'}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit casual messages to chatbot `/api/chat`
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText;
    setInputText("");
    setIsLoading(true);

    const newUserMessage: Message = {
      id: `user-msg-${Date.now()}`,
      role: "user",
      content: userText
    };

    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Package messages for history chat context
      const chatHistory = [...messages, newUserMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-msg-${Date.now()}`,
          role: "assistant",
          content: data.responseText || "My apologies, I received an empty response. Let me know how else I can assist."
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-msg-err-${Date.now()}`,
          role: "assistant",
          content: "I couldn't reach my conversation server. Please verify standard internet routing and API credentials."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-sage-orange text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl cursor-pointer relative group border-2 border-white/20"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <X size={26} key="close-icon" />
            ) : (
              <div key="chat-icon" className="relative">
                <MessageSquare size={26} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-sage-orange animate-pulse"></span>
              </div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Main Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-full max-w-[440px] h-[640px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-sage-navy text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage-orange/20 rounded-xl flex items-center justify-center text-sage-orange ring-1 ring-sage-orange/30">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg tracking-wide">SAGE AI Advisor</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                    <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">Active Gemini Agent</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50/50 to-white space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-sage-orange text-white rounded-tr-none shadow-sm font-medium" 
                        : "bg-white text-sage-navy border border-gray-100 rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p>{msg.content}</p>

                    {/* Recommendations Block */}
                    {msg.isResumeAnalysis && msg.recommendations && (
                      <div className="mt-4 space-y-3.5 border-t border-gray-100 pt-4">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <CheckCircle2 size={13} className="text-sage-orange" /> Recommended Learning Path
                        </p>
                        {msg.recommendations.map((rec, idx) => (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={rec.course.id}
                            className="bg-gray-50 hover:bg-sage-accent/30 p-3.5 rounded-xl border border-gray-100 cursor-pointer transition-colors group"
                            onClick={() => {
                              onSelectCourse(rec.course);
                            }}
                          >
                            <div className="flex items-center justify-between mb-1 gap-2">
                              <span className="font-bold text-xs text-sage-orange bg-sage-orange/10 px-2 py-0.5 rounded-full inline-block">
                                Match {rec.matchPercentage}%
                              </span>
                              <span className="text-[10px] text-gray-400 font-semibold group-hover:text-sage-orange transition-colors flex items-center gap-1">
                                <BookOpen size={10} /> View details
                              </span>
                            </div>
                            <h4 className="font-bold text-sage-navy text-sm font-sans leading-snug group-hover:text-sage-orange transition-colors mb-1.5">
                              {rec.course.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {rec.whyDescription}
                            </p>
                          </motion.div>
                        ))}

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => setShowResumeInput(true)}
                            className="text-[11px] text-sage-orange hover:text-sage-navy flex items-center gap-1.5 font-bold transition-colors cursor-pointer"
                          >
                            <RefreshCw size={11} /> Re-analyze another resume
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1.5 font-semibold">
                    {msg.role === "user" ? "You" : "SAGE AI"}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400 text-xs ml-2">
                  <Loader2 size={16} className="animate-spin text-sage-orange" />
                  <span>SAGE AI is consulting credentials and drafting curriculum...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Resume Upload / Copy-Paste Area */}
            {showResumeInput && (
              <div className="bg-white border-t border-gray-100 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-sage-navy uppercase tracking-wider flex items-center gap-1.5">
                    <FileText size={14} className="text-sage-orange" /> Resume Integration Analyzer
                  </h4>
                  <button 
                    onClick={() => setShowResumeInput(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 font-bold tracking-wide"
                  >
                    Skip
                  </button>
                </div>

                {/* Drag and Drop Box */}
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    isDragging 
                      ? "border-sage-orange bg-sage-accent/30" 
                      : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                    accept=".txt,.md" 
                    className="hidden" 
                  />
                  <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center mx-auto mb-2 text-gray-400 group-hover:text-sage-orange">
                    <Upload size={18} className="text-sage-orange animate-bounce" />
                  </div>
                  <p className="text-[11px] font-bold text-gray-700">Drag & Drop Resume (.txt, .md)</p>
                  <p className="text-[10px] text-gray-400 mt-1">or click to browse local files</p>
                </div>

                {/* Paste Area */}
                <div className="space-y-2">
                  <div className="relative">
                    <textarea
                      placeholder="Or paste your plain text resume / LinkedIn profile details directly here..."
                      value={pastedResume}
                      onChange={(e) => setPastedResume(e.target.value)}
                      rows={3}
                      className="w-full text-xs border border-gray-200 focus:border-sage-orange focus:ring-1 focus:ring-sage-orange rounded-xl p-3 resize-none focus:outline-none"
                    />
                    {pastedResume.trim().length > 10 && (
                      <button
                        onClick={() => {
                          const text = pastedResume;
                          setPastedResume("");
                          submitResumeText(text);
                        }}
                        disabled={isLoading}
                        className="absolute right-2.5 bottom-2.5 bg-sage-orange text-white p-1.5 rounded-lg hover:bg-opacity-95 transition-all flex items-center gap-1 shadow-md disabled:bg-gray-400 cursor-pointer"
                      >
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {uploadError && (
                  <p className="text-[11px] text-red-500 bg-red-50 p-2.5 rounded-xl border border-red-100 leading-normal">
                    ⚠️ {uploadError}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Text Interface */}
            <form onSubmit={handleSendMessage} className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything about SAGE programs..."
                disabled={isLoading}
                className="flex-1 bg-white border border-gray-200 focus:border-sage-orange focus:ring-1 focus:ring-sage-orange rounded-xl px-4 py-3 text-sm focus:outline-none disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="bg-sage-orange text-white p-3 rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
