import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwitchLab | The Ultimate Mechanical Keyboard Guide",
  description: "Explore the anatomy, history, and parts of mechanical keyboards with SwitchLab's interactive 3D guide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
