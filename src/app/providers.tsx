"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
    children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <main className="dark text-foreground bg-background min-h-svh">
                    {children}
                </main>
            </NextUIProvider>
        </SessionProvider>
    );
}
