import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

interface activityCicleContextProps {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (secondsPassed: number) => void
  amountSecondsPassed: number
}

export const ActivityCycleContext = createContext(
  {} as activityCicleContextProps,
)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const optionsDefaultValues = { task: '', minutesAmount: 0 }
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: optionsDefaultValues,
  })

  const { watch, handleSubmit, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleStartCountdown(data: NewCycleFormData) {
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

  const task = watch('task')
  const isSubmitDisabled = !task

  function setSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed)
  }

  function markCurrentCycleAsFinished() {
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
  }

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
    <ActivityCycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    >
      <HomeContainer>
        <form onSubmit={handleSubmit(handleStartCountdown)} action="#">
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

          {activeCycle ? (
            <StopCountdownButton
              type="button"
              onClick={handleInterruptCountdown}
            >
              <HandPalm size={24} /> Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
              <Play size={24} /> Começar
            </StartCountdownButton>
          )}
        </form>
      </HomeContainer>
    </ActivityCycleContext.Provider>
  )
}
