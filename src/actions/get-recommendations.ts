"use server";

import { getAccessToken } from "@/lib/spotify";
import axios from "axios";
import type { Song } from "@prisma/client";

interface TFormState {
    recommendedSongs: Song[]
}

export async function getRecommendations(formState: TFormState): Promise<TFormState>{
    // Step 1: Get and Control input (I'll use "Zod" most probably)

    // Step 2: Get recommendations from Spotify, use inputs above
    const { access_token } = await getAccessToken();

    // Step 2.5: No try/catch to handle errors for now
    const recommendationsFromSpotify = await axios.get("https://api.spotify.com/v1/recommendations", {
        params: {
            limit: 3,
            //? only one of them is required below
            seed_genres: "pop",
            // seed_artists: "4NHQUGzhtTLFvgF5SZesLK", 
            // seed_tracks: "4T73JmNNhtkFBzjRfCeMzN"
        },
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    const recommendedTracks = recommendationsFromSpotify.data.tracks;

    const getSongsFromSpotify = async (recommendedTracks: any) => {
        const songPromises = recommendedTracks.map((song: any) => {
            const resultData = {
                singerName: song.artists[0].name,
                singerSpotifyURL: song.artists[0].external_urls.spotify,
                songName: song.name,
                songSpotifyURL: song.external_urls.spotify,
                songSpotifyId: song.id,
                previewSpotifyURL: song.preview_url,
            };
            return resultData;
        });
    
        return Promise.all(songPromises);
    };

    const songs = await getSongsFromSpotify(recommendedTracks);

    return {
        recommendedSongs: songs
    }
    
}