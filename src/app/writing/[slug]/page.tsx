import Link from "next/link";
import { notFound } from "next/navigation";
import { writingItems } from "@/data/content";

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

  const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return (
    <article>
      <Link href="/writing" className="text-[13px] text-muted hover:underline">
        ← writing
      </Link>
      <h1 className="mt-6 text-[1.5rem] font-medium">{item.title}</h1>
      <p className="mt-2 text-[14px] text-muted">{item.subtitle}</p>
      <p className="mt-2 text-[12px] text-very-muted">
        {formattedDate} · {item.readMinutes} min read
      </p>
      <div className="mt-6 border-b border-border" />
      <div className="mt-6 space-y-5 text-[14px] leading-[1.9] text-text">
        {item.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
