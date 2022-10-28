import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import photo from '../../assets/imagem/img.png'
import logo from '../../assets/logo/logo-fundo-vinho.svg'

export function Home() {

  return (
    <div className='h-screen bg-red-700 text-white p-6'>

      <header className='flex justify-center items-start pb-8' >
        <img src={logo} className='w-32'/>
      </header>
      
      <div className='flex flex-col items-center md:flex-row space-y-6 md:space-x-6 md:space-y-0 md:h-5/6'>

        <div className='md:flex-1 flex justify-center'>
          <img src={photo} className='w-full max-w-[16rem] md:max-w-md' />
        </div>

        <div className='md:flex-1 flex flex-col space-y-6 p-8'>

          <h1 className='text-3xl text-center font-bold '>Dê o seu palpite na Copa do Mundo do Catar 2022! </h1>

          <a href='/signup' className=' text-center text-red-700 bg-white text-xl py-4 rounded-3xl'>
            Criar minha conta
          </a>

          <a href='/login' className='text-center text-white border border-white text-xl px-8 py-4 rounded-3xl'>
            Fazer Login
          </a>

        </div>

      </div>
    </div>
  )
}
