import { Song } from "@prisma/client";
import SongShow from "./song-show";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RecommendedSongListProps {
    formState: {
        recommendedSongs: Song[];
        shouldRedirect: Boolean;
    };
}

export default function RecommendedSongList({
    formState,
}: RecommendedSongListProps) {
    const renderedRecommendedSongs = formState.recommendedSongs.map(
        (song: Song) => <SongShow key={song.id} song={song} />
    );

    const router = useRouter();

    useEffect(() => {
        if (formState.shouldRedirect) router.replace("/#recommended-songs");
    }, [formState]);

    return (
        <div id="recommended-songs">
            <div className="grid py-20 gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg: grid-cols-4 text-center">
                {renderedRecommendedSongs}
            </div>
        </div>
    );
}
