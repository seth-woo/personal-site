import Image from "next/image";

type RichBodyProps = {
  body: string;
};

type BodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; alt: string; src: string };

const imageRefPattern = /^!\[(.*?)\]\((\/assets\/[^)\s]+)\)$/;

function parseBody(body: string): BodyBlock[] {
  return body
    .split("\n\n")
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const imageMatch = chunk.match(imageRefPattern);
      if (imageMatch) {
        return {
          type: "image" as const,
          alt: imageMatch[1] || "Content image",
          src: imageMatch[2]
        };
      }

      return {
        type: "paragraph" as const,
        text: chunk
      };
    });
}

export default function RichBody({ body }: RichBodyProps) {
  const blocks = parseBody(body);

  return (
    <div className="space-y-6 text-[15px] leading-[1.8] text-text text-justify flex-1">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <figure key={`${block.src}-${index}`} className="relative h-64 w-full overflow-hidden rounded-[12px] border border-border md:h-80">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 738px"
              />
            </figure>
          );
        }

        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
