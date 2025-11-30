"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

export default Loader;
