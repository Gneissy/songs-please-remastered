"use server";

import type { Song } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { auth } from "@/auth";

interface CreateSongProps {
    song: Song;
}

export async function createSong({ song }: CreateSongProps) {
    // Step 1: Get and Control input
    console.log("No need to control input for creating a song.");

    // Step 2: Control if user has auth //TODO Create a form error handling state (useFormState)
    const session = await auth();
    if (!session?.user) return;

    // Step 3: Create a new record //TODO handle error with a useFormState
    try {
        await db.song.create({
            data: {
                singerName: song.singerName,
                singerSpotifyURL: song.singerSpotifyURL,
                songName: song.songName,
                songSpotifyURL: song.songSpotifyURL,
                songSpotifyId: song.songSpotifyId,
                previewSpotifyURL: song.previewSpotifyURL,
                userId: session.user.id,
            },
        });
    } catch (error) {
        console.log("An error happened while creating a song object.");
    }

    // Step 4: Revalidate somewhere
    revalidatePath("/");

    // Step 5: Redirect user to somewhere
    redirect("/");
}
