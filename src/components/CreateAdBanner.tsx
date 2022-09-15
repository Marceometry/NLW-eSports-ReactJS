import { MagnifyingGlassPlus } from 'phosphor-react'

export const CreateAdBanner = () => {
  return (
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
  )
}
