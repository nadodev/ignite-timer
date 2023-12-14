import { createContext, useReducer, useState } from 'react'
import { CyclesReducers } from '../reducers/cycles/reducers'
import {
  ActionTypes,
  addNewCycle,
  interruptCurrentCycle,
} from '../reducers/cycles/actions'
export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDateTime: Date
  interruptionsDateTime?: Date
  finishDateTime?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface activityCicleContextProps {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  CreateNewCicle: (data: CreateCycleData) => void
  setSecondsPassed: (secondsPassed: number) => void
  handleInterruptCountdown: () => void
  markCurrentCycleAsFinished: () => void
}

export const ActivityCycleContext = createContext(
  {} as activityCicleContextProps,
)

export function ActivityCycleProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cyclesState, dispatch] = useReducer(CyclesReducers, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed)
  }

  function CreateNewCicle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDateTime: new Date(),
    }

    dispatch(addNewCycle(newCycle))
    setAmountSecondsPassed(0)
  }

  function handleInterruptCountdown() {
    dispatch(interruptCurrentCycle())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinished())
  }

  return (
    <ActivityCycleContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        CreateNewCicle,
        handleInterruptCountdown,
        cycles,
      }}
    >
      {children}
    </ActivityCycleContext.Provider>
  )
}
