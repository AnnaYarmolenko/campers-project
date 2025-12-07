import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "izitoast/dist/css/iziToast.min.css";
import Header from "@/components/Header/Header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

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
      <body className={inter.className}>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
