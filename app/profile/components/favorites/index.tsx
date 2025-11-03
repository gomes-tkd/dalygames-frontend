"use client";
import React from "react";
import { FiEdit, FiX} from "react-icons/fi";

export default function FavoriteCard() {
    const [input, setInput] = React.useState("");
    const [showInput, setShowInput] = React.useState(false);
    const [gameName, setGameName] = React.useState("");

    function handleButton() {
        setShowInput(!showInput);

        if (input !== "") {
            setGameName(input);
        }

        setInput("")
    }

    return (
        <div
            className={"w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col"}
        >
            {showInput ? (
                <div className={"flex items-center justify-center gap-3"}>
                    <input
                        className={"bg-white w-full rounded-md h-8 text-black px-2"}
                        type={"text"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className={"cursor-pointer"} onClick={() => handleButton()}>
                        <FiX size={24} color="#fff" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => handleButton()}
                    className={"self-start hover:scale-110 duration-200 transition-all cursor-pointer"}
                >
                    <FiEdit size={24} color={"#fff"} />
                </button>
            )}
            {gameName && (
                <div>
                   <span className="text-white">Game favorito</span>
                    <p className="font-bold text-white">{gameName}</p>
                </div>
            )}
            {!gameName && (
                <p className="font-bold text-white">Adicionar jogo</p>
            )}
        </div>
    );
}
