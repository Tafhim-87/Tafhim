"use client";

import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Experties = () => {
  let data = [
    {
      title: "NextJS",
      disc: "A React framework for server-rendered and static web apps. It's great for fast, SEO-friendly websites with an excellent dev experience.",
    },
    {
      title: "NodeJS",
      disc: "A JavaScript runtime for building fast, scalable server-side applications. Perfect for real-time apps and APIs.",
    },
    {
      title: "MongoDB & MySQL",
      disc: "Experienced in both NoSQL (MongoDB) and SQL (MySQL) databases for flexible and structured data management.",
    },
    {
      title: "gSAP",
      disc: "Expert in creating seamless, high-performance 2d animations that enhance user experience using the GSAP library.",
    },
  ];

  const ref1 = useRef();
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useGSAP(() => {
    if (isDesktop) {
      gsap.from(".card", {
        x: 200,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref1.current,
          start: "top 50%",
        },
      });
    }
  });

  return (
    <div ref={ref1} className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-10">
          Expertise
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {data.map((item, index) => (
            <div
              className="card bg-black p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              key={index}
            >
              <li className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 list-none">
                {item.title}
              </li>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-300">
                {item.disc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experties;