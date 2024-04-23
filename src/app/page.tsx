import { signIn, signOut } from "@/actions";
import { auth } from "@/auth";
import GetRecommendationForm from "@/components/get-recommendation-form";
import { Button } from "@nextui-org/react";

export default async function Home() {
    const session = await auth();

    const temp:string = session?.user ? `Hoş geldin ${session.user.name}` : `Kullanıcı yok`;

    return (
        <>
            <div> Ana Sayfa </div>

            <form action = {signIn}>
                <Button type = "submit"> Sign Up </Button>
            </form>
            <form action = {signOut}>
                <Button type = "submit"> Sign Out </Button>
            </form>

            <div>
                Auth durumu: { temp }
            </div>

            <GetRecommendationForm />
        </>
    );
}