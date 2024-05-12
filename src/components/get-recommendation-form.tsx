"use client";

import { getRecommendations } from "@/actions";
import { useFormState } from "react-dom";
import RecommendedSongList from "./recommended-song-list";
import {
    Autocomplete,
    AutocompleteItem,
    Input,
    Tab,
    Tabs,
} from "@nextui-org/react";
import FormButton from "./common/form-button";

interface GetRecommendationForm {
    genres: string[];
}

export default function GetRecommendationForm({
    genres,
}: GetRecommendationForm) {
    const [formState, action] = useFormState(getRecommendations, {
        recommendedSongs: [],
        shouldRedirect: false,
        errors: {
            _form: "",
        },
    });

    return (
        <div className="flex flex-col gap-8 py-8">
            <form
                id="recommendations-form"
                action={action}
                className="flex flex-col gap-8 items-center justify-center"
            >
                <Tabs aria-label="Options">
                    <Tab key="genre" title="Genre">
                        <Autocomplete
                            label="Select a genre"
                            className="w-72"
                            name="genre"
                            variant="bordered"
                            size="lg"
                            placeholder="pop"
                        >
                            {genres.map((genre, index) => (
                                <AutocompleteItem key={index} value={genre}>
                                    {genre}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </Tab>
                    <Tab key="artist" title="Artist">
                        <Input
                            label="Enter an artist"
                            className="w-72"
                            name="artist"
                            variant="bordered"
                            size="lg"
                            placeholder="Michael Jackson"
                            autoComplete="off"
                        />
                    </Tab>
                    <Tab key="track" title="Track">
                        <Input
                            label="Enter a track"
                            className="w-72"
                            name="track"
                            variant="bordered"
                            size="lg"
                            placeholder="Billie Jean"
                            autoComplete="off"
                        />
                    </Tab>
                </Tabs>

                <FormButton color="secondary">Get Recommendations</FormButton>
            </form>

            <RecommendedSongList formState={formState} />

            {formState.errors._form !== "" ? (
                <div className="bg-red-500 text-white font-bold p-4 rounded">
                    {formState.errors._form}
                </div>
            ) : null}
        </div>
    );
}
