import React from "react";
import Link from "next/link";
import { HiArrowUp } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-[1440px] w-[540px] md:w-[1440px] py-[64px] px-[100px] flex flex-col gap-[32px]">
        <div className="w-full flex flex-col items-center justify-center gap-[32px]">
          <h1 className="text-[24px] md:text-[42px] lg:text-[64px] leading-[80px] font-extrabold">
            LET&apos;S TALK!
          </h1>
          <Link
            href={"https://mail.google.com/mail/u/0/"}
            target="_blank"
            className="flex items-center justify-center gap-[8px]"
          >
            tafhimhasan87@gmail.com{" "}
            <HiArrowUp className="rotate-[45deg] w-[15px]" />
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-0 justify-between items-center w-full">
          <h3>© Tsfhim Hasan - 2024</h3>
          <div className="flex items-center gap-[32px]">
            <Link
              href={"https://www.linkedin.com/in/tafhim-hasan-329677371/"}
              target="_blank"
              className="text-[#ffffff]/80 hover:text-[#ffffff]"
            >
              Linkdin
            </Link>
            <Link
              href={"https://www.facebook.com/profile.php?id=100042850024935"}
              target="_blank"
              className="text-[#ffffff]/80 hover:text-[#ffffff]"
            >
              Facebook
            </Link>
            <Link
              href={"https://www.instagram.com/fahi_m6406/"}
              target="_blank"
              className="text-[#ffffff]/80 hover:text-[#ffffff]"
            >
              Instagram
            </Link>
            <Link
              href={"https://x.com/hasan_tafh16703"}
              target="_blank"
              className="text-[#ffffff]/80 hover:text-[#ffffff]"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
