import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "@/styles/index.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "ETE Training",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ETE Training",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  title: "ETE Training",
  description: "Training application for Entre-Temps Escalade",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: { name: "Theo Posty" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#111827",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
