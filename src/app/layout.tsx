import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { DemoBanner } from "@/components/demo-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://samedayrepairs.com.au"),
  title: {
    default: "SameDayRepairs.com.au | Australia's Same-Day Emergency Trade Directory",
    template: "%s | SameDayRepairs.com.au",
  },
  description:
    "Instant emergency dispatch for verified Australian whitegoods repairers, 24/7 plumbers, locksmiths, electricians, and tradesmen ready today. Upfront diagnostic fees from $149, audited state licences, and 12-month warranties. Direct line: 0468 991 300.",
  keywords: [
    "Same Day Repairs Australia",
    "Emergency whitegoods repair Brisbane",
    "Same day fridge repair Sydney",
    "24/7 emergency plumber Melbourne",
    "Emergency locksmith Gold Coast",
    "Emergency electrician Perth",
    "Garage door repair same day",
    "Urgent tradies Australia",
    "QBCC licensed emergency trades",
    "Emergency dishwasher repair",
    "Burst pipe plumber near me",
  ],
  applicationName: "SameDayRepairs",
  authors: [{ name: "SameDayRepairs Australia", url: "https://samedayrepairs.com.au" }],
  creator: "SameDayRepairs Australia",
  publisher: "SameDayRepairs Australia",
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: "https://samedayrepairs.com.au",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "SameDayRepairs.com.au | Australia's Same-Day Emergency Trade Directory",
    description:
      "Find licensed, verified technicians with guaranteed same-day availability across Brisbane, Sydney, Melbourne, Gold Coast, Perth, and nationwide. Call 0468 991 300.",
    url: "https://samedayrepairs.com.au",
    siteName: "SameDayRepairs.com.au",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SameDayRepairs.com.au - Australia's Same-Day Emergency Trade Network",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SameDayRepairs.com.au | Australia's Same-Day Emergency Trade Directory",
    description:
      "Instant emergency dispatch for whitegoods, plumbers, locksmiths, and electricians with guaranteed same-day arrival. Call 0468 991 300.",
    images: ["/twitter-image.png"],
    creator: "@SameDayRepairsAU",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EmergencyService", "HomeAndConstructionBusiness"],
        "@id": "https://samedayrepairs.com.au/#organization",
        name: "SameDayRepairs.com.au",
        url: "https://samedayrepairs.com.au",
        logo: "https://samedayrepairs.com.au/icon-512.png",
        image: "https://samedayrepairs.com.au/opengraph-image.png",
        telephone: "+61468991300",
        priceRange: "$$",
        currenciesAccepted: "AUD",
        paymentAccepted: "Credit Card, Debit Card, EFTPOS, Apple Pay, Google Pay",
        areaServed: [
          { "@type": "City", name: "Brisbane" },
          { "@type": "City", name: "Sydney" },
          { "@type": "City", name: "Melbourne" },
          { "@type": "City", name: "Gold Coast" },
          { "@type": "City", name: "Perth" },
          { "@type": "Country", name: "Australia" },
        ],
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        description:
          "Australia's verified directory of same-day emergency repairers and licensed trade contractors. Fixed diagnostic pricing and 12-month warranties.",
      },
      {
        "@type": "WebSite",
        "@id": "https://samedayrepairs.com.au/#website",
        url: "https://samedayrepairs.com.au",
        name: "SameDayRepairs.com.au",
        publisher: { "@id": "https://samedayrepairs.com.au/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://samedayrepairs.com.au/?suburb={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <DemoBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
