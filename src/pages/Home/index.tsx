import { useEffect, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import * as zod from 'zod'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1, 'Informe um valor maior que 5').max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDateTime: Date
  interruptionsDateTime?: Date
  finishDateTime?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const optionsDefaultValues = { task: '', minutesAmount: 0 }

  const NewForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: optionsDefaultValues,
  })

  const { handleSubmit, reset, watch } = NewForm

  const handleStartCountdown = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDateTime: new Date(),
    }

    setCycles((prevstate) => [...prevstate, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle?.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')

  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsPassed = differenceInSeconds(
          new Date(),
          activeCycle.startDateTime,
        )

        if (secondsPassed >= totalSeconds) {
          setActiveCycleId(null)
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return {
                  ...cycle,
                  finishDateTime: new Date(),
                }
              } else {
                return cycle
              }
            }),
          )

          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsPassed)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCycle, activeCycleId, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}` + ' - Pomodoro'
    }
  }, [minutes, seconds, activeCycle])

  function handleInterruptCountdown() {
    setActiveCycleId(null)

    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptionsDateTime: new Date(),
          }
        } else {
          return cycle
        }
      }),
    )
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartCountdown)} action="#">
        <NewCycleForm />
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCountdown}>
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
