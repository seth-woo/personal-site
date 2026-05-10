import HalftoneOrb from "@/components/HalftoneOrb";
import WorksList from "@/components/WorksList";
import WritingList from "@/components/WritingList";

export default function Home() {
  return (
    <>
      <section>
        <div className="flex items-center gap-3.5">
          <div className="h-[54px] w-[54px] shrink-0">
            <HalftoneOrb size={54} seed={0} variant="hero" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold leading-[1.15]">Seth Woo</h1>
            <p className="text-[17px] leading-[1.25] text-muted">Researcher</p>
          </div>
        </div>

        <div className="mt-7 w-full space-y-5 text-[15px] leading-[1.62] text-muted [text-align:justify] [text-justify:inter-word] hyphens-auto">
          <p>
            I study practical machine learning systems with a focus on continual adaptation, model reliability, and
            evaluation under distribution shift. Most of my work sits at the intersection of research and engineering,
            where ideas need to survive real constraints.
          </p>
          <p>
            Recently I have been exploring memory-aware training pipelines and representation diagnostics for long-lived
            models. I care about methods that are not only state of the art in papers, but also understandable and
            dependable in production environments.
          </p>
        </div>
      </section>

      <WritingList limit={5} showViewAll />
      <WorksList limit={5} showViewAll />

      <footer className="mt-14 border-t border-border py-8 text-center font-mono text-[12px] text-very-muted">
        <p>© {new Date().getFullYear()} Seth W.H. Woo</p>
      </footer>
    </>
  );
}
