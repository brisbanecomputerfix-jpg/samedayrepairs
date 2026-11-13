import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { INITIAL_PROVIDERS } from "@/data/providers";
import { CATEGORY_FAQS } from "@/data/faqs";
import { CategoryClient } from "./category-client";

export function generateStaticParams() {
  return REPAIR_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = REPAIR_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `Same-Day ${category.name} | Australia Urgent Repairs`,
    description: `Book licensed same-day ${category.name.toLowerCase()} technicians across Brisbane, Sydney, Melbourne, Gold Coast, Perth and nationwide. Flat diagnostic call-outs, 12-month warranty, zero waiting.`,
    keywords: [
      `Same day ${category.name.toLowerCase()}`,
      `Emergency ${category.shortName.toLowerCase()} Australia`,
      `Same day ${category.shortName.toLowerCase()} Brisbane`,
      `Same day ${category.shortName.toLowerCase()} Sydney`,
      `Same day ${category.shortName.toLowerCase()} Melbourne`,
      ...category.popularIssues,
    ],
    openGraph: {
      title: `Same-Day ${category.name} Australia | Guaranteed Urgent Dispatch`,
      description: `Fastest response for ${category.name.toLowerCase()}. Verified Australian tradesmen on-call today.`,
      url: `https://samedayrepairs.com.au/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = REPAIR_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryProviders = INITIAL_PROVIDERS.filter((p) =>
    p.categoryIds.includes(category.id)
  );

  const faqs = CATEGORY_FAQS[category.id] || [];

  // JSON-LD Structured Data for Google Rich Results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.name,
    serviceType: category.shortName,
    description: category.description,
    provider: {
      "@type": "Organization",
      name: "SameDayRepairs.com.au",
      url: "https://samedayrepairs.com.au",
      telephone: "0468991300",
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <CategoryClient
        category={category}
        cities={AUSTRALIAN_CITIES}
        providers={categoryProviders}
        faqs={faqs}
      />
    </>
  );
}

