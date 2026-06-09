import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adversarial ML Dashboard",
  description: "End-to-end adversarial robustness evaluation and monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="max-w-[1100px] mx-auto py-10 px-5">
          {children}
        </main>
      </body>
    </html>
  );
}
