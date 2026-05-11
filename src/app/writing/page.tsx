import WritingList from "@/components/WritingList";

export default function WritingIndexPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <WritingList topClassName="mt-4" />
      </div>
      <footer className="mt-14 border-t border-border py-8 text-center font-mono text-[12px] text-very-muted">
        <p>© {new Date().getFullYear()} Seth W.H. Woo</p>
      </footer>
    </div>
  );
}
