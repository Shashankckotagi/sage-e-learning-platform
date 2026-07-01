import React, { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Course } from "../data/coursesData";

interface SAGEAIAssistantProps {
  onSelectCourse: (course: Course) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function SAGEAIAssistant({ onSelectCourse: _onSelectCourse }: SAGEAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am your SAGE AI Assistant. Ask me about SAGE courses, learning paths, RF topics, or which programs best fit your goals.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText;
    setInputText("");
    setIsLoading(true);

    const newUserMessage: Message = {
      id: `user-msg-${Date.now()}`,
      role: "user",
      content: userText,
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const chatHistory = [...messages, newUserMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-msg-${Date.now()}`,
          role: "assistant",
          content:
            data.responseText ||
            "My apologies, I received an empty response. Let me know how else I can assist.",
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-msg-err-${Date.now()}`,
          role: "assistant",
          content:
            "I couldn't reach my conversation server. Please verify standard internet routing and API credentials.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-full max-w-[440px] h-[640px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-gray-100 flex flex-col overflow-hidden z-50"
          >
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
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1.5 font-semibold">
                    {msg.role === "user" ? "You" : "SAGE AI"}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-gray-400 text-xs ml-2">
                  <Loader2 size={16} className="animate-spin text-sage-orange" />
                  <span>SAGE AI is drafting a response...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

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
