import localFont from "next/font/local";
import Script from "next/script";
import FlickeringGrid from "@/app/components/dots";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const gameplay = localFont({
  src: "./fonts/Gameplay.ttf",
  variable: "--font-gameplay",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Department Classifier",
  description:
    "Taqneeq Department Classifier.Made with love by Aanchal Shah,Arijit Srivastava,Kartik Jain,Mysha Bhartiya,Naitik Lodha and Yash Deshpande",
  alternates: {
    canonical: "/",
  },
  creator: "Taqneeq",
  publisher: "Taqneeq",
  metadataBase: new URL("https://department-classifier.taqneeqfest.com"),
  metadata: new URL(
    "https://mpstmeacmhttps://department-classifier.taqneeqfest.com.com"
  ),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="ccbca634-4aad-40fd-ae22-6d14d993b000"
      ></Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-screen w-full overflow-x-hidden`}
      >
        <FlickeringGrid
          className="z-0 fixed inset-0 h-screen w-screen"
          squareSize={4}
          gridGap={10}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={1}
        />

        {children}
      </body>
    </html>
  );
}
