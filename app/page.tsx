import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section>
        <div>
          <h1>Campers of your dreams</h1>
          <p>You can find everything you want in our catalog</p>
          <Link href="/catalog">View Now</Link>
        </div>

        <div>
          <div />
        </div>
      </section>
    </main>
  );
}
