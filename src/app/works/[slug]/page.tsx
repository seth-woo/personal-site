import { notFound } from "next/navigation";
import Link from "next/link";
import { workItems } from "@/data/content";
import HalftoneOrb from "@/components/HalftoneOrb";

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const item = workItems.find((item) => item.slug === params.slug);

  if (!item) {
    notFound();
  }

  const formattedDate = item.date 
    ? new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    : "";

  return (
    <article className="min-h-screen flex flex-col">
      <div className="mb-6">
        <Link href="/works" className="text-[13px] font-mono text-muted hover:underline">
          ← view all works
        </Link>
      </div>
      
      <header className="mb-6 flex items-center gap-4">
        <HalftoneOrb size={76} seed={0} variant="hero" colorScheme={item.status === "In Progress" ? "orange" : "green"} />
        <div>
          <h1 className="text-[1.9rem] font-medium leading-tight">{item.title}</h1>
          <p className="mt-2 text-[15px] font-normal text-muted">{item.subtitle}</p>
        </div>
      </header>

      <div className="grid grid-cols-[120px_1fr] gap-x-12 flex-1">
        <div className="text-[13px] font-mono text-very-muted pt-[3px] sticky top-12 h-fit">
          {item.status === "Completed" && item.date && (
            <>
              <p>{formattedDate}</p>
              <p className="mt-1">{item.source || "Insert Source"}</p>
            </>
          )}
          {item.status === "In Progress" && <p className="mt-1">{item.status}</p>}
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none flex flex-col">
          <div className="space-y-6 text-[15px] leading-[1.8] text-text text-justify flex-1">
            {item.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <nav className="mt-8 flex items-center justify-between border-t border-border pt-4">
            {(() => {
              const currentIndex = workItems.findIndex((item) => item.slug === params.slug);
              const sortedItems = [...workItems].sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
              const prevItem = currentIndex < sortedItems.length - 1 ? sortedItems[currentIndex + 1] : null;
              const nextItem = currentIndex > 0 ? sortedItems[currentIndex - 1] : null;
              
              return (
                <>
                  {prevItem && (
                    <Link
                      href={`/works/${prevItem.slug}`}
                      className="flex flex-col text-[14px] font-sans text-muted hover:text-text transition-colors"
                    >
                      ← Previous
                      <span className="text-[13px] font-sans">{prevItem.title}</span>
                    </Link>
                  )}
                  
                  <div className="flex-1" />
                  
                  {nextItem && (
                    <Link
                      href={`/works/${nextItem.slug}`}
                      className="flex flex-col items-end text-[14px] font-mono text-muted hover:text-text transition-colors"
                    >
                      Next →
                      <span className="text-[13px] font-sans">{nextItem.title}</span>
                    </Link>
                  )}
                </>
              );
            })()}
          </nav>
        </div>
      </div>

      <footer className="mt-8 border-t border-border pt-8 text-center font-mono text-[12px] text-very-muted">
        <p>© {new Date().getFullYear()} Seth W.H. Woo</p>
      </footer>
    </article>
  );
}
