import type { MetadataRoute } from "next";
import revelationOrder from "@/data/revelation-order.json";
import { SurahMeta } from "@/lib/types";

const BASE_URL = "https://orderedquran.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const surahs = revelationOrder as SurahMeta[];

  const surahPages = surahs.map((s) => ({
    url: `${BASE_URL}/surah/${s.revelationOrder}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...surahPages,
  ];
}
