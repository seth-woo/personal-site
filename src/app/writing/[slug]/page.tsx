import Link from "next/link";
import { notFound } from "next/navigation";
import { writingItems, sortedWritingItems } from "@/data/content";

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
    month: "long",
    year: "numeric"
  });

  return (
    <article className="min-h-screen">
      <div className="mb-6">
        <Link href="/writing" className="text-[13px] font-mono text-muted hover:underline">
          ← view all writings
        </Link>
      </div>
      
      <header className="mb-6">
        <h1 className="text-[2rem] font-medium leading-tight">{item.title}</h1>
        <p className="mt-2 text-[16px] font-normal text-muted">{item.subtitle}</p>
      </header>

      <div className="grid grid-cols-[150px_1fr] gap-x-12">
        <div className="text-[13px] font-mono text-very-muted">
          <p>{formattedDate}</p>
          <p className="mt-1">{item.readMinutes} min read</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="space-y-6 text-[16px] leading-[1.8] text-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
            <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>

          <nav className="mt-16 flex items-center justify-between border-t border-border pt-8">
            {previousItem && (
              <Link
                href={`/writing/${previousItem.slug}`}
                className="flex flex-col text-[14px] font-mono text-muted hover:text-text transition-colors"
              >
                ← Previous
                <span className="text-[13px]">{previousItem.title}</span>
              </Link>
            )}
            
            <div className="flex-1" />
            
            {nextItem && (
              <Link
                href={`/writing/${nextItem.slug}`}
                className="flex flex-col items-end text-[14px] font-mono text-muted hover:text-text transition-colors"
              >
                <span className="text-[13px]">{nextItem.title}</span>
                Next →
              </Link>
            )}
          </nav>
        </div>
      </div>

      <footer className="mt-12 border-t border-border pt-8 text-center font-mono text-[12px] text-very-muted">
        <p>© {new Date().getFullYear()} Seth Woo</p>
      </footer>
    </article>
  );
}
