// aceternity-ui.js
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// TextGenerateEffect Component
export const TextGenerateEffect = ({ words, className }) => {
  const wordsArray = words.split(" ");
  
  return (
    <div className={cn("font-normal", className)}>
      <div className="mt-4">
        <div className="text-justify leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className="text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.08,
              }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

// TypewriterEffect Component
export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  const wordsArray = words.map((word, idx) => (
    <div key={`word-${idx}`} className="inline-block">
      {word.text.split("").map((char, index) => (
        <motion.span
          key={`char-${index}`}
          className={cn(`text-black dark:text-white`, word.className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: (idx * 0.1) + (index * 0.05),
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  ));

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="flex flex-wrap justify-center gap-2"
        initial="hidden"
        animate="visible"
      >
        {wordsArray}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("block rounded-sm w-[4px] h-8 bg-blue-500", cursorClassName)}
      ></motion.span>
    </div>
  );
};

// WordPullUp Component
export const WordPullUp = ({ words, className, delay = 0 }) => {
  const wordsArray = words.split(" ");
  
  return (
    <div className={cn("flex flex-wrap justify-center", className)}>
      {wordsArray.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * 0.05,
            duration: 0.5,
          }}
          className="inline-block mr-1.5"
        >
          {word === "scalable" ? (
            <span className="text-purple-400">{word}</span>
          ) : word === "beautiful" ? (
            <span className="text-indigo-400">{word}</span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </div>
  );
};

// BackgroundBeams Component (simplified)
export const BackgroundBeams = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-75"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-150"></div>
    </div>
  );
};

// BackgroundGradient Component
export const BackgroundGradient = ({ children, className }) => {
  return (
    <div className={cn("relative p-1 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full", className)}>
      {children}
    </div>
  );
};