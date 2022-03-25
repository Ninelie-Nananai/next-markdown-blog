import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <Link href="/" passHref>
          <h2 style={{ cursor: "pointer" }}>Next.js Markdown Blog</h2>
        </Link>
      </div>
    </header>
  );
};
