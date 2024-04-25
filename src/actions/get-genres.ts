"use server";

import { getAccessToken } from "@/lib/spotify";
import axios from "axios";

export async function getGenres(){
    const { access_token } = await getAccessToken();

    try {
        const genres = await axios.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return genres.data.genres;
    } 

    catch (error) {
        console.log(error);
        return ["There", "is", "error", "lol"];
    } 
    
    finally {
        console.log("veri çekildi");
    }
}