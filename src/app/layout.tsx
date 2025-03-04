import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderSignin from "../components/HeaderSignin";
import { Toaster } from "react-hot-toast"
import DynamicHeader from "@/components/DynamicHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StoryLine.",
  description: "StoryLine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       <DynamicHeader/>
        <Toaster position="top-right" toastOptions={{className:'',style: {padding: '30px',fontSize: '1rem',width: '400px'}}} />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
