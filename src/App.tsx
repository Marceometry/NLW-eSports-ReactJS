import { useEffect, useState } from 'react'
import { CreateAdBanner, GameBanner } from './components'
import logoImg from './assets/logo.svg'

type Game = {
  id: string
  title: string
  bannerUrl: string
  _count: { ads: number }
}

export function App() {
  const [gameList, setGameList] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then((res) => res.json())
      .then(setGameList)
  }, [])

  return (
    <div className='max-w-[1244px] my-20 mx-auto flex flex-col items-center'>
      <img src={logoImg} alt='Logo NLW eSports' />

      <h1 className='text-6xl text-white font-black mt-20 mb-16'>
        Seu
        <span className='bg-nlw-gradient text-transparent bg-clip-text'>
          {' duo '}
        </span>
        está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6'>
        {gameList.map((game) => (
          <GameBanner
            key={game.id}
            title={game.title}
            adsCount={game._count.ads}
            bannerUrl={game.bannerUrl}
          />
        ))}
      </div>

      <CreateAdBanner />
    </div>
  )
}
