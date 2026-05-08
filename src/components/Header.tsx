"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "https://seth-woo.github.io/", label: "academic-site" },
  { href: "https://github.com/seth-woo", label: "github" },
  { href: "https://www.linkedin.com/in/sethwoo/", label: "linkedin" }
];

export default function Header() {
  const linkClass = "font-mono text-[13px] font-normal lowercase tracking-normal text-very-muted transition-colors hover:text-text";

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto w-full max-w-[820px] bg-bg/80 px-6 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 border-b border-border py-2.5">
          <Link href="/" className={linkClass}>
            seth-woo.xyz
          </Link>
          <nav className="flex items-center gap-5">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
