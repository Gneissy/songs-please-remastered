import { getGenres } from "@/actions";
import GetRecommendationForm from "@/components/get-recommendation-form";

export default async function Home() {
    const genres: string[] = await getGenres();

    return (
        <>
            <div> Ana Sayfa </div>

            <GetRecommendationForm genres = { genres }/>
        </>
    );
}