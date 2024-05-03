"use client";

import { createSong } from "@/actions";
import { Song } from "@prisma/client";
import FormButtonForUsers from "./common/form-button-for-users";
import Image from "next/image";
import { useFormState } from "react-dom";

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
                <Image
                    src={song.imgURL}
                    alt={`${song.songName} album image`}
                    width={360}
                    height={360}
                    className="rounded"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+PifCwAE5QH8+g36rAAAAABJRU5ErkJggg=="
                />

                <div>
                    <p className="font-bold">{song.singerName}</p>
                    <p className="font-normal">{song.songName}</p>
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                className="icon"
                            >
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
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
