"use server";
import React from 'react';
import GameProps from "@/utils/types/game";
import Container from "@/components/container";
import Input from "@/components/input";
import GameCard from "@/components/GameCard";

async function getData(title: string) {
    try {
        const decodeTitle = decodeURIComponent(title);

        const data = await fetch(
            `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`
        );

        return data.json();
    } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        throw new Error("Failed to fetch data. Error: " + errMessage);
    }
}

export default async function Search({
    params
}: {
    params: Promise<{ title: string }>;
}) {
    const { title } = await params;
    const data: GameProps[] = await getData(title);

    return (
        <main className={"w-full text-black"}>
            <Container>
                <Input  />
                <h2 className={"font-bold text-xl mt-8 mb-5"}>
                    Vejas o que encontramos na nossa base:
                </h2>
                {(!data || data.length === 0) && (
                    <p className={"text-center px-6"}>Nenhum jogo encontrado.</p>
                )}
                <section className={"grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
                    {data && data.map(item => <GameCard key={item.id} data={item} />)}
                </section>
            </Container>
        </main>
    );
}
