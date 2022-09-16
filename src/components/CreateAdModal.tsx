import { useState } from 'react'
import { Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'
import { Input } from '../components'
import { Game } from '../App'

const WEEK_DAYS = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
]

type Props = {
  gameList: Game[]
}

export const CreateAdModal = ({ gameList }: Props) => {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    const { name, discord, yearsPlaying, hourStart, hourEnd } = data

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name,
        discord,
        useVoiceChannel,
        hourStart,
        hourEnd,
        yearsPlaying: Number(yearsPlaying),
        weekDays: weekDays.map(Number),
      })
    } catch (error) {
      alert('Algo deu errado!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed grid place-items-center'>
        <Dialog.Content className='bg-[#2A2634] text-white fixed py-8 px-10 rounded-lg w-[480px] shadow-lg shadow-black/25'>
          <Dialog.Title className='text-3xl font-black'>
            Publique um anúncio
          </Dialog.Title>

          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='game' className='font-semibold'>
                Qual o game?
              </label>
              <select
                id='game'
                name='game'
                defaultValue='1'
                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
              >
                <option value='1'>Selecione o game que deseja jogar</option>
                {gameList.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Seu nome (ou nickname)</label>
              <Input
                id='name'
                name='name'
                placeholder='Como te chamam dentro do game?'
              />
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                <Input
                  type='number'
                  id='yearsPlaying'
                  name='yearsPlaying'
                  placeholder='Tudo bem ser ZERO?'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='discord'>Qual o seu Discord?</label>
                <Input id='discord' name='discord' placeholder='Usuario#0000' />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='weekDays'>Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type='multiple'
                  className='grid grid-cols-4 gap-2'
                  onValueChange={setWeekDays}
                  value={weekDays}
                >
                  {WEEK_DAYS.map((day, index) => (
                    <ToggleGroup.Item
                      key={day}
                      title={day}
                      value={String(index)}
                      className={`w-8 h-8 rounded ${
                        weekDays.includes(String(index))
                          ? 'bg-violet-500'
                          : 'bg-zinc-900'
                      } transition-colors`}
                    >
                      {day.charAt(0)}
                    </ToggleGroup.Item>
                  ))}
                </ToggleGroup.Root>
              </div>

              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor='hourStart'>Qual horário do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input id='hourStart' type='time' placeholder='De' />
                  <Input id='hourEnd' type='time' placeholder='Até' />
                </div>
              </div>
            </div>

            <label className='mt-2 flex items-center gap-2 text-sm cursor-pointer'>
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) =>
                  setUseVoiceChannel(checked === true ? true : false)
                }
                className='w-6 h-6 p-1 rounded bg-zinc-900'
              >
                <Checkbox.Indicator>
                  <Check className='w-4 h-4 text-emerald-400' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className='mt-4 gap-4 flex justify-end'>
              <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors'>
                Cancelar
              </Dialog.Close>
              <button
                type='submit'
                className='bg-violet-500 flex items-center gap-3 px-5 h-12 rounded-md font-semibold hover:bg-violet-600 transition-colors'
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
