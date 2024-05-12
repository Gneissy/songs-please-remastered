"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Song, User } from "@prisma/client";
import { redirect } from "next/navigation";

//? Note that i will not use this action because i just want it that way lol
//? This action works fine.

export async function getUserFavorites(id: string) {
    // Step 1: Control if user has auth
    const session = await auth();
    if (!session?.user) redirect("/user-yok");

    // Step 2: Control if user is self
    const isSelf = session?.user.id === id;

    // Step 3: Control whether user's account is "private" or "public"
    let user: User | null;
    let userIsPrivate: Boolean | null | undefined;

    try {
        user = await db.user.findFirst({
            where: {
                id: id,
            },
        });
        userIsPrivate = user?.isPrivate;
    } catch (error) {
        console.error(error);
        user = null;
        userIsPrivate = true;
    }
    if (!isSelf && userIsPrivate) redirect("/private");

    // Step 4: Get and deliver songs
    let favouriteSongs: Song[];
    try {
        favouriteSongs = await db.song.findMany({
            where: {
                userId: id,
            },
        });
        return favouriteSongs;
    } catch (error) {
        console.error(error);
        return [];
    }
}
