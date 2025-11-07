"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import image1 from "@/public/web person.jpg";

/* ------------------------------------------------------------------ */
/* 1. Loading Screen                                                  */
/* ------------------------------------------------------------------ */
const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3));
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

/* ------------------------------------------------------------------ */
/* 2. Animated Title Component with Hover Effects                    */
/* ------------------------------------------------------------------ */
const AnimatedTitle = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const titleLines = [
    { text: "I AM A", gradient: "from-indigo-400 via-purple-500 to-pink-500" },
    { text: "FULL STACK", gradient: "from-white to-white" },
    { text: "DEVELOPER", gradient: "from-green-400 to-blue-600" },
  ];

  const containerVariants = {
    normal: {
      transition: {
        staggerChildren: 0.1
      }
    },
    hover: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const wordVariants = {
    normal: {
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -10,
      scale: 1.05,
      rotateX: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const letterVariants = {
    normal: {
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    hover: {
      y: [-2, 2, -2],
      scale: [1, 1.1, 1],
      transition: {
        y: {
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut"
        },
        scale: {
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <motion.div
      className="cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={containerVariants}
      initial="normal"
      animate={isHovered ? "hover" : "normal"}
    >
      {titleLines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          className={`overflow-hidden ${
            lineIndex === 1 ? "my-2" : "my-1"
          }`}
          variants={wordVariants}
        >
          <div className="flex justify-center">
            {line.text.split("").map((letter, letterIndex) => (
              <motion.span
                key={`${lineIndex}-${letterIndex}`}
                className={`inline-block font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${
                  line.gradient.includes("white") 
                    ? "text-white" 
                    : "bg-clip-text text-transparent bg-gradient-to-r"
                } ${line.gradient}`}
                variants={letterVariants}
                custom={letterIndex}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Floating particles effect on hover */}
      {isHovered && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none"
              initial={{
                opacity: 0,
                scale: 0,
                x: Math.random() * 400 - 200,
                y: Math.random() * 200 - 100,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 800 - 400,
                y: Math.random() * 400 - 200,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Animated Background                                            */
/* ------------------------------------------------------------------ */
const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/20" />
    
    {/* Animated gradient orbs */}
    <motion.div
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
    />
    <motion.div
      animate={{
        x: [0, -80, 0],
        y: [0, 60, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
    />
    <motion.div
      animate={{
        x: [0, 60, 0],
        y: [0, 80, 0],
        scale: [1, 0.9, 1],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
    />
  </div>
);

/* ------------------------------------------------------------------ */
/* 4. Main Hero Component                                            */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  /* Mouse Position */
  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  /* Loading Done */
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Mouse Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(99, 102, 241, 0.15), transparent 70%)`,
        }}
      />

      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="container mx-auto max-w-7xl z-20 text-center">
          
          {/* Animated Title */}
          <div className="mb-8">
            <AnimatedTitle />
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.8, 
              type: "spring", 
              stiffness: 100 
            }}
            className="flex justify-center my-12"
          >
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotateY: 10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse" />
              <Image
                src={image1}
                alt="Profile"
                width={140}
                height={140}
                className="relative rounded-full border-4 border-purple-500/40 shadow-2xl shadow-purple-600/30 z-10"
              />
            </motion.div>
          </motion.div>

          {/* Subtitles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="space-y-2 mb-12"
          >
            <p className="text-2xl sm:text-3xl text-gray-300">
              Crafting <span className="text-purple-400 font-semibold">scalable</span> &{" "}
              <span className="text-indigo-400 font-semibold">beautiful</span> web apps
            </p>
            <p className="text-lg text-gray-400">
              From <span className="text-green-400 font-medium">Bangladesh</span> with passion
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            {["React", "Next.js", "Node.js", "TypeScript", "Tailwind", "PostgreSQL"].map(
              (tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1.4 + (i * 0.1),
                    type: "spring", 
                    stiffness: 100 
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -8,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="relative px-6 py-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg">
                    <span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                      {tech}
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mx-auto mt-16 max-w-2xl"
          >
            <p className="text-gray-300 text-lg leading-relaxed bg-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
              Building <span className="text-purple-400 font-medium">modern, performant</span> applications with{" "}
              <span className="text-indigo-400 font-medium">cutting-edge tech</span>. Passionate about clean
              code, great UX, and pushing the web forward.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-12 border-2 border-purple-500 rounded-full flex justify-center"
            >
              <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mt-3" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;