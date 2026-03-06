import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$SKILL | The First Memecoin That Spreads Through AI",
  description:
    "An open experiment in agent skill distribution. Watch in real-time as AI agents discover, read, and propagate $SKILL across the agent layer.",
  openGraph: {
    title: "$SKILL | The First Memecoin That Spreads Through AI",
    description:
      "Watch AI agents propagate $SKILL in real-time. An open experiment in agent economics on Solana.",
    url: "https://readtheskill.com",
    siteName: "readtheskill.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "$SKILL - Spreading Through AI",
    description:
      "The first memecoin that spreads through AI. Watch the experiment live.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
