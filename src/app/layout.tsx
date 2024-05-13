import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Songs Please",
    description:
        "Find new songs in seconds by providing a genre, artist or track you love.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    <div className="flex flex-col w-100 items-center justify-center">
                        <div className="flex flex-col gap-4 max-w-5xl p-4 px-6">
                            {children}
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
