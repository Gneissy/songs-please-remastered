"use server";

import { getAccessToken } from "@/lib/spotify";
import axios from "axios";
import type { Song } from "@prisma/client";
import formatTextAsDashed from "@/utils/formatTextAsDashed";

interface TFormState {
    recommendedSongs: Song[];
    shouldRedirect: Boolean;
    errors: {
        _form: String;
    };
}

export async function getRecommendations(
    formState: TFormState,
    formData: FormData
): Promise<TFormState> {
    // Step 1: Get and Control input (I'll use "Zod" most probably)
    let genre = formData.get("genre") as string;
    let artist = formData.get("artist") as string;
    let track = formData.get("track") as string;

    if (!genre && !artist && !track) genre = "pop";

    try {
        // Step 2: Get recommendations from Spotify, use inputs above
        const { access_token } = await getAccessToken();

        if (artist) {
            const artists = await axios.get(
                "https://api.spotify.com/v1/search",
                {
                    params: {
                        q: artist,
                        type: "artist",
                        limit: 5,
                    },
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );

            const formattedArtistInput = formatTextAsDashed(artist);
            const foundArtists = artists.data.artists.items.sort(
                (a: any, b: any) => b.popularity - a.popularity
            );
            const foundArtistObjects = foundArtists.map((artist: any) => ({
                name: formatTextAsDashed(artist.name),
                popularity: artist.popularity,
                id: artist.id,
            }));

            let foundExactMatch = false;

            for (var i = 0; i < foundArtistObjects.length; i++) {
                if (!foundExactMatch) {
                    if (foundArtistObjects[i].name === formattedArtistInput) {
                        artist = foundArtistObjects[i].id;
                        foundExactMatch = true;
                    }
                }
            }

            if (!foundExactMatch) artist = foundArtistObjects[0].id;
        }

        if (track) {
            const tracks = await axios.get(
                "https://api.spotify.com/v1/search",
                {
                    params: {
                        q: track,
                        type: "track",
                        limit: 5,
                    },
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );

            const formattedTrackInput = formatTextAsDashed(track);
            const foundTracks = tracks.data.tracks.items.sort(
                (a: any, b: any) => b.popularity - a.popularity
            );
            const foundTrackObjects = foundTracks.map((track: any) => ({
                name: formatTextAsDashed(track.name),
                popularity: track.popularity,
                id: track.id,
            }));

            let foundExactMatch = false;

            for (var i = 0; i < foundTrackObjects.length; i++) {
                if (!foundExactMatch) {
                    if (foundTrackObjects[i].name === formattedTrackInput) {
                        track = foundTrackObjects[i].id;
                        foundExactMatch = true;
                    }
                }
            }

            if (!foundExactMatch) track = foundTrackObjects[0].id;
        }

        // Step 2.5: No try/catch to handle errors for now
        const recommendationsFromSpotify = await axios.get(
            "https://api.spotify.com/v1/recommendations",
            {
                params: {
                    limit: 9,
                    //? only one of them is required below
                    seed_genres: genre,
                    seed_artists: artist,
                    seed_tracks: track,
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

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
                    imgURL: song.album.images[0].url,
                };
                return resultData;
            });

            return Promise.all(songPromises);
        };

        const songs = await getSongsFromSpotify(recommendedTracks);

        console.log("Songs are fetched successfully.");

        return {
            recommendedSongs: songs,
            shouldRedirect: true,
            errors: {
                _form: "",
            },
        };
    } catch (error) {
        console.log(error);
        return {
            recommendedSongs: [],
            shouldRedirect: false,
            errors: {
                _form: "Something is wrong while fetching songs.",
            },
        };
    }
}
