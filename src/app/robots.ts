import { MetadataRoute } from "next";

const BASE_URL = "https://var6.github.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all standard web crawlers
      {
        userAgent: "*",
        allow: "/",
      },
      // Google — main indexer + AI (Gemini/Bard training)
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // OpenAI / ChatGPT
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      // Anthropic / Claude
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Bing / Microsoft Copilot
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "msnbot",
        allow: "/",
      },
      // Common Crawl (used by many AI training datasets)
      {
        userAgent: "CCBot",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      // Apple
      {
        userAgent: "Applebot",
        allow: "/",
      },
      // Cohere
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
