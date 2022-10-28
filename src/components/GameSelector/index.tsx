import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAsync, useLocalStorage } from "react-use";
import { format, add, sub, formatISO } from "date-fns";
import { ptBR } from "date-fns/locale"

import { Icon } from "../../components";
import { Score } from "../Score";

const gameListURL = async (dateIso: string) => {
    const BASE_URL = `${import.meta.env.VITE_API_URL}/matches?gameTime=${dateIso}`
    const data = await fetch(BASE_URL);
    const json = await data.json();
    return json
}

interface match {
    id: string,
    gameTime: string,
    homeTeam: string,
    awayTeam: string,
}
interface Props {
    changeActive: boolean
}

// const gameList = await gameListURL('2022-11-20T10:00:00.000Z')

export const GameSelector = ({ changeActive }: Props) => {

    const [auth] = changeActive ? useLocalStorage('auth', {}) : ''
    const param = changeActive ? {} : useParams()

    const [currentDate, setCurrentDate] = useState(new Date(2022, 10, 20))

    // const [matches, setMatches] = useState(gameList)
    const matches = useAsync(async () => {
        const json = await gameListURL(formatISO(currentDate))

        return json
    }, [currentDate])

    const score = useAsync(async () => {
        const BASE_URL = changeActive
            ? `${import.meta.env.VITE_API_URL}/${JSON.parse(auth as string).user.username}`
            : `${import.meta.env.VITE_API_URL}/${param.username}`

        const data = await fetch(BASE_URL);
        const json = await data.json();

        const guesses = json.guesses.reduce((acc: any, guess: any) => {
            acc[guess.gameId] = guess
            return acc
        }, {})
        return { ...json, guesses }
    }, [currentDate])

    return (
        <>
            <nav className="flex max-w-xs justify-evenly mx-auto">
                <button className="text-red-500" onClick={() => setCurrentDate(sub(currentDate, { days: 1 }))}>
                    <Icon iconName="ArrowLeft" className="" />
                </button>
                <h3 className="font-bold text-base">{format(currentDate, "d 'de' MMMM", { locale: ptBR })}</h3>
                <button className="text-red-500 " onClick={() => setCurrentDate(add(currentDate, { days: 1 }))}>
                    <Icon iconName="ArrowRight" className="" />
                </button>
            </nav>
            {
                score.loading
                    ?
                    <div>Carregando</div>
                    : score.error
                        ? <div>{score.error.message}</div>
                        :
                        matches.value.map((e: match) => {
                            return (
                                <Score
                                    changeActive={changeActive}
                                    key={e.id}
                                    gameId={e.id}
                                    timeA={e.homeTeam}
                                    TimeB={e.awayTeam}
                                    matchTime={format(new Date(e.gameTime), "HH:mm")}
                                    homeTeamScore={(!score.value.guesses[e.id]) ? 0 : score.value.guesses[e.id].homeTeamScore}
                                    awayTeamScore={(!score.value.guesses[e.id]) ? 0 : score.value.guesses[e.id].awayTeamScore}
                                />
                            )
                        })
            }
        </>
    )
}