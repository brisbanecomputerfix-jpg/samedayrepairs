import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES, getCityBySlug, getSuburbBySlug } from "@/data/locations";
import { INITIAL_PROVIDERS } from "@/data/providers";
import { SuburbClient } from "./suburb-client";

export function generateStaticParams() {
  const params: { city: string; suburb: string }[] = [];
  for (const city of AUSTRALIAN_CITIES) {
    for (const suburb of city.popularSuburbs) {
      params.push({
        city: city.slug,
        suburb: suburb.slug,
      });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ city: string; suburb: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug, suburb: suburbSlug } = await params;
  const city = getCityBySlug(citySlug);
  const suburb = getSuburbBySlug(citySlug, suburbSlug);

  if (!city || !suburb) return {};

  return {
    title: `Same-Day Emergency Repairs & Trades in ${suburb.name} ${city.state} ${suburb.postcode} | Fast Dispatch`,
    description: `Need urgent emergency tradies in ${suburb.name} (${suburb.postcode})? Licensed whitegoods mechanics, 24/7 plumbers, locksmiths & electricians dispatched in 45-60 mins. Upfront pricing, 12-mo warranty. Call 0468 991 300.`,
    keywords: [
      `Emergency repairs ${suburb.name}`,
      `Same day tradies ${suburb.name}`,
      `Emergency plumber ${suburb.name} ${suburb.postcode}`,
      `24/7 locksmith ${suburb.name}`,
      `Appliance repairs ${suburb.name}`,
      `Electrician ${suburb.name}`,
      `Emergency trades ${city.state}`,
      ...suburb.nearbySuburbs.map((near) => `same day repairs ${near}`),
    ],
    alternates: {
      canonical: `https://samedayrepairs.com.au/suburbs/${city.slug}/${suburb.slug}`,
    },
    openGraph: {
      title: `Same-Day Emergency Repairs in ${suburb.name} (${suburb.postcode}) | 45-Min Arrival`,
      description: `Fastest on-call emergency trade dispatch in ${suburb.name}, ${city.name}. Upfront fee caps, 100% licensed & insured. Call 0468 991 300.`,
      url: `https://samedayrepairs.com.au/suburbs/${city.slug}/${suburb.slug}`,
    },
  };
}

export default async function SuburbPage({ params }: PageProps) {
  const { city: citySlug, suburb: suburbSlug } = await params;
  const city = getCityBySlug(citySlug);
  const suburb = getSuburbBySlug(citySlug, suburbSlug);

  if (!city || !suburb) {
    notFound();
  }

  // Filter providers in this city
  const cityProviders = INITIAL_PROVIDERS.filter((p) => p.cityId === city.id);

  // Get neighboring suburb objects
  const nearbySuburbsList = city.popularSuburbs.filter((s) => s.slug !== suburb.slug).slice(0, 8);

  // Schema.org LocalBusiness / EmergencyService for Suburb Hub
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: `SameDay Repairs ${suburb.name}`,
    description: `Same-day emergency trade repairs across ${suburb.name} (${suburb.postcode}), ${city.name}, ${city.state}.`,
    telephone: "0468991300",
    url: `https://samedayrepairs.com.au/suburbs/${city.slug}/${suburb.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: suburb.name,
      postalCode: suburb.postcode,
      addressRegion: city.state,
      addressCountry: "AU",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: `${suburb.name} ${suburb.postcode}`,
      },
      ...suburb.nearbySuburbs.map((near) => ({
        "@type": "AdministrativeArea",
        name: near,
      })),
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
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
    ],
  };

  // Schema.org BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://samedayrepairs.com.au",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `Greater ${city.name}`,
        item: `https://samedayrepairs.com.au/category/appliance-repairs/${city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${suburb.name} (${suburb.postcode})`,
        item: `https://samedayrepairs.com.au/suburbs/${city.slug}/${suburb.slug}`,
      },
    ],
  };

  // Schema.org FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How fast can a repair van arrive in ${suburb.name} (${suburb.postcode}) today?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Technicians dispatched through SameDayRepairs typically arrive within 45 to 60 minutes for urgent crises across ${suburb.name} and ${suburb.region}.`,
        },
      },
      {
        "@type": "Question",
        name: `Are there extra travel fees for callouts to ${suburb.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `No. Our emergency diagnostic and callout fees are fixed upfront (from $149). The diagnostic fee is waived or credited toward the total invoice if you proceed with the repair.`,
        },
      },
      {
        "@type": "Question",
        name: `Are all technicians licensed under ${city.state} trade authorities?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. Every contractor in the directory undergoes annual ABN verification, holds appropriate state trade licences (such as QBCC in QLD), and maintains active $20M public liability insurance.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SuburbClient
        city={city}
        suburb={suburb}
        categories={REPAIR_CATEGORIES}
        providers={cityProviders}
        nearbySuburbsList={nearbySuburbsList}
      />
    </>
  );
}

