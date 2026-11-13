import { MetadataRoute } from "next";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://samedayrepairs.com.au";
  const currentDate = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    // Root Homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 9 Primary Category Hubs
  for (const cat of REPAIR_CATEGORIES) {
    entries.push({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    });
  }

  // 81 Category + City Hubs
  for (const cat of REPAIR_CATEGORIES) {
    for (const city of AUSTRALIAN_CITIES) {
      entries.push({
        url: `${baseUrl}/category/${cat.slug}/${city.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  // Suburb Master Hubs: /suburbs/[city]/[suburb]
  for (const city of AUSTRALIAN_CITIES) {
    for (const suburb of city.popularSuburbs) {
      entries.push({
        url: `${baseUrl}/suburbs/${city.slug}/${suburb.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  // Hyper-Local Category + Suburb Pages: /category/[slug]/[city]/[suburb]
  for (const cat of REPAIR_CATEGORIES) {
    for (const city of AUSTRALIAN_CITIES) {
      for (const suburb of city.popularSuburbs) {
        entries.push({
          url: `${baseUrl}/category/${cat.slug}/${city.slug}/${suburb.slug}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.75,
        });
      }
    }
  }

  return entries;
}
