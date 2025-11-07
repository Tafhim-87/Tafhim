"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from './Card';
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '@/Components/hero.css';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort projects: featured first, then limit to 6
  const getDisplayProjects = () => {
    if (!projects.length) return [];
    
    // Sort: featured projects first, then by creation date or other criteria
    const sortedProjects = [...projects].sort((a, b) => {
      // If both are featured or both are not, maintain original order or sort by date
      if (a.featured && b.featured) {
        return new Date(b.createdAt) - new Date(a.createdAt); // newest first
      }
      if (a.featured) return -1; // a comes first
      if (b.featured) return 1; // b comes first
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first for non-featured
    });
    
    // Limit to 6 projects
    return sortedProjects.slice(0, 6);
  };

  const displayProjects = getDisplayProjects();
  const hasMoreProjects = projects.length > 6;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-black text-white">
      <div className="flex justify-between items-center py-6 md:py-[64px] px-5 lg:px-[100px] max-w-[1440px] container">
        <h1 className="text-[28px] md:text-[38px] lg:text-[50px] font-bold">
          Projects
        </h1>
        <Link href="/projects" className="text-blue-600 hover:underline">
          view all
        </Link>
      </div>

      {/* Show message if no projects */}
      {displayProjects.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg">No projects found</p>
        </div>
      )}

      {/* Card Grid - Desktop */}
      <div className="hidden md:flex flex-wrap gap-5 justify-center lg:justify-between items-center px-5 container">
        {displayProjects.map((item, index) => (
          <Card
            key={item._id || index}
            image={item.image}
            title={item.title}
            description={item.description}
            link={item.link}
          />
        ))}
      </div>

      {/* Swiper Coverflow Carousel - Mobile */}
      <div className="w-full flex md:hidden px-5">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper max-w-[1200px]"
        >
          {displayProjects.map((item, index) => (
            <SwiperSlide key={item._id || index} className="w-[300px]">
              <Card
                image={item.image}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Work;