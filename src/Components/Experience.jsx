import React from "react";
import Link from "next/link";

const Experience = () => {
  let data = [
    {
      position: "Frontend Developer Intern",
      company: "Code Valy",
      date: "01/02/2025 - running",
      link: "https://codevaly.com/",
    },
    {
      position: "Frontend Developer Intern",
      company: "Acronation",
      date: "10/24/2024 - 01/30/2025",
      link: "https://acronation.net/",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col gap-8 py-4 md:py-12 px-4 sm:px-6 md:px-10 container lg:px-20 xl:px-28 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center sm:text-left">
          Experience
        </h1>
        <div className="space-y-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 py-4 gap-4 sm:gap-0"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/90 w-full sm:w-1/2">
                {item.position}
              </h2>
              <div className="flex flex-col gap-2 sm:items-end w-full sm:w-1/2">
                <Link href={item.link} target="_blank" className="hover:underline">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-600">
                    {item.company}
                  </h3>
                </Link>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;