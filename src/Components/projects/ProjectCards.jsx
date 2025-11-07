"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCards = () => {
  const cardsRef = useRef([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projects.length === 0) return;

    const cards = cardsRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      const img = card.querySelector(".project-img");
      const content = card.querySelector(".project-content");
      const btnLive = card.querySelector(".btn-live");
      const btnCode = card.querySelector(".btn-code");

      // 3D Tilt
      const handleMouse = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { 
          rotateY: x * 18, 
          rotateX: -y * 18, 
          scale: 1.03, 
          duration: 0.6, 
          ease: "power3.out" 
        });
      };

      const reset = () => gsap.to(card, { 
        rotateY: 0, 
        rotateX: 0, 
        scale: 1, 
        duration: 0.6 
      });

      card.addEventListener("mousemove", handleMouse);
      card.addEventListener("mouseleave", reset);

      // Scroll Animations
      if (img && content) {
        gsap.fromTo(
          [img, content],
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: { 
              trigger: card, 
              start: "top 80%", 
              toggleActions: "play none none reverse" 
            },
          }
        );

        // Parallax Zoom
        gsap.to(img, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: { 
            trigger: card, 
            start: "top bottom", 
            end: "bottom top", 
            scrub: 1 
          },
        });
      }

      // Magnetic Buttons
      [btnLive, btnCode].forEach((btn) => {
        if (!btn) return;

        const move = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
          gsap.to(btn, { x, y, duration: 0.6, ease: "power2.out" });
        };

        const resetBtn = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6 });
        
        btn.addEventListener("mousemove", move);
        btn.addEventListener("mouseleave", resetBtn);
      });

      return () => {
        card.removeEventListener("mousemove", handleMouse);
        card.removeEventListener("mouseleave", reset);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [projects]);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Safe link getter with fallbacks
  const getSafeLink = (link, fallback = "#") => {
    return link && link !== "" ? link : fallback;
  };

  // Safe image getter with fallback
  const getSafeImage = (image) => {
    return image && image !== "" ? image : "/api/placeholder/400/300";
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-300">Loading projects...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
        <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
        <button
          onClick={fetchProjects}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
        <div className="text-gray-400 text-lg">No projects found</div>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-8 md:space-y-12">
        {projects.map((project, index) => (
          <article
            key={project._id || index}
            ref={addToRefs}
            className="group relative bg-gradient-to-br from-gray-900/70 via-gray-800/50 to-gray-900/70 
                       backdrop-blur-xl border border-gray-700/60 rounded-3xl p-5 md:p-7 
                       shadow-2xl overflow-hidden
                       [transform-style:preserve-3d] transition-all duration-500"
            style={{ perspective: "1200px" }}
          >
            {/* Gradient Border Glow */}
            <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              {/* Image */}
              <div className="relative h-56 md:h-72 overflow-hidden rounded-2xl">
                <Image
                  className="project-img w-full h-full object-cover"
                  src={getSafeImage(project.image)}
                  alt={project.title || "Project Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target;
                    target.src = '/api/placeholder/400/300';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="project-content space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
                  {project.title || "Untitled Project"}
                </h3>

                <p 
                  className="text-gray-300 text-sm md:text-base leading-relaxed" 
                  dangerouslySetInnerHTML={{ 
                    __html: project.description?.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') || 
                            project.description || 
                            "No description available."
                  }} 
                />

                {/* Tech Stack - using technologies array from your API */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium bg-gray-800/80 text-indigo-300 rounded-full border border-indigo-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {(!project.technologies || project.technologies.length === 0) && (
                    <span className="px-3 py-1 text-xs font-medium bg-gray-800/80 text-gray-400 rounded-full border border-gray-600/30">
                      {project.category || "No tech specified"}
                    </span>
                  )}
                </div>

                {/* Buttons - Only Live Demo since code link might not be in your API */}
                <div className="flex gap-3 mt-4">
                  <Link
                    href={getSafeLink(project.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-live relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-medium text-sm rounded-full shadow-lg hover:shadow-indigo-500/30 transition-all"
                  >
                    Live Demo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  
                  {/* Optional: Add GitHub link if available in your data */}
                  {project.github && (
                    <Link
                      href={getSafeLink(project.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-code relative inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/80 hover:bg-gray-700 text-white font-medium text-sm rounded-full border border-gray-600 hover:border-gray-500 transition-all"
                    >
                      Code
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 6.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6.75zM12 11.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM12.75 15a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5zM3.75 7.5h.007v.007H3.75V7.5zm0 4.5h.007v.007H3.75v-.007zm0 4.5h.007v.007H3.75v-.007z" />
                      </svg>
                    </Link>
                  )}
                </div>

                {/* Category Badge */}
                {project.category && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center ml-2 px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectCards;