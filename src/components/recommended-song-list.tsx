import { Song } from "@prisma/client";
import SongShow from "./song-show";

interface RecommendedSongListProps {
    formState: {
        recommendedSongs: Song[]
    }
}

export default function RecommendedSongList({ formState }: RecommendedSongListProps) {
    const renderedRecommendedSongs = formState.recommendedSongs.map((song: Song) => 
        // <div key = {song.songSpotifyId}>
        //     <div> {song.singerName} - {song.songName} </div>
        // </div>
        <SongShow song = { song } />
    );

    return (
        <div className = "flex flex-col gap-4">
            { renderedRecommendedSongs }
        </div>
    );
}