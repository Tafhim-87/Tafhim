"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  
  // Define routes where Navbar and Footer should be hidden
  const hideNavbarFooterRoutes = [
    '/backend/home/dashboard',
    '/backend',
    '/admin'
    // Add more routes here if needed
  ];

  const hiddenFooter= [
    '/about-me-with-ai'
  ]

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.some(route => 
    pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNavbarFooter && <Navbar />}
      {children}
      {!shouldHideNavbarFooter && !hiddenFooter.includes(pathname) && <Footer />}
    </>
  );
}