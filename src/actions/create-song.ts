"use server";

import type { Song } from "@prisma/client";
import { db } from "@/db";
import { auth } from "@/auth";

interface CreateSongProps {
    song: Song;
}

export async function createSong({ song }: CreateSongProps) {
    // Step 1: Get and Control input
    console.log("No need to control input for creating a song.");

    // Step 2: Control if user has auth
    const session = await auth();
    if (!session?.user) return;

    // Step 3: Create a new record
    try {
        await db.song.create({
            data: {
                singerName: song.singerName,
                singerSpotifyURL: song.singerSpotifyURL,
                songName: song.songName,
                songSpotifyURL: song.songSpotifyURL,
                songSpotifyId: song.songSpotifyId,
                previewSpotifyURL: song.previewSpotifyURL,
                imgURL: song.imgURL,
                userId: session.user.id,
            },
        });
        return {
            isAdded: true,
            errors: {
                _form: "",
            },
        };
    } catch (error) {
        console.log("An error happened while creating a song object.");
        console.error(error);
        return {
            isAdded: false,
            errors: {
                _form: "Sorry, something went wrong.",
            },
        };
    }
}
