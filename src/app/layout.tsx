import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { DemoBanner } from "@/components/demo-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "SameDayRepairs.com.au | Australia's Urgent Repair Network",
    template: "%s | SameDayRepairs.com.au",
  },
  description:
    "Instant directory and emergency dispatch for verified Australian whitegoods repairers, 24/7 plumbers, locksmiths, electricians, and tradesmen ready to arrive today. No bidding, no flakes.",
  keywords: [
    "Same Day Repairs Australia",
    "Emergency whitegoods repair Brisbane",
    "Same day fridge repair Sydney",
    "24/7 emergency plumber Melbourne",
    "Emergency locksmith Gold Coast",
    "Emergency electrician Perth",
    "Garage door repair same day",
    "Urgent tradies Australia",
  ],
  applicationName: "SameDayRepairs",
  authors: [{ name: "SameDayRepairs Australia" }],
  openGraph: {
    title: "SameDayRepairs.com.au | Australia's Same-Day Trade Directory",
    description:
      "Find licensed, verified technicians with guaranteed same-day availability across Brisbane, Sydney, Melbourne, Gold Coast, Perth, and nationwide.",
    url: "https://samedayrepairs.com.au",
    siteName: "SameDayRepairs.com.au",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <DemoBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
