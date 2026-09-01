import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import ChatbotContainer from "@/components/chatbot/ChatbotContainer";

export const metadata = {
  title: "Prince Pipes & Fittings",
  description: "Engineered Flow Solutions",
  icons: {
    icon: "/logo/ppfIcon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-background text-text relative" suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 relative">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <ChatbotContainer />
      </body>
    </html>
  );
}
