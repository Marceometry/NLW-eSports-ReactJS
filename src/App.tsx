import { MagnifyingGlassPlus } from 'phosphor-react'
import logoImg from './assets/logo.svg'

const games = [
  'League of Legends',
  'Dota 2',
  'Counter Strike',
  'Apex Legends',
  'Fortnite',
  'World of Warcraft',
]

export function App() {
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
        {games.map((game, index) => (
          <a href='' className='relative rounded-lg overflow-hidden'>
            <img src={`/game-${index + 1}.png`} alt={`Game ${index + 1}`} />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0'>
              <strong className='font-bold text-white block'>{game}</strong>
              <span className='text-zinc-300 text-sm'>4 anúncios</span>
            </div>
          </a>
        ))}
      </div>

      <div className='pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
          <div>
            <strong className='text-white font-black text-2xl'>
              Não encontrou seu duo?
            </strong>
            <span className='text-zinc-400 block'>
              Publique um anúncio para encontrar novos players!
            </span>
          </div>

          <button className='py-3 px-4 rounded text-white bg-violet-500 hover:bg-violet-600 transition-colors flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}
