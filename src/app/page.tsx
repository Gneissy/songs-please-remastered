import { deleteSong } from "@/actions";
import FormButton from "@/components/common/form-button";
import GetRecommendationForm from "@/components/get-recommendation-form";
import genres from "@/constants/genres";
import { db } from "@/db";

export default async function Home() {
    //TODO Fetch it in a dynamic route according to user's id
    const favourites = await db.song.findMany({});

    //TODO I love modular code, you know?
    const renderedFavourites = favourites.map((favourite) => {
        const deleteSongAction = deleteSong.bind(null, favourite.id);

        return (
            <form key={favourite.id} action={deleteSongAction}>
                {favourite.singerName} - {favourite.songName}
                <FormButton> Delete from Favourites </FormButton>
            </form>
        );
    });

    console.log(favourites);

    return (
        <>
            <div> Ana Sayfa </div>

            <GetRecommendationForm genres={genres} />

            <div>
                <p> Favori şarkılar:</p>
                <div>{renderedFavourites}</div>
            </div>
        </>
    );
}
