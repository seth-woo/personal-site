import WorksList from "@/components/WorksList";

export default function WorksIndexPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <WorksList topClassName="mt-4" />
      </div>
      <footer className="mt-14 border-t border-border py-8 text-center font-mono text-[12px] text-very-muted">
        <p>© {new Date().getFullYear()} Seth W.H. Woo</p>
      </footer>
    </div>
  );
}
