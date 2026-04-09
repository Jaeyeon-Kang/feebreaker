import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://feebreaker.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                              lastModified: new Date("2026-04-03"), changeFrequency: "weekly",  priority: 1    },
    { url: `${baseUrl}/us/stripe`,               lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/us/paypal`,               lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/gb/stripe`,               lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/gb/paypal`,               lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/ca/stripe`,               lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/ca/paypal`,               lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/au/stripe`,               lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/au/paypal`,               lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/etsy`,                    lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/paypal/friends-family`,   lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseUrl}/us/stripe-ach`,           lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseUrl}/compare`,                 lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.8  },
    { url: `${baseUrl}/invoice`,                 lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.9  },
    { url: `${baseUrl}/margin`,                  lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.7  },
    { url: `${baseUrl}/hourly`,                  lastModified: new Date("2026-03-26"), changeFrequency: "monthly", priority: 0.7  },
    { url: `${baseUrl}/about`,                   lastModified: new Date("2026-03-26"), changeFrequency: "yearly",  priority: 0.4  },
    { url: `${baseUrl}/contact`,                 lastModified: new Date("2026-03-26"), changeFrequency: "yearly",  priority: 0.3  },
    { url: `${baseUrl}/privacy`,                 lastModified: new Date("2026-03-26"), changeFrequency: "yearly",  priority: 0.2  },
    { url: `${baseUrl}/terms`,                   lastModified: new Date("2026-03-26"), changeFrequency: "yearly",  priority: 0.2  },
    { url: `${baseUrl}/blog`,                    lastModified: new Date("2026-04-03"), changeFrequency: "weekly",  priority: 0.7  },
  ];

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
