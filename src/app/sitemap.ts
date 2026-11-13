import { MetadataRoute } from "next";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://samedayrepairs.com.au";
  const currentDate = new Date().toISOString();

  // Root Homepage
  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 9 Category Hubs
  for (const cat of REPAIR_CATEGORIES) {
    entries.push({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    });
  }

  // 81 Category + City Localized Landing Pages
  for (const cat of REPAIR_CATEGORIES) {
    for (const city of AUSTRALIAN_CITIES) {
      entries.push({
        url: `${baseUrl}/category/${cat.slug}/${city.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}

