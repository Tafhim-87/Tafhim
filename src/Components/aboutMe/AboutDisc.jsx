import React from "react";

const AboutDisc = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-[1440px] w-[380px] md:w-[780px] lg:w-[1440px] py-[64px] px-[8px] lg:px-[100px] flex flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-between  gap-[32px]">
        <h1 className="text-[28px] md:text-[38px] lg:text-[50px] font-bold w-full">
          About me
        </h1>
        <h3 className="text-[12px] md:text-[14px] lg:text-[16px] w-full">
          I am a front-end web developer. I specialize in building responsive,
          user-friendly websites and applications. Proficient in HTML, CSS, and
          JavaScript, and experience using library like React to create dynamic,
          visually appealing interfaces. Passionate about optimizing user
          experiences and staying up-to-date with the latest trends in web
          development.
        </h3>
      </div>
    </div>
  );
};

export default AboutDisc;
