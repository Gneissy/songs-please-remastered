"use server";

import type { Song } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function deleteSong(id: number){
    // Step 1: Get and Control input

    // Step 2: Delete a record
    await db.song.delete({
        where: {
            id
        }
    });

    // Step 3: Revalidate somewhere
    revalidatePath("/");

    // Step 4: Redirect user to somewhere
    redirect("/");

}