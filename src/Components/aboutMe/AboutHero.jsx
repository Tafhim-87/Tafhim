"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profPic from "@/public/tafhimPic.jpg";
import line from "@/public/Vector 4.png";

const AboutHero = () => {
  const imageRef = useRef();
  const textRef = useRef();
  const lineRef = useRef();
  const containerRef = useRef();
  const [isMounted, setIsMounted] = useState(false);

  // Register ScrollTrigger plugin
  useEffect(() => {
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    // Image animation
    gsap.fromTo(imageRef.current,
      {
        y: 100,
        opacity: 0,
        rotationY: 15,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Text animation
    gsap.fromTo(textRef.current,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Line animation
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        {
          scaleX: 0,
          opacity: 0
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Floating animation for the image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, [isMounted]);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-16 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-10">
        {/* Decorative line with animation */}
        <Image
          ref={lineRef}
          src={line}
          alt="line"
          width={300}
          height={400}
          className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 opacity-40"
        />

        {/* Text content */}
        <div 
          ref={textRef}
          className="flex-1 text-center lg:text-start"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight lg:leading-[1.2]">
            <span className="text-white/60 block mb-2">HI THERE, This is me</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Tafhim Hasan
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
            Passionate Full Stack Developer crafting immersive digital experiences with modern technologies. 
            Based in Bangladesh, bringing ideas to life through code and creativity.
          </p>
          
          {/* Stats section */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">50+</div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">3+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">100%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Image container with hover effects */}
        <div 
          ref={imageRef}
          className="relative flex-1 max-w-md lg:max-w-lg xl:max-w-xl group"
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl shadow-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
            
            <Image
              src={profPic}
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 object-cover"
              alt="Tafhim Hasan"
              width={600}
              height={600}
            />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Floating elements around image */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;