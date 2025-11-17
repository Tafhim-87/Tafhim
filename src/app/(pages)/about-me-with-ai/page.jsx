"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { developerInfo } from "@/data/developerInfo";

const KnowMeWithAI = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isApiOnline, setIsApiOnline] = useState(true); // NEW ✔

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 🔥 API HEALTH CHECKER
  const checkApiStatus = async () => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: "user", content: "ping" }]
        }),
      });

      setIsApiOnline(res.ok);
    } catch {
      setIsApiOnline(false);
    }
  };

  // Auto check every 10 seconds
  useEffect(() => {
    checkApiStatus();
    const interval = setInterval(checkApiStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  // Real AI response fetch
  const generateAIResponse = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: userMessage
            }
          ]
        }),
      });

      if (!response.ok) {
        setIsApiOnline(false); // API down
        throw new Error('Failed');
      }

      setIsApiOnline(true); // API working

      const data = await response.json();
      return data.text || "I'm not sure how to answer that.";
    } catch (error) {
      return "Sorry! I'm not able to respond right now.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoadingMessage || !isApiOnline) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoadingMessage(true);
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(inputText.trim());
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 800));

      const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

    } finally {
      setIsLoadingMessage(false);
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What's your tech stack?",
    "Tell me about your experience",
    "What projects have you built?",
    "Are you available for work?",
  ];

  const handleQuickQuestion = (q) => {
    setInputText(q);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Loader Component
  const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 100 : p + 3));
      }, 12);
      const timeout = setTimeout(() => clearInterval(interval), 1100);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, []);

    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a12]"
      >
        <div className="relative w-56 h-56">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 rounded-full border-4 border-purple-600/30"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-4 border-indigo-500/50"
          />
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold text-white"
            >
              Loading…
            </motion.h3>
            <div className="w-40 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400"
            >
              {progress}%
            </motion.p>
          </div>
        </div>
      </motion.div>
    );
  };

  // Background Component
  const AnimatedBackground = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/20" />
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 80, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
    </div>
  );

  // Chat Message Component
  const ChatMessage = ({ message }) => (
    <motion.div
      transition={{ duration: 0.3 }}
      className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-6`}
    >
      <div className={`flex max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"} items-start gap-3`}>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            message.isUser
              ? "bg-gradient-to-r from-purple-500 to-indigo-600"
              : "bg-gradient-to-r from-gray-600 to-gray-700"
          }`}
        >
          <span className="text-xs font-bold text-white">{message.isUser ? "Y" : "AI"}</span>
        </div>

        <div
          className={`relative px-4 py-3 rounded-2xl ${
            message.isUser
              ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-br-none"
              : "bg-gray-800/80 backdrop-blur-sm text-gray-100 rounded-bl-none border border-gray-700"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          <div className={`text-xs mt-2 ${message.isUser ? "text-purple-200" : "text-gray-400"}`}>
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
          <div
            className={`absolute bottom-0 w-3 h-3 ${
              message.isUser
                ? "right-0 translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-700"
                : "left-0 -translate-x-1/2 bg-gray-800/80"
            }`}
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        </div>
      </div>
    </motion.div>
  );

  // Typing Indicator
  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-6"
    >
      <div className="flex items-start gap-3 max-w-[80%]">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center">
          <span className="text-xs font-bold text-white">AI</span>
        </div>
        <div className="bg-gray-800/80 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-none border border-gray-700">
          <div className="flex space-x-1">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <AnimatedBackground />

      <motion.div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(99,102,241,0.15), transparent 70%)`,
        }}
      />

      <AnimatePresence>
        {isLoading ? <Loader /> : (
          <div className="min-h-[93vh] bg-[#0a0a12] w-full flex flex-col mt-16 Ai-fonts">

            {/* HEADER */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-30"
            >
              <div className="container mx-auto px-4 py-4 max-w-[1250px]">
                <div className="flex items-center justify-between">
                  
                  <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-white">Know Me with AI</h1>
                      <p className="text-sm text-gray-400">Chat with AI about {developerInfo.name}</p>
                    </div>
                  </motion.div>

                  {/* ONLINE/OFFLINE BADGE — UPDATED */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isApiOnline ? "bg-green-500" : "bg-red-500"
                      } animate-pulse`}
                    />
                    <span className="text-sm text-gray-300">
                      {isApiOnline ? "AI Online" : "AI Offline"}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.header>

            {/* CHAT CONTAINER */}
            <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl flex flex-col">
              <div className="flex-1 overflow-y-auto mb-6 space-y-2">

                <AnimatePresence mode="wait">
                  {messages.length === 0 ? (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center"
                      >
                        <span className="text-2xl text-white font-bold">AI</span>
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Hello! I&apos;m {developerInfo.name}&apos;s AI Assistant
                      </h2>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Ask me anything about skills, projects, or availability!
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
                        {quickQuestions.map((q, i) => (
                          <motion.button
                            key={q}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => handleQuickQuestion(q)}
                            className="p-3 text-left bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700 hover:border-purple-500/50"
                          >
                            <p className="text-sm text-gray-200">{q}</p>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    messages.map((msg, idx) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        <ChatMessage message={msg} />
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSendMessage}
                className="sticky bottom-0 bg-[#0a0a12]/80 backdrop-blur-sm pt-4 pb-6 border-t border-gray-800/50"
              >
                <div className="flex gap-3 flex-col lg:flex-row">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      isApiOnline
                        ? "Ask about skills, projects..."
                        : "AI is offline — please wait..."
                    }
                    disabled={isLoadingMessage || !isApiOnline}
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 disabled:opacity-50"
                  />

                  <motion.button
                    type="submit"
                    disabled={!inputText.trim() || isLoadingMessage || !isApiOnline}
                    whileHover={{ scale: (!inputText.trim() || isLoadingMessage || !isApiOnline) ? 1 : 1.05 }}
                    whileTap={{ scale: (!inputText.trim() || isLoadingMessage || !isApiOnline) ? 1 : 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-medium rounded-xl flex items-center gap-2"
                  >
                    {isLoadingMessage ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send</span>
                        <motion.span 
                          animate={{ x: [0, 2, 0] }} 
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KnowMeWithAI;
