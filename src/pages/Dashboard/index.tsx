import { useEffect } from 'react';
import { useLocalStorage } from 'react-use'
import { Navigate } from "react-router-dom";

import { GameSelector } from "../../components/GameSelector";
import { Icon } from "../../components";

import logo from '../../assets/logo/logo-fundo-vermelho.svg'

export const Dashboard: React.FC = () => {
    const [auth, setAuth] = useLocalStorage('auth', {})

    return (typeof auth === "object")
        ? (
            <Navigate to='/' replace={true} />
        )
        : (
            <div >
                <header className="bg-red-500 text-white p-6 overflow-hidden">
                    <div className="max-w-2xl mx-auto px-6">
                        <nav className='flex justify-between items-center' >
                            <a href="">
                                <img src={logo} className='w-32' />
                            </a>
                            <a href={`/${JSON.parse(auth as string).user.username}`} >
                                <Icon iconName="Profile" className="h-8" />
                            </a>
                        </nav>
                    </div>
                </header>
                <main className="">
                    <section className="bg-red-500 text-white p-8">
                        <div className="max-w-2xl mx-auto space-y-4 px-6">
                            <h4>{`Olá, ${JSON.parse(auth as string).user.name}`}</h4>
                            <h2 className=" font-bold text-2xl">
                                Qual é o seu palpite?
                            </h2>
                        </div>
                    </section>
                    <section className="p-6 container max-w-2xl mx-auto space-y-6">
                        <GameSelector changeActive={true} />
                    </section>
                </main>
            </div>
        )
}