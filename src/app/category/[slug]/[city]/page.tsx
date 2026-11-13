import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { INITIAL_PROVIDERS } from "@/data/providers";
import { CATEGORY_FAQS } from "@/data/faqs";
import { CityCategoryClient } from "./city-category-client";

export function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const cat of REPAIR_CATEGORIES) {
    for (const city of AUSTRALIAN_CITIES) {
      params.push({
        slug: cat.slug,
        city: city.slug,
      });
    }
  }
  return params;
}

interface PageProps {
  params: Promise<{ slug: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const category = REPAIR_CATEGORIES.find((c) => c.slug === slug);
  const city = AUSTRALIAN_CITIES.find((c) => c.slug === citySlug);
  if (!category || !city) return {};

  const suburbNames = city.popularSuburbs.slice(0, 4).map((s) => s.name).join(", ");

  return {
    title: `Same-Day ${category.name} in ${city.name} (${city.state}) | Emergency Technicians`,
    description: `Need urgent same-day ${category.name.toLowerCase()} in ${city.name}? Serving ${suburbNames} and all Greater ${city.name} postcodes. Guaranteed arrival, licensed ${city.state} trades, flat diagnostic fees.`,
    keywords: [
      `Same day ${category.name.toLowerCase()} ${city.name}`,
      `Emergency ${category.shortName.toLowerCase()} ${city.name}`,
      `${category.name} ${city.state}`,
      ...city.popularSuburbs.map((s) => `${category.shortName.toLowerCase()} ${s.name}`),
      ...category.popularIssues.map((issue) => `${issue} ${city.name}`),
    ],
    openGraph: {
      title: `Same-Day ${category.name} in ${city.name} | Verified Local Trades`,
      description: `Fastest on-call ${category.shortName.toLowerCase()} response in ${city.name}. Zero waiting, 100% ABN verified.`,
      url: `https://samedayrepairs.com.au/category/${category.slug}/${city.slug}`,
    },
  };
}

export default async function CityCategoryPage({ params }: PageProps) {
  const { slug, city: citySlug } = await params;
  const category = REPAIR_CATEGORIES.find((c) => c.slug === slug);
  const city = AUSTRALIAN_CITIES.find((c) => c.slug === citySlug);

  if (!category || !city) {
    notFound();
  }

  // Filter providers in this city that service this category
  const cityProviders = INITIAL_PROVIDERS.filter(
    (p) => p.categoryIds.includes(category.id) && p.cityId === city.id
  );

  const otherCities = AUSTRALIAN_CITIES.filter((c) => c.id !== city.id);
  const faqs = CATEGORY_FAQS[category.id] || [];

  // Schema.org LocalBusiness / EmergencyService
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: `SameDay ${category.name} ${city.name}`,
    description: `Same-day emergency ${category.name.toLowerCase()} across ${city.name}, ${city.state}.`,
    telephone: "0468991300",
    url: `https://samedayrepairs.com.au/category/${category.slug}/${city.slug}`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: city.state,
      },
    },
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: `${faq.question.replace(/\?$/, "")} in ${city.name}?`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CityCategoryClient
        category={category}
        city={city}
        providers={cityProviders}
        otherCities={otherCities}
        faqs={faqs}
      />
    </>
  );
}

