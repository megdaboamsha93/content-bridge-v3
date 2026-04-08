import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: "Publisher Portal - Traffic Monitor",
  description: "Monitor and manage bot traffic, analyze patterns, and protect your site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className="antialiased"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
