// "use client";

// import AboutHero from "@/Components/aboutMe/AboutHero";
// import AboutDisc from "@/Components/aboutMe/AboutDisc";
// import Experience from "@/Components/Experience";
// import Testomonial from "@/Components/Testomonial";
// import React, { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";

// const Page = () => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2, // smoothness speed
//       easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
//       smoothWheel: true,
//       smoothTouch: false,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     <div className="overflow-x-hidden">
//       <AboutHero />
//       <AboutDisc />
//       <Experience />
//       <Testomonial />
//     </div>
//   );
// };

// export default Page;


"use client";

import AboutHero from "@/Components/aboutMe/AboutHero";
import AboutDisc from "@/Components/aboutMe/AboutDisc";
import Experience from "@/Components/Experience";
import Testomonial from "@/Components/Testomonial";
import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Page = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
      smoothTouch: false,
    });

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add scroll to top button visibility
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Enhanced scroll function that works with Lenis
    const scrollToTop = () => {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    };

    // GSAP animation for ProjectHero
    gsap.fromTo(".hero-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".project-hero",
          start: "top center",
          toggleActions: "play none none none"
        }
      }
    );

    // RAF loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="overflow-x-hidden">
      <AboutHero />
      <AboutDisc />
      <Experience />
      <Testomonial />
      
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-[#05244d] hover:bg-[#0a3a7a] text-white rounded-full shadow-lg transition-all duration-300 ease-in-out z-50 ${
          showButton ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
        }`}
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default Page;