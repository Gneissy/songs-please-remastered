"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

interface FormButtonProps {
    children: React.ReactNode;
    color?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger"
        | undefined;
    isDisabled?: boolean | undefined;
    radius?: "none" | "sm" | "md" | "lg" | "full" | undefined;
}

export default function FormButtonForUsers({
    children,
    color,
    isDisabled,
    radius,
}: FormButtonProps) {
    const { pending } = useFormStatus();
    const session = useSession();

    return (
        <Button
            type="submit"
            isLoading={pending}
            isDisabled={!session.data?.user || isDisabled}
            color={color}
            radius={radius}
        >
            {session.data?.user ? children : `⚡ Sign in to ${children}`}
        </Button>
    );
}
