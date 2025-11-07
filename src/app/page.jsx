"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";

import Hero from "@/Components/Hero";
import Experties from "@/Components/Experties";
import Work from "@/Components/Work";
import Experience from "@/Components/Experience";
import Testomonial from "@/Components/Testomonial";

const Page = () => {
  const [showButton, setShowButton] = useState(false);
  const lenisRef = useRef(null);

  /* --------------------------------------------------------------
     Lenis Smooth Scroll Setup
   -------------------------------------------------------------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;
    lenis.start();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* --------------------------------------------------------------
     Show/Hide Scroll-to-Top Button
   -------------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* --------------------------------------------------------------
     Scroll to Top with Lenis
   -------------------------------------------------------------- */
  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, {
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <div className="font-body overflow-x-hidden">
      {/* Sections */}
      <Hero />
      <Experties />
      <Work />
      <Experience />
      <Testomonial />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`
          fixed bottom-8 right-8 z-50
          flex items-center justify-center
          w-12 h-12 rounded-full
          bg-[#05244d] hover:bg-[#0a3a7a] text-white
          shadow-xl transition-all duration-300 ease-out
          ${showButton ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default Page;