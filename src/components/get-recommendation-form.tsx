"use client";

import { getRecommendations } from "@/actions";
import { useFormState } from "react-dom";
import RecommendedSongList from "./recommended-song-list";
import {
    Autocomplete,
    AutocompleteItem
} from "@nextui-org/react";
import FormButton from "./common/form-button";

interface GetRecommendationForm {
    genres: string[]
}

export default function GetRecommendationForm({ genres }: GetRecommendationForm) {
    const [formState, action] = useFormState(getRecommendations, {recommendedSongs: []});

    return (
        <>
            <form action = { action }>
                <Autocomplete 
                    label="Select a genre" 
                    className="max-w-xs" 
                    name = "genre"
                >
                    {genres.map((genre, index) => (
                        <AutocompleteItem key={index} value={genre}>
                            {genre}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>

                <FormButton>
                    Get Recommendations
                </FormButton>
            </form>

            <RecommendedSongList formState = {formState} />
        </>
    );
}
