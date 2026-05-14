"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type RichBodyProps = {
  body: string;
  enableImageLightbox?: boolean;
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

export default function RichBody({ body, enableImageLightbox = false }: RichBodyProps) {
  const blocks = parseBody(body);
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string; aspectRatio: number } | null>(null);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const closeLightbox = () => {
    setIsLightboxVisible(false);
    window.setTimeout(() => setActiveImage(null), 220);
  };

  useEffect(() => {
    if (!activeImage) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeImage]);

  useEffect(() => {
    if (!activeImage) return;
    const frameId = window.requestAnimationFrame(() => setIsLightboxVisible(true));
    return () => window.cancelAnimationFrame(frameId);
  }, [activeImage]);

  return (
    <>
      <div className="space-y-6 text-[15px] leading-[1.8] text-text text-justify flex-1">
        {blocks.map((block, index) => {
          if (block.type === "image") {
            return (
              <figure
                key={`${block.src}-${index}`}
                className={`relative h-64 w-full overflow-hidden rounded-[12px] border border-border md:h-80 ${
                  enableImageLightbox ? "cursor-zoom-in" : ""
                }`}
                onClick={(event) => {
                  if (enableImageLightbox) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const aspectRatio = rect.width / rect.height;
                    setActiveImage({ src: block.src, alt: block.alt, aspectRatio });
                  }
                }}
              >
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

      {enableImageLightbox && activeImage && (
        <div className="fixed inset-0 z-50" onClick={closeLightbox}>
          <div className="relative mx-auto h-full w-full max-w-[738px] px-6">
            <div
              className={`absolute inset-0 bg-bg/80 backdrop-blur-sm transition-opacity duration-200 ${
                isLightboxVisible ? "opacity-100" : "opacity-0"
              }`}
            />
            <span
              className="relative z-10 flex h-full w-full items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <span
                className={`relative w-full max-w-[calc(100%-24px)] overflow-hidden rounded-[12px] border border-border shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-220 ease-out md:max-w-[calc(100%-32px)] ${
                  isLightboxVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                style={{
                  aspectRatio: activeImage.aspectRatio,
                  maxHeight: "82vh"
                }}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 738px"
                  priority
                />
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
