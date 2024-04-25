import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import HeaderAuth from "./header-auth";
import Link from "next/link";


export default function Header() {
    return (
        <>
            <Navbar className="shadow mb-6">
                <NavbarBrand>
                    <Link href="/" className="font-bold">
                        Songs Please
                    </Link>
                </NavbarBrand>

                <NavbarContent justify="end">
                    <HeaderAuth />
                </NavbarContent>
            </Navbar>
        </>
    );
}




