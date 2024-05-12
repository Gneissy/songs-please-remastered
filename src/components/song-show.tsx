"use client";

import { createSong } from "@/actions";
import { Song } from "@prisma/client";
import FormButtonForUsers from "./common/form-button-for-users";
import Image from "next/image";
import { useFormState } from "react-dom";
import Link from "next/link";

interface SongShowProps {
    song: Song;
}

export default function SongShow({ song }: SongShowProps) {
    const [formState, createSongAction] = useFormState(
        createSong.bind(null, { song }),
        {
            isAdded: false,
            errors: {
                _form: "",
            },
        }
    );

    return (
        <>
            <form
                action={createSongAction}
                key={song.id}
                className="flex flex-col max-w-sm align-center justify-center p-4 border shadow-md rounded gap-4"
            >
                <Link href={song.songSpotifyURL}>
                    <Image
                        src={song.imgURL}
                        alt={`${song.songName} album image`}
                        width={360}
                        height={360}
                        className="rounded"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+PifCwAE5QH8+g36rAAAAABJRU5ErkJggg=="
                    />
                </Link>

                <div>
                    <Link href={song.singerSpotifyURL}>
                        <p className="font-bold">{song.singerName}</p>
                    </Link>
                    <Link href={song.songSpotifyURL}>
                        <p className="font-normal">{song.songName}</p>
                    </Link>
                </div>

                <div className="flex flex-col gap-4 margin-block-start-auto">
                    <audio className="audio" controls>
                        <source
                            src={
                                song.previewSpotifyURL
                                    ? song.previewSpotifyURL
                                    : undefined
                            }
                            type="audio/mpeg"
                        />
                    </audio>
                    {formState?.isAdded === false ? (
                        <FormButtonForUsers color="secondary" radius="full">
                            Add Favourites
                        </FormButtonForUsers>
                    ) : (
                        <FormButtonForUsers
                            color="secondary"
                            isDisabled
                            radius="full"
                        >
                            Successfully added.
                        </FormButtonForUsers>
                    )}
                </div>

                {formState?.errors._form !== "" ? (
                    <div className="border border-red-500 p-2 mt-2 rounded text-red-400 text-center">
                        {formState?.errors._form}
                    </div>
                ) : null}
            </form>
        </>
    );
}
