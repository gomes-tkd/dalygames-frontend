import Container from "@/components/container";
import GameProps from "@/utils/types/game";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightSquare } from "react-icons/bs";
import Input from "@/components/input";
import GameCard from "@/components/GameCard";

async function getDalyGame() {
    try {
        const response = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game_day`, { next: { revalidate: 320 } }
        );

        return response.json();
    } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        throw new Error("Failed to fetch data. Error: " + errMessage);
    }
}

async function getGameData() {
    try {
        const response = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=games`, { next: { revalidate: 320 } }
        );

        return response.json();
    } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        throw new Error("Failed to fetch data. Error: " + errMessage);
    }
}

export default async function Home() {
    const dalyGame: GameProps = await getDalyGame();
    const gameData: GameProps[] = await getGameData();

    return (
        <main className="w-full">
            <Container>
                <h1 className={"text-center font-bold text-xl mt-8 mb-5"}>
                    Separamos um jogo exclusivo para ti.
                </h1>
                <Link href={`/game/${dalyGame.id}`}>
                    <section className={"w-full bg-black rounded-lg"}>
                        <div className={"w-full max-h-96 h-96 relative rounded-lg"}>
                            <div
                                className={
                                    "absolute z-20 bottom-0 p-3 justify-center items-center gap-2"
                                }
                            >
                                <p className={"font-bold text-xl text-white"}>{dalyGame.title}</p>
                                <BsArrowRightSquare
                                    size={24}
                                    color={"#fff"}
                                />
                            </div>
                            <Image
                                className={
                                    "max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100"
                                    + " transition-all duration-300"
                                }
                                src={dalyGame.image_url}
                                alt={dalyGame.title}
                                priority={true}
                                quality={100}
                                fill={true}
                                sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw"}
                            />
                        </div>
                    </section>
                </Link>
                <Input />
                <h2 className={"text-lg font-bold mt-8 mb-5"}>Games para conheceres.</h2>
                <section className={"grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
                    {gameData && (
                        gameData.map(game => (<GameCard key={game.id} data={game}/>))
                    )}
                </section>
            </Container>
        </main>
    );
}
