import localFont from "next/font/local";
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
  description: "Taqneeq Department Classifier.Made with love by Aanchal Shah,Arijit Srivastava,Kartik Jain,Mysha Bhartiya,Naitik Lodha and Yash Deshpande",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
