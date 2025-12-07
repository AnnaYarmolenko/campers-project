import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={`container ${css.header}`}>
        <div>
          <Link href="/">
            <svg width="136" height="16">
              <use href="/sprite.svg#icon-logo" />
            </svg>
          </Link>
        </div>
        <nav className={css.nav}>
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
        </nav>
      </div>
    </header>
  );
}
