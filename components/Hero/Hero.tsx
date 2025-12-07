import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero}>
      <div>
        <h1 className={css.heroTitle}>Campers of your dreams</h1>
        <p className={css.heroText}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.heroButton}>
          View Now
        </Link>
      </div>

      <div>
        <div />
      </div>
    </section>
  );
}
