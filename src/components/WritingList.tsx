"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HalftoneOrb from "./HalftoneOrb";
import { sortedWritingItems } from "@/data/content";
import { useState, useEffect } from "react";

type WritingListProps = {
  limit?: number;
  showViewAll?: boolean;
  topClassName?: string;
};

export default function WritingList({ limit, showViewAll = false, topClassName = "mt-11" }: WritingListProps) {
  const items = typeof limit === "number" ? sortedWritingItems.slice(0, limit) : sortedWritingItems;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="writing" className={topClassName}>
      <p className="mb-3 border-b border-border pb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-very-muted">
        Writing
      </p>
      <div className="space-y-0">
        {items.map((item, index) => (
          <Link
            key={item.slug}
            href={`/writing/${item.slug}`}
            onMouseEnter={() => setHoveredSlug(item.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            // className={`group flex flex-col gap-3 rounded-[16px] border border-border px-3.5 py-1 transition-colors transition-opacity duration-[120ms] dark:hover:bg-white dark:hover:text-[#050505] hover:bg-[#111111] hover:text-white sm:flex-row sm:items-center sm:gap-4 ${hoveredSlug !== null && hoveredSlug !== item.slug ? "opacity-60" : "opacity-100"}`}
            className={`group flex flex-col gap-3 rounded-[16px] border border-border px-3.5 py-1 transition-colors transition-opacity duration-[120ms] dark:hover:bg-white dark:hover:text-[#050505] hover:bg-[#111111] hover:text-white sm:flex-row sm:items-center sm:gap-4 ${
              hoveredSlug !== null && hoveredSlug !== item.slug
                ? "opacity-40"
                : hoveredSlug === item.slug
                ? "opacity-100 shadow-[0_6px_24px_rgba(0,0,0,0.36)] -translate-y-[3px]"
                : "opacity-100"
            }`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="h-[33.44px] w-[33.44px] shrink-0">
                <HalftoneOrb size={33.44} seed={index + 20} variant="item" colorScheme="blue" forceDarkMode={!isDarkMode} />
              </div>
              <div className="min-w-0 dark:group-hover:text-[#050505]">
                <h3 className="text-[16px] font-medium leading-[1.25]">{item.title}</h3>
              </div>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-5 self-end sm:self-auto">
              <p className="font-mono text-[12px] text-[#050505] dark:text-very-muted dark:group-hover:text-[#050505] group-hover:text-[#ececed]">
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                })}{" "}
                · {item.readMinutes} min read
              </p>
              <ArrowUpRight
                size={17}
                strokeWidth={1.7}
                className="text-muted dark:group-hover:text-[#050505]"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
      {showViewAll ? (
        <Link
          href="/writing"
          className="mt-3 inline-flex items-center gap-2 rounded-md px-1 py-1 font-mono text-[12px] tracking-[0.12em] text-very-muted transition-colors duration-[120ms] hover:text-text"
        >
          view all writings <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </section>
  );
}
