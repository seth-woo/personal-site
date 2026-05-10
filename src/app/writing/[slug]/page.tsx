import Link from "next/link";
import { notFound } from "next/navigation";
import { writingItems, sortedWritingItems } from "@/data/content";
import HalftoneOrb from "@/components/HalftoneOrb";

type WritingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return writingItems.map((item) => ({ slug: item.slug }));
}

export default async function WritingDetailPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const item = writingItems.find((entry) => entry.slug === slug);

  if (!item) notFound();

  const sortedItems = sortedWritingItems;
  const currentIndex = sortedItems.findIndex((entry) => entry.slug === slug);
  const previousItem = currentIndex < sortedItems.length - 1 ? sortedItems[currentIndex + 1] : null;
  const nextItem = currentIndex > 0 ? sortedItems[currentIndex - 1] : null;

  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <article className="min-h-screen">
      <div className="mb-6">
        <Link href="/writing" className="text-[13px] font-mono text-muted hover:underline">
          ← view all writings
        </Link>
      </div>
      
      <header className="mb-6 flex items-center gap-4">
        <HalftoneOrb size={76} seed={0} variant="hero" colorScheme="blue" />
        <div>
          <h1 className="text-[1.9rem] font-medium leading-tight">{item.title}</h1>
          <p className="mt-2 text-[15px] font-normal text-muted">{item.subtitle}</p>
        </div>
      </header>

      <div className="grid grid-cols-[120px_1fr] gap-x-12">
        <div className="text-[13px] font-mono text-very-muted pt-[3px] sticky top-12 h-fit">
          <p>{formattedDate}</p>
          <p className="mt-1">{item.readMinutes} min read</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="space-y-6 text-[15px] leading-[1.8] text-text text-justify">
            {item.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <nav className="mt-12 flex items-center justify-between border-t border-border pt-8">
            {previousItem && (
              <Link
                href={`/writing/${previousItem.slug}`}
                className="flex flex-col text-[14px] font-sans text-muted hover:text-text transition-colors"
              >
                ← Previous
                <span className="text-[13px] font-sans">{previousItem.title}</span>
              </Link>
            )}
            
            <div className="flex-1" />
            
            {nextItem && (
              <Link
                href={`/writing/${nextItem.slug}`}
                className="flex flex-col items-end text-[14px] font-mono text-muted hover:text-text transition-colors"
              >
                Next →
                <span className="text-[13px] font-sans">{nextItem.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </div>

      <footer className="mt-12 border-t border-border pt-8 text-center font-mono text-[12px] text-very-muted">
        <p>© {new Date().getFullYear()} Seth W.H. Woo</p>
      </footer>
    </article>
  );
}
