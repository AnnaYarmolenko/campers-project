import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Campers rent catalog and booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div>
            <div>
              <Link href="/">TravelTrucks</Link>
            </div>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/catalog">Catalog</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
