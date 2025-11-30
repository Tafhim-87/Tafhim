import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";

// Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Global SEO metadata
export const metadata = {
  metadataBase: new URL("https://tafhim.vercel.app"),

  title: {
    default: "Tafhim Hasan | Frontend Developer & Designer",
    template: "%s | Tafhim Hasan",
  },

  description:
    "Professional Frontend Developer skilled in Next.js, React, Tailwind CSS, animation, and web UI engineering. Explore projects, achievements, and design work.",

  keywords: [
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Web Designer",
    "Portfolio",
    "Bangladesh Developer",
  ],

  authors: [{ name: "Tafhim Hasan" }],

  creator: "Tafhim Hasan",

  // Canonical
  alternates: {
    canonical: "https://tafhim.vercel.app",
  },

  // Google Search Console
  verification: {
    google: "google0d78b39a8e1d93b6",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },

  // Enhanced OpenGraph (best for sharing)
  openGraph: {
    title: "Tafhim Hasan | Frontend Developer & Designer",
    description:
      "Explore modern web development projects built with Next.js, React, GSAP, and Tailwind CSS.",
    url: "https://tafhim.vercel.app",
    siteName: "Tafhim Hasan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tafhim Hasan Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card support
  twitter: {
    card: "summary_large_image",
    title: "Tafhim Hasan | Frontend Developer",
    description: "Frontend Developer specializing in Next.js & modern UI engineering.",
    images: ["/og-image.png"],
    creator: "@tafhimhasan",
  },

  // Performance optimizations
  themeColor: "#000000",
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* High-performance preloads */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* JSON-LD Schema — Best for Google Rankings */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tafhim Hasan",
              url: "https://tafhim.vercel.app",
              jobTitle: "Frontend Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance / Agency",
              },
              sameAs: [
                "https://www.linkedin.com/in/tafhimhasan/",
                "https://github.com/tafhimhasan",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
