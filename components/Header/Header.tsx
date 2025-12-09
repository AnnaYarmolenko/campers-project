"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCatalog = pathname.startsWith("/catalog");

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <div>
          <Link href="/">
            <svg width="136" height="16">
              <use href="/sprite.svg#icon-logo" />
            </svg>
          </Link>
        </div>

        <nav className={css.nav}>
          <Link href="/" className={isHome ? css.linkActive : css.link}>
            Home
          </Link>

          <Link
            href="/catalog"
            className={isCatalog ? css.linkActive : css.link}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
