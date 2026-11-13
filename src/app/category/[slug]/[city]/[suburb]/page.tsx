import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES, getCityBySlug, getSuburbBySlug } from "@/data/locations";
import { INITIAL_PROVIDERS } from "@/data/providers";
import { CATEGORY_FAQS } from "@/data/faqs";
import { CategorySuburbClient } from "./category-suburb-client";

export function generateStaticParams() {
  const params: { slug: string; city: string; suburb: string }[] = [];
  for (const cat of REPAIR_CATEGORIES) {
    for (const city of AUSTRALIAN_CITIES) {
      for (const suburb of city.popularSuburbs) {
        params.push({
          slug: cat.slug,
          city: city.slug,
          suburb: suburb.slug,
        });
      }
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ slug: string; city: string; suburb: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city: citySlug, suburb: suburbSlug } = await params;
  const category = REPAIR_CATEGORIES.find((c) => c.slug === slug);
  const city = getCityBySlug(citySlug);
  const suburb = getSuburbBySlug(citySlug, suburbSlug);

  if (!category || !city || !suburb) return {};

  return {
    title: `Same-Day ${category.name} in ${suburb.name} (${suburb.postcode}, ${city.state}) | Emergency Dispatch`,
    description: `Need urgent same-day ${category.name.toLowerCase()} in ${suburb.name} ${suburb.postcode}? Licensed ${city.state} trades, 45-60 min arrival, upfront ${category.typicalCalloutFee}, and 12-month warranties. Direct line: 0468 991 300.`,
    keywords: [
      `Same day ${category.name.toLowerCase()} ${suburb.name}`,
      `Emergency ${category.shortName.toLowerCase()} ${suburb.name}`,
      `${category.shortName.toLowerCase()} ${suburb.name} ${suburb.postcode}`,
      `${category.name} ${suburb.name}`,
      `${category.shortName.toLowerCase()} repairs ${suburb.name}`,
      ...suburb.nearbySuburbs.map((near) => `${category.shortName.toLowerCase()} ${near}`),
      ...category.popularIssues.map((issue) => `${issue} ${suburb.name}`),
    ],
    alternates: {
      canonical: `https://samedayrepairs.com.au/category/${category.slug}/${city.slug}/${suburb.slug}`,
    },
    openGraph: {
      title: `Same-Day ${category.name} in ${suburb.name} (${suburb.postcode}) | Verified Trades`,
      description: `Fastest on-call ${category.shortName.toLowerCase()} response in ${suburb.name}. Upfront fee caps, 100% licensed & insured. Call 0468 991 300.`,
      url: `https://samedayrepairs.com.au/category/${category.slug}/${city.slug}/${suburb.slug}`,
    },
  };
}

export default async function CategorySuburbPage({ params }: PageProps) {
  const { slug, city: citySlug, suburb: suburbSlug } = await params;
  const category = REPAIR_CATEGORIES.find((c) => c.slug === slug);
  const city = getCityBySlug(citySlug);
  const suburb = getSuburbBySlug(citySlug, suburbSlug);

  if (!category || !city || !suburb) {
    notFound();
  }

  // Filter providers in this city that service this category
  const cityProviders = INITIAL_PROVIDERS.filter(
    (p) => p.categoryIds.includes(category.id) && p.cityId === city.id
  );

  // Get neighboring suburb objects
  const nearbySuburbsList = city.popularSuburbs.filter((s) => s.slug !== suburb.slug).slice(0, 8);
  const faqs = CATEGORY_FAQS[category.id] || [];

  // Schema.org LocalBusiness / EmergencyService for Suburb
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: `SameDay ${category.name} ${suburb.name}`,
    description: `Same-day emergency ${category.name.toLowerCase()} across ${suburb.name} (${suburb.postcode}), ${city.name}, ${city.state}.`,
    telephone: "0468991300",
    url: `https://samedayrepairs.com.au/category/${category.slug}/${city.slug}/${suburb.slug}`,
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
        name: category.name,
        item: `https://samedayrepairs.com.au/category/${category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${category.shortName} in ${city.name}`,
        item: `https://samedayrepairs.com.au/category/${category.slug}/${city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${suburb.name} (${suburb.postcode})`,
        item: `https://samedayrepairs.com.au/category/${category.slug}/${city.slug}/${suburb.slug}`,
      },
    ],
  };

  // Schema.org FAQPage for Suburb
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: `${faq.question.replace(/\?$/, "")} in ${suburb.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
      <CategorySuburbClient
        category={category}
        city={city}
        suburb={suburb}
        providers={cityProviders}
        nearbySuburbsList={nearbySuburbsList}
        faqs={faqs}
      />
    </>
  );
}

