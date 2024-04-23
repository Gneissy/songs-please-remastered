"use client";

import { getRecommendations } from "@/actions";
import { useFormState } from "react-dom";
import RecommendedSongList from "./recommended-song-list";
import { Button } from "@nextui-org/react";


export default function GetRecommendationForm() {
    const [formState, action] = useFormState(getRecommendations, {recommendedSongs: []});

    return (
        <>
            <form action = { action }>
                <Button type="submit">
                    Get Recommendations
                </Button>
            </form>

            <RecommendedSongList formState = {formState} />
        </>
    );
}
