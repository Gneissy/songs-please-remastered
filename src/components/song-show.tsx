import { Song } from "@prisma/client";

interface SongShowProps {
    song: Song
}

export default function SongShow({song} : SongShowProps) {
    return (
        <div key = {song.id}>
            <p>
                {song.singerName} - {song.songName} - {song.singerSpotifyURL} - {song.songSpotifyURL} - {song.songSpotifyId} - {song.previewSpotifyURL}
            </p>
        </div>
    );
}