import React from "react";

import logo from '../../assets/logo/logo-fundo-vermelho.svg'
import { Icon } from "../../components";
import { GameSelector } from "../../components/GameSelector";

export const Profile: React.FC = () => {
    return (
        <div>
            <header className="bg-red-500 text-white">
                <div className="max-w-2xl mx-auto p-6 pb-0">
                    <nav className='flex justify-between items-center' >
                        <a href="">
                            <img src={logo} className='w-32' />
                        </a>
                        <a href="/profile">
                            <Icon iconName="Profile" className="h-8" />
                        </a>
                    </nav>
                    <div className="py-10 space-y-10">
                        <a href="/dashboard">
                            <Icon iconName="Back" className="h-6 " />
                        </a>
                        <h2 className=" font-bold text-2xl">
                            Ivo Augusto
                        </h2>
                    </div>
                </div>
            </header>
            <main className="p-6 max-w-2xl mx-auto space-y-6">
                <h2 className="text-red-500 font-bold text-2xl">
                    Seus palpites
                </h2>
                <GameSelector changeActive={false} />
            </main>
        </div>
    )
}