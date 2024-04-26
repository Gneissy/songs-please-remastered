import { createSong } from "@/actions";
import { Song } from "@prisma/client";
import FormButtonForUsers from "./common/form-button-for-users";

interface SongShowProps {
    song: Song;
}

export default function SongShow({ song }: SongShowProps) {
    const createSongAction = createSong.bind(null, { song });

    return (
        <form action={createSongAction} key={song.id}>
            <p>
                {song.singerName} - {song.songName}
            </p>

            <FormButtonForUsers> Add Favourites </FormButtonForUsers>
        </form>
    );
}
