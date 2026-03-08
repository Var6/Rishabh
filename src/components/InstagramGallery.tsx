"use client";
import Image from "next/image";
import { Instagram, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

type InstaMedia = {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  permalink: string;
  caption?: string;
};

interface Props {
  media?: InstaMedia[];
}

// Shown when no token / API error
function InstagramCTA() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-lg">
        <Instagram size={28} className="text-white" />
      </div>
      <div className="text-center">
        <p className="text-slate-900 dark:text-white font-bold text-lg mb-1">@Rishabh_stark</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm">See my latest photos and life behind the code</p>
      </div>
      <a
        href="https://www.instagram.com/Rishabh_stark"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white text-sm font-semibold transition-opacity shadow-md"
      >
        <Instagram size={16} />
        View on Instagram
        <ExternalLink size={13} />
      </a>
    </div>
  );
}

export default function InstagramGallery({ media = [] }: Props) {
  return (
    <section className="py-20 sm:py-24 section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="text-pink-600 dark:text-pink-400 text-xs font-bold tracking-widest uppercase mb-3">
            Instagram
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Life{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              behind the code
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm">
            Follow{" "}
            <a
              href="https://www.instagram.com/Rishabh_stark"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 dark:text-pink-400 hover:underline font-medium"
            >
              @Rishabh_stark
            </a>{" "}
            for more.
          </p>
        </AnimatedSection>

        {media.length === 0 ? (
          <InstagramCTA />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {media.slice(0, 8).map((item, i) => (
              <motion.a
                key={item.id}
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden card-bg"
              >
                <Image
                  src={item.media_type === "VIDEO" ? (item.thumbnail_url ?? item.media_url) : item.media_url}
                  alt={item.caption?.slice(0, 60) ?? "Instagram photo"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ExternalLink size={20} className="text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {media.length > 0 && (
          <AnimatedSection className="text-center mt-8">
            <a
              href="https://www.instagram.com/Rishabh_stark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white text-sm font-semibold transition-opacity"
            >
              <Instagram size={15} />
              Follow @Rishabh_stark
            </a>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
