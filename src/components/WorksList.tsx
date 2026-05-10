import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HalftoneOrb from "./HalftoneOrb";
import { sortedWorkItems } from "@/data/content";

type WorksListProps = {
  limit?: number;
  showViewAll?: boolean;
  topClassName?: string;
};

export default function WorksList({ limit, showViewAll = false, topClassName = "mt-10" }: WorksListProps) {
  const items = typeof limit === "number" ? sortedWorkItems.slice(0, limit) : sortedWorkItems;

  return (
    <section id="works" className={topClassName}>
      <p className="mb-3 border-b border-border pb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-very-muted">
        Works
      </p>
      <div className="space-y-2">
        {items.map((item, index) => (
          <Link
            key={item.slug}
            href={`/works/${item.slug}`}
            className="group flex flex-col gap-3 rounded-[16px] border border-border px-3.5 py-1 transition-colors duration-[120ms] hover:bg-hover-bg dark:hover:bg-[#f8f8ff] dark:hover:text-[#050505] sm:flex-row sm:items-center sm:gap-4"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="h-[33.44px] w-[33.44px] shrink-0">
                <HalftoneOrb size={33.44} seed={index + 40} variant="item" colorScheme={item.status === "In Progress" ? "orange" : "green"} />
              </div>
              <div className="min-w-0 dark:group-hover:text-[#050505]">
                <h3 className="text-[16px] font-medium leading-[1.25]">{item.title}</h3>
              </div>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-5 self-end sm:self-auto">
              <p className="font-mono text-[12px] text-[#050505] dark:text-very-muted dark:group-hover:text-[#050505]">
                {item.status === "In Progress"
                  ? "In Progress"
                  : new Date(item.date as string).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
              </p>
              <div
                className="h-10 w-16 shrink-0 rounded border border-border"
                style={{
                  background: `linear-gradient(135deg, ${item.thumbnailColor}, #111111 58%, #5f8cff)`
                }}
                aria-hidden="true"
              />
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
          href="/works"
          className="mt-3 inline-flex items-center gap-2 rounded-md px-1 py-1 font-mono text-[12px] tracking-[0.12em] text-very-muted transition-colors duration-[120ms] hover:text-text"
        >
          view all works <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </section>
  );
}
