"use client";

import { signIn, signOut } from "@/actions";
import {
    Avatar,
    Button,
    NavbarItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HeaderAuth() {
    const session = useSession();

    //! Next Auth is not reloading the page after signing out for some reason
    const logoutAndReload = function () {
        signOut();
        location.reload();
    };

    let authContent: React.ReactNode;

    if (session.status === "loading") {
        authContent = null;
    } else if (session.data?.user) {
        authContent = (
            <Popover placement="left">
                <PopoverTrigger>
                    <Avatar
                        src={session.data.user.image || ""}
                        className="cursor-pointer"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <div className="p-4 flex flex-col-reverse gap-4">
                        {/* //! Next Auth is not reloading the page after signing out for some reason */}
                        {/* <form action={signOut}>
                        <Button type="submit">
                            Sign Out
                        </Button>
                    </form> */}
                        <Button
                            type="submit"
                            color="danger"
                            onClick={logoutAndReload}
                        >
                            Sign Out
                        </Button>
                        <Link href={`/${session.data.user.id}`}>
                            <Button type="button" color="secondary">
                                My Favourites
                            </Button>
                        </Link>
                    </div>
                </PopoverContent>
            </Popover>
        );
    } else {
        authContent = (
            <>
                <NavbarItem>
                    <form action={signIn}>
                        <Button
                            type="submit"
                            color="secondary"
                            variant="bordered"
                        >
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>

                <NavbarItem>
                    <form action={signIn}>
                        <Button type="submit" color="primary" variant="flat">
                            Sign Up
                        </Button>
                    </form>
                </NavbarItem>
            </>
        );
    }

    return authContent;
}
