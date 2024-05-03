"use server";

import type { Song } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { auth } from "@/auth";

export async function deleteSong(id: number) {
    // Step 1: Get and Control input

    // Step 2: Check auth //TODO return error with useFormState
    const session = await auth();
    if (!session?.user) return;

    const song = await db.song.findFirst({
        where: {
            id,
        },
    });

    if (session.user.id !== song?.userId) return;

    // Step 3: Delete a record
    try {
        await db.song.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log("An error happened while deleting a song object.");
    }

    // Step 4: Revalidate somewhere
    revalidatePath(`/${session.user.id}`);

    // Step 5: Redirect user to somewhere
    redirect(`/${session.user.id}`);
}
