"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Input() {
    const [input, setInput] = React.useState("");
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (input.trim() === "") {
            return;
        }

        router.push(`/game/search/${input}`);
    }

    return (
        <form
            className={
                "flex items-center justify-between gap-2 w-full bg-slate-200 my-5 rounded-lg p-2"
            }
            onSubmit={handleSubmit}
        >
            <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder={"Procurando algum jogo?"}
                className={"bg-slate-200 outline-none w-11/12"}
            />
            <button type={"submit"}>
                <FiSearch size={24} color={"#ea580C"} />
            </button>
        </form>
    )
}
