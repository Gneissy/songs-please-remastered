"use client";

import { getRecommendations } from "@/actions";
import { useFormState } from "react-dom";
import RecommendedSongList from "./recommended-song-list";


export default function GetRecommendationForm() {
    const [formState, action] = useFormState(getRecommendations, {recommendedSongs: []});

    return (
        <>
            <form action = { action }>
                <button type="submit">
                    Get Recommendations
                </button>
            </form>

            <RecommendedSongList formState = {formState} />
        </>
    );
}
