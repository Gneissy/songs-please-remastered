"use server";

import type { Song } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createSong(){
    // Step 1: Get and Control input

    // Step 2: Create a new record
    await db.song.create({
        data: {
            singerName: "Skylar Grey",
            singerSpotifyURL: "Birtakım url",
            songName: "Kill for you",
            songSpotifyURL: "Başka birtakım url",
            songSpotifyId: "12ıo124kl14j1l",
            previewSpotifyURL: "Daha başka birtakım urller",
        }
    });

    // Step 3: Revalidate somewhere
    revalidatePath("/");

    // Step 4: Redirect user to somewhere
    redirect("/");

}