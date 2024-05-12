import { getUserFavorites } from "@/actions";
import SongShowProfile from "@/components/song-show-profile";

import { db } from "@/db";
import { notFound } from "next/navigation";

interface FavouritesPageProps {
    params: {
        id: string;
    };
}

export default async function FavouritesPage(props: FavouritesPageProps) {
    const user = await db.user.findFirst({
        where: {
            id: props.params.id,
        },
    });
    if (!user) return notFound();

    const favouriteSongs = await db.song.findMany({
        where: {
            userId: props.params.id,
        },
    });

    // const favouriteSongs = await getUserFavorites(props.params.id);

    const renderedFavouriteSongs = favouriteSongs.map((song) => (
        <SongShowProfile key={song.id} song={song} />
    ));

    return (
        <>
            <h1 className="font-bold text-3xl mb-6">
                {user.name}'s Favourites
            </h1>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {renderedFavouriteSongs}
            </div>
        </>
    );
}

export async function generateStaticParams() {
    const profiles = await db.user.findMany();

    return profiles.map((profile) => {
        return {
            id: profile.id.toString(),
        };
    });
}
