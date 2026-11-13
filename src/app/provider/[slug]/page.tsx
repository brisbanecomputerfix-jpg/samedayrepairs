import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { INITIAL_PROVIDERS } from "@/data/providers";
import { ProviderClient } from "./provider-client";

export function generateStaticParams() {
  return INITIAL_PROVIDERS.map((p) => ({
    slug: p.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = INITIAL_PROVIDERS.find((p) => p.slug === slug);
  if (!provider) return {};

  return {
    title: `${provider.name} | Verified Same-Day Repairs (${provider.suburb}, ${provider.state})`,
    description: `${provider.tagline}. Based in ${provider.suburb}, ${provider.state}. ABN ${provider.abn} verified. Same-day cutoff: ${provider.sameDayCutoffTime}. Call ${provider.phone}.`,
    keywords: [
      provider.name,
      `${provider.name} ${provider.suburb}`,
      `Same day repairs ${provider.suburb}`,
      `Verified tradie ${provider.abn}`,
    ],
  };
}

export default async function ProviderPage({ params }: PageProps) {
  const { slug } = await params;
  const provider = INITIAL_PROVIDERS.find((p) => p.slug === slug);

  if (!provider) {
    notFound();
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: provider.name,
    description: provider.bio,
    telephone: provider.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: provider.suburb,
      addressRegion: provider.state,
      postalCode: provider.postcode,
      addressCountry: "AU",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: provider.rating,
      reviewCount: provider.reviewCount,
    },
    priceRange: "$$",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <ProviderClient provider={provider} />
    </>
  );
}
