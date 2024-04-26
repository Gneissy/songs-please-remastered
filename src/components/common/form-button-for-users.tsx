"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

interface FormButtonProps {
    children: React.ReactNode;
}

export default function FormButtonForUsers({ children }: FormButtonProps) {
    const { pending } = useFormStatus();
    const session = useSession();

    return (
        <Button
            type="submit"
            isLoading={pending}
            isDisabled={!session.data?.user}
        >
            {session.data?.user ? children : `⚡ Sign in to ${children}`}
        </Button>
    );
}
