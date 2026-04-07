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
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
