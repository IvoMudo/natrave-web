import React, { ChangeEventHandler, FocusEventHandler, useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useLocalStorage } from 'react-use'
import { useParams } from 'react-router-dom'

function getImageUrl(name: string) {
    return new URL(`../../assets/bandeiras/${name}.png`, import.meta.url).href
}

type Props = {
    changeActive: boolean
    gameId: string,
    timeA: string,
    TimeB: string,
    matchTime: string
    homeTeamScore: number,
    awayTeamScore: number,
}



export const Score = ({ changeActive, gameId, timeA, TimeB, matchTime, homeTeamScore, awayTeamScore }: Props): JSX.Element => {

    const [auth, setAuth] = changeActive ? useLocalStorage('auth', {}) : ''
    const { accessToken, user } = changeActive ? JSON.parse(auth as string) : ''
    const param = changeActive ? {} : useParams()

    async function blur(e: React.FocusEvent<HTMLInputElement>) {
        formik.handleSubmit()
    }

    const formik = useFormik({
        onSubmit: async (values) => {
            const url = `${import.meta.env.VITE_API_URL}/guess`
            const options = {
                method: 'POST',
                headers: {
                    'Authorization': changeActive ? `Bearer ${accessToken}` : `Bearer ${param.username}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
            const res = await fetch(url, options)

            console.log(res)
        },
        initialValues: {
            gameId: gameId,
            homeTeamScore: homeTeamScore,
            awayTeamScore: awayTeamScore,
        }
    })

    return (
        <div className="border-gray-300 border rounded-2xl h-28 p-4 text-center">
            <h5 className="text-sm text-gray-700 font-bold">{matchTime}</h5>
            <div className="flex items-center justify-evenly">

                <span className="uppercase">{timeA}</span>
                <img src={getImageUrl(timeA)} alt="" />
                <input
                    className="text-red-700 h-[55px] w-[55px] bg-red-300/20 text-center rounded-lg"
                    disabled={!changeActive}
                    name='homeTeamScore'
                    min={0}
                    max={99}
                    type="number"
                    value={formik.values.homeTeamScore}
                    onChange={formik.handleChange}
                    onBlur={blur}
                />

                <span className="text-red-500 font-bold">X</span>

                <input
                    className="text-red-700 h-[55px] w-[55px] bg-red-300/20 text-center rounded-lg"
                    disabled={!changeActive}
                    name='awayTeamScore'
                    min={0}
                    max={99}
                    type="number"
                    value={formik.values.awayTeamScore}
                    onChange={formik.handleChange}
                    onBlur={blur}
                />
                <img src={getImageUrl(TimeB)} alt="" />
                <span className="uppercase">{TimeB}</span>

            </div>
        </div>
    )
}