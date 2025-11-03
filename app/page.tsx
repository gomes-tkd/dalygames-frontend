import Container from "@/components/container";
import GameProps from "@/utils/types/game";
import Link from "next/link";
import Image from "next/image";

async function getDalyGame() {
    try {
        const response = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game_day`
        );

        return response.json();
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error fetching data:", err.message);
        }

        throw new Error("Failed to fetch data. Error: " + err.message);
    }
}

export default async function Home() {
    const dalyGame: GameProps = await getDalyGame();

    console.log(dalyGame);
    return (
        <main className="w-full">
            <Container>
                <h1 className={"text-center font-bold text-xl mt-8 mb-5"}>
                    Separamos um jogo exclusivo para ti.
                </h1>
                <Link href={`/game/${dalyGame.id}`}>
                    <section className="w-full bg-black rounded-lg">
                        <Image
                            src={dalyGame.image_url}
                            alt={dalyGame.title}
                            priority={true}
                            quality={100}
                            width={100}
                            height={100}
                        />
                    </section>
                </Link>
            </Container>
        </main>
    );
}
