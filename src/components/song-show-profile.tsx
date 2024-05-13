"use client";

import { deleteSong } from "@/actions";
import { Song } from "@prisma/client";
import FormButtonForUsers from "./common/form-button-for-users";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface SongShowProps {
    song: Song;
}

export default function SongShowProfile({ song }: SongShowProps) {
    const deleteSongAction = deleteSong.bind(null, song.id);
    const session = useSession();
    const isSelf = session.data?.user?.id === song.userId;

    return (
        <form
            action={deleteSongAction}
            key={song.id}
            className="flex flex-col max-w-sm align-center justify-center p-4 border shadow-md rounded"
        >
            <Link href={song.songSpotifyURL} target="_blank">
                <Image
                    src={song.imgURL}
                    alt={`${song.songName} album image`}
                    width={360}
                    height={360}
                    className="rounded"
                />
            </Link>

            <div className="pt-4 pb-4">
                <Link href={song.singerSpotifyURL} target="_blank">
                    <p className="font-bold">{song.singerName}</p>
                </Link>
                <Link href={song.songSpotifyURL} target="_blank">
                    <p className="font-normal">{song.songName}</p>
                </Link>
            </div>

            {isSelf ? (
                <FormButtonForUsers color="danger">
                    Delete from Favourites
                </FormButtonForUsers>
            ) : (
                ``
            )}
        </form>
    );
}
