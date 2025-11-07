"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "@/public/code.jpg";

const ProjectHero = () => {
  const containerRef = useRef();
  const imageRef = useRef();
  const textRef = useRef();
  const canvasRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const particlesRef = useRef([]);

  // Initialize
  useEffect(() => {
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Three.js Particle Effect
  useEffect(() => {
    if (!isMounted) return;

    const initParticles = async () => {
      const THREE = await import("three");

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        alpha: true,
        antialias: true
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Create particles
      const particleCount = 150;
      const particles = new THREE.Group();
      scene.add(particles);
      
      const particleGeometry = new THREE.SphereGeometry(0.05, 10, 10);
      const particleMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        shininess: 100
      });
      
      for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Random position
        particle.position.x = (Math.random() - 0.5) * 10;
        particle.position.y = (Math.random() - 0.5) * 10;
        particle.position.z = (Math.random() - 0.5) * 10;
        
        // Random velocity
        particle.userData = {
          velocity: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
          },
          amplitude: Math.random() * 0.1 + 0.05,
          frequency: Math.random() * 0.1 + 0.01
        };
        
        particles.add(particle);
        particlesRef.current.push(particle);
      }
      
      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0x4f46e5, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Position camera
      camera.position.z = 5;
      
      // Animation
      const clock = new THREE.Clock();
      
      const animate = () => {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        // Animate particles
        particlesRef.current.forEach(particle => {
          particle.position.x += Math.sin(elapsedTime * particle.userData.frequency) * particle.userData.amplitude;
          particle.position.y += Math.cos(elapsedTime * particle.userData.frequency) * particle.userData.amplitude;
          particle.position.z += particle.userData.velocity.z;
          
          // Boundary check
          if (Math.abs(particle.position.x) > 5) particle.userData.velocity.x *= -1;
          if (Math.abs(particle.position.y) > 5) particle.userData.velocity.y *= -1;
          if (Math.abs(particle.position.z) > 5) particle.userData.velocity.z *= -1;
        });
        
        // Rotate entire particle system
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    };

    initParticles();
  }, [isMounted]);

  // GSAP Animations
  useGSAP(() => {
    // Image animation
    gsap.fromTo(imageRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 1.1
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
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

    // Parallax effect
    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, [isMounted]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black"
    >
      {/* Particle background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
      />

      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {/* Image with overlay */}
        <div className="relative w-full h-[80vh] overflow-hidden group">
          <Image
            ref={imageRef}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            src={img1}
            alt="Coding Projects"
            width={1200}
            height={1400}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
          
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* Text overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
          <h1 
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase mb-4"
          >
            <span className="text-white/60 block">My</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Projects
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-4">
            Explore my portfolio of creative web solutions and innovative digital experiences
          </p>
          
          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center">
            <div className="animate-bounce">
              <div className="w-8 h-14 border-4 border-gray-400 rounded-full flex justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-6 h-6 bg-blue-500 rounded-full opacity-60"></div>
      <div className="absolute top-20 right-16 w-4 h-4 bg-purple-500 rounded-full opacity-60"></div>
      <div className="absolute top-1/3 left-20 w-8 h-8 bg-blue-500 rounded-full opacity-40"></div>
    </div>
  );
};

export default ProjectHero;