import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import Script from "next/script";

// Local Fonts
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

// SEO Metadata
export const metadata = {
  title: "Tafhim Hasan | Frontend Developer & Designer",
  description:
    "I'm Tafhim Hasan, a passionate Frontend Developer specializing in Next.js, React, and modern web design. Explore my projects, design work, and web innovations.",

  // ✅ Google Search Console Verification (META tag version)
  verification: {
    google: "google0d78b39a8e1d93b6",
  },

  openGraph: {
    title: "Tafhim Hasan | Frontend Developer & Designer",
    description:
      "Explore Tafhim Hasan’s portfolio: modern web apps built with Next.js, React, and Tailwind CSS.",
    url: "https://tafhim.vercel.app",
    siteName: "Tafhim Hasan Portfolio",
    images: [
      {
        url: "https://tafhim.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tafhim Hasan Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Structured Data for Google */}
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
                name: "Freelance / Agency Work",
              },
              sameAs: [
                "https://www.linkedin.com/in/tafhimhasan/",
                "https://github.com/tafhimhasan",
              ],
            }),
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
