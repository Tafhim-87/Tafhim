"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Loader from "@/Components/Loader";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);      // For first load only
  const [showLoader, setShowLoader] = useState(false);   // For route changes

  /* -------------------------- FIRST TIME LOADER -------------------------- */
  useEffect(() => {
    const hasSeenLoader = localStorage.getItem("loaderShown");

    if (!hasSeenLoader) {
      // Show initial loader
      setShowLoader(true);

      setTimeout(() => {
        setShowLoader(false);
        localStorage.setItem("loaderShown", "true");
        setIsLoading(false);
      }, 1200); // your loader duration
    } else {
      setIsLoading(false);
    }
  }, []);

  /* ------------------------- ROUTE CHANGE LOADER ------------------------- */
  useEffect(() => {
    if (isLoading) return; // Skip first-time logic

    setShowLoader(false);
    let delayTimer = null;
    let finishTimer = null;

    // Start detecting slow route navigation
    delayTimer = setTimeout(() => {
      setShowLoader(true);
    }, 150);

    finishTimer = setTimeout(() => {
      setShowLoader(false);
    }, 900);

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(finishTimer);
    };
  }, [pathname]);

  /* ---------------------- HIDE NAVBAR/FOOTER LOGIC ----------------------- */
  const hideNavbarFooterRoutes = [
    "/backend/home/dashboard",
    "/backend",
    "/admin",
  ];

  const hiddenFooter = ["/about-me-with-ai"];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {showLoader && <Loader />}

      {!shouldHideNavbarFooter && <Navbar />}

      <div
        className={`transition-opacity duration-300 ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      {!shouldHideNavbarFooter &&
        !hiddenFooter.includes(pathname) &&
        <Footer />}
    </>
  );
}
