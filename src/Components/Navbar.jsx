"use client";

import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { TfiAlignLeft } from "react-icons/tfi";
import { FiX } from "react-icons/fi";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [menuBar, setMenuBar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Refs for GSAP animations
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const navbarRef = useRef();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // Enhanced glass effect on scroll
      if (navbarRef.current) {
        if (scrolled) {
          gsap.to(navbarRef.current, {
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(10, 10, 18, 0.85)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(navbarRef.current, {
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(10, 10, 18, 0)",
            borderBottom: "1px solid transparent",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation
  useGSAP(() => {
    let tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
    
    tl.from(ref1.current, { 
      opacity: 0, 
      y: -30,
      rotationX: 90,
      transformOrigin: "50% 0%"
    });
    
    tl.from(
      [ref2.current, ref4.current, ref5.current, ref3.current],
      {
        opacity: 0,
        y: -30,
        stagger: 0.15,
      },
      "-=0.5"
    );

    // Initial glass effect setup
    tl.fromTo(navbarRef.current, 
      {
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(10, 10, 18, 0)",
      },
      {
        backdropFilter: "blur(16px)",
        backgroundColor: "rgba(10, 10, 18, 0.7)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        duration: 1.5,
        ease: "power2.out"
      }, 
      0
    );
  }, []);

  // Toggle mobile menu with animation
  const toggleMenu = () => {
    if (menuBar) {
      // Closing animation
      gsap.to(".menuBar", {
        x: "100%",
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => setMenuBar(false)
      });
      
      // Restore body scroll
      gsap.to("body", { overflow: "auto", duration: 0 });
    } else {
      setMenuBar(true);
      // Prevent body scroll
      gsap.to("body", { overflow: "hidden", duration: 0 });
      
      // Opening animation with enhanced glass effect
      gsap.fromTo(".menuBar", 
        { 
          x: "100%",
          backdropFilter: "blur(0px)",
        },
        { 
          x: 0, 
          backdropFilter: "blur(24px)",
          duration: 0.5, 
          ease: "power2.out" 
        }
      );
    }
  };

  // Enhanced hover animation for nav items
  const handleHover = (element) => {
    gsap.to(element, {
      y: -3,
      scale: 1.05,
      color: "#6366f1",
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleHoverOut = (element) => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      color: pathname === element.getAttribute("href") ? "#6366f1" : "#ffffff",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Enhanced button hover effects
  const handleButtonHover = (element) => {
    gsap.to(element, {
      scale: 1.05,
      boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.5)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonHoverOut = (element) => {
    gsap.to(element, {
      scale: 1,
      boxShadow: "0 4px 15px -5px rgba(99, 102, 241, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={navbarRef}
      className={`w-full flex items-center justify-center fixed top-0 z-50 transition-all duration-300 border-b border-transparent`}
    >
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 h-16 flex">
        <div className="flex items-center justify-between w-full relative">
          {/* Logo with enhanced 3D effect */}
          <h1 
            ref={ref1} 
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 cursor-pointer relative"
            onMouseEnter={(e) => handleHover(e.target)}
            onMouseLeave={(e) => handleHoverOut(e.target)}
          >
            Tafhim
            <span className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></span>
          </h1>

          {/* Desktop Navigation with enhanced glass */}
          <div className="hidden lg:flex gap-8 justify-center items-center">
            <Link
              ref={ref2}
              className={`relative py-2 px-1 transition-colors font-medium ${
                pathname === "/" ? "text-blue-400" : "text-white/90 hover:text-white"
              }`}
              href="/"
              onMouseEnter={(e) => handleHover(e.target)}
              onMouseLeave={(e) => handleHoverOut(e.target)}
            >
              Home
              {pathname === "/" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
              )}
            </Link>
            <Link
              ref={ref4}
              href="/about-us"
              className={`relative py-2 px-1 transition-colors font-medium ${
                pathname === "/about-us" ? "text-blue-400" : "text-white/90 hover:text-white"
              }`}
              onMouseEnter={(e) => handleHover(e.target)}
              onMouseLeave={(e) => handleHoverOut(e.target)}
            >
              About me
              {pathname === "/about-us" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
              )}
            </Link>
            <Link
              ref={ref5}
              href="/projects"
              className={`relative py-2 px-1 transition-colors font-medium ${
                pathname === "/projects" ? "text-blue-400" : "text-white/90 hover:text-white"
              }`}
              onMouseEnter={(e) => handleHover(e.target)}
              onMouseLeave={(e) => handleHoverOut(e.target)}
            >
              Projects
              {pathname === "/projects" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></span>
              )}
            </Link>
          </div>

          {/* Enhanced Hire Me Button with glass effect */}
          <Link
            href="https://www.linkedin.com/in/tafhim-hasan-329677371/"
            target="_blank"
          >
            <button
              ref={ref3}
              className="hidden lg:block relative text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 rounded-full overflow-hidden group border border-blue-500/30 shadow-lg shadow-blue-500/20"
              onMouseEnter={(e) => handleButtonHover(e.target)}
              onMouseLeave={(e) => handleButtonHoverOut(e.target)}
            >
              <span className="relative z-10 text-white">HIRE ME</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full"></div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>

          {/* Enhanced Mobile Menu Button */}
          <div className="flex lg:hidden w-full justify-end">
            <button 
              onClick={toggleMenu}
              className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              onMouseEnter={(e) => handleButtonHover(e.target)}
              onMouseLeave={(e) => handleButtonHoverOut(e.target)}
            >
              <TfiAlignLeft className="text-white group-hover:text-blue-300 transition-colors" size={20} />
            </button>
          </div>

          {/* Enhanced Mobile Menu with Premium Glass Effect */}
          <div
            className={`lg:hidden fixed top-0 right-0 w-80 h-screen z-50 flex flex-col gap-6 py-12 justify-start items-start px-8 bg-gray-900/80 backdrop-blur-2xl border-l border-white/10 shadow-2xl shadow-black/50`}
            style={{ display: menuBar ? 'flex' : 'none' }}
          >
            
            {/* Mobile Navigation Links */}
            <Link
              className={`w-full py-4 px-6 rounded-xl transition-all duration-300 group ${
                pathname === "/" 
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-md" 
                  : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/10"
              }`}
              onClick={toggleMenu}
              href="/"
            >
              <span className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${pathname === "/" ? "bg-blue-400" : "bg-white/40 group-hover:bg-blue-400"} transition-colors`}></div>
                Home
              </span>
            </Link>
            
            <Link
              href="/about-us"
              className={`w-full py-4 px-6 rounded-xl transition-all duration-300 group ${
                pathname === "/about-us" 
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-md" 
                  : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/10"
              }`}
              onClick={toggleMenu}
            >
              <span className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${pathname === "/about-us" ? "bg-blue-400" : "bg-white/40 group-hover:bg-blue-400"} transition-colors`}></div>
                About me
              </span>
            </Link>
            
            <Link
              href="/projects"
              className={`w-full py-4 px-6 rounded-xl transition-all duration-300 group ${
                pathname === "/projects" 
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-md" 
                  : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/10"
              }`}
              onClick={toggleMenu}
            >
              <span className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${pathname === "/projects" ? "bg-blue-400" : "bg-white/40 group-hover:bg-blue-400"} transition-colors`}></div>
                Projects
              </span>
            </Link>

            {/* Mobile Hire Me Button */}
            <Link
              href="https://www.linkedin.com/in/tafhim-hasan-20349a21a/"
              target="_blank"
              className="w-full mt-8"
              onClick={toggleMenu}
            >
              <button className="w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium border border-blue-500/30 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                HIRE ME
              </button>
            </Link>

            {/* Decorative gradient at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;