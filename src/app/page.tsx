import GetRecommendationForm from "@/components/get-recommendation-form";
import genres from "@/constants/genres";

export default async function Home() {
    return (
        <div className="flex flex-col justify-center items-center gap-16">
            <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 text-center">
                Find new songs
                <br />
                in seconds.
            </h1>
            <GetRecommendationForm genres={genres} />
        </div>
    );
}
