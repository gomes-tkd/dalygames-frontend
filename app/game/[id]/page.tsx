"use server";
import React from "react";
import Image from "next/image";
import GameProps from "@/utils/types/game";
import RedirectTimer from "@/components/redirect-timer";
import Container from "@/components/container";
import Label from "@/app/game/[id]/components/label";
import GameCard from "@/components/GameCard";
import { Metadata } from "next";

interface ParamProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ParamProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const response: GameProps = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { next: { revalidate: 60 } }
        ).then((res) => res.json()).catch(() => {
            return {
                title: "Jogo não encontrado",
                description: "O jogo que você está procurando não foi encontrado."
            }
        });

        return {
            title: response?.title,
            description: `${response?.description.slice(0, 100)}`,
            openGraph: {
                title: response?.title,
                images: [response?.image_url]
            }
        }
    } catch (err: unknown) {
        return {
            title: "Jogo não encontrado",
            description: "O jogo que você está procurando não foi encontrado."
        }
    }
}

async function getGameData(id: string) {
    try {
        const gameData = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { next: { revalidate: 60 } }
        );

        return gameData.json();
    } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        throw new Error("Failed to fetch data. Error: " + errMessage);
    }
}

async function getGameSorted() {
    try {
        const gameDay = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game_day`, { cache: "no-store"}
        );
        return gameDay.json();
    } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        throw new Error("Failed to fetch data. Error: " + errMessage);
    }
}

export default async function GameDetail({ params }: ParamProps) {
    const { id } = await params;
    const gameData: GameProps | null = await getGameData(id);
    const sortedGame:GameProps= await getGameSorted();

    if (!gameData) {
        return (
            <main className={"w-full text-black"}>
                <div className={"flex flex-col items-center justify-center h-screen"}>
                    <p className={"text-center font-bold px-6"}>
                        Jogo não encontrado. Redirecionando para a página inicial...
                    </p>
                    <RedirectTimer />
                </div>
            </main>
        )
    }

    return (
        <main className={"w-full text-black"}>
            <div className={"bg-black h80 sm:h-96 w-full relative"}>
                <Image
                    className={"object-cover w-full h-80 sm:h-96 opacity-75"}
                    src={gameData.image_url}
                    alt={gameData.title}
                    priority={true}
                    fill={true}
                    sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 44vw"}
                />
            </div>
            <Container>
                <h1 className={"font-bold text-xl my-4"}>{gameData.title}</h1>
                <p>{gameData.description}</p>
                <h2 className={"font-bold text-lg mt-7 mb-2"}>Plataformas</h2>
                <div className={"flex flex-wrap gap-2"}>
                    {gameData.platforms.map((platform) => (<Label name={platform} key={platform} />))}
                </div>
                <h2 className={"font-bold text-lg mt-7 mb-2"}>Categorias</h2>
                <div className={"flex flex-wrap gap-2"}>
                    {gameData.categories.map((category) => (<Label name={category} key={category} />))}
                </div>
                <p className="mt-7 mb-2">
                    <strong>{gameData.release}</strong>
                </p>
                <h2 className={"font-bold text-lg mt-7 mb-2"}>Jogo Recomendado:</h2>
                <div className={"flex"}>
                    <div className={"flex-grow"}>
                        <GameCard data={sortedGame} />
                    </div>
                </div>
            </Container>
        </main>
    );
}
