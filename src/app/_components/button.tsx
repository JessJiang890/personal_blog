// CustomLink.js 或 CustomLink.tsx
import React from 'react';
import Link from 'next/link'; // 假设你使用的是Next.js

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}
const Button = ({ href, className, children }: Props) => {
  return (
    <Link
      href={href}
      className={`rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20 ${className ?? ''}`}
    >
      {children}
    </Link>
  );
};

export default Button;
