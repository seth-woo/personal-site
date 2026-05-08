import Link from "next/link";
import { notFound } from "next/navigation";
import { workItems } from "@/data/content";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = workItems.find((entry) => entry.slug === slug);

  if (!item) notFound();

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
      })
    : "";

  return (
    <article>
      <Link href="/works" className="text-[13px] text-muted hover:underline">
        ← works
      </Link>
      <div
        className="mt-6 h-[180px] w-full rounded-lg"
        style={{ backgroundColor: item.thumbnailColor }}
        aria-hidden="true"
      />
      <h1 className="mt-6 text-[1.5rem] font-medium">{item.title}</h1>
      <p className="mt-2 text-[14px] text-muted">{item.subtitle}</p>
      <p className="mt-2 text-[12px] text-very-muted">
        {item.status === "In Progress" ? "In Progress" : formattedDate}
      </p>
      <p className="mt-6 text-[14px] leading-[1.9] text-muted">{item.description}</p>
      <div className="mt-6 border-b border-border" />
      <div className="mt-6 space-y-5 text-[14px] leading-[1.9] text-text">
        {item.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
