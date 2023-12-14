import { createContext, useReducer, useState } from 'react'

interface Cycle {
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
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (secondsPassed: number) => void
  amountSecondsPassed: number
  CreateNewCicle: (data: CreateCycleData) => void
  handleInterruptCountdown: () => void
  cycles: Cycle[]
}
export const ActivityCycleContext = createContext(
  {} as activityCicleContextProps,
)

export function ActivityCycleProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    console.log('state', state)
    console.log('action', action)

    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
      return state.map((cycle) => {
        if (cycle.id === action.payload.activeCycleId) {
          return {
            ...cycle,
            interruptionsDateTime: new Date(),
          }
        } else {
          return cycle
        }
      })
    }

    if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
      return state.map((cycle) => {
        if (cycle.id === action.payload.activeCycleId) {
          return {
            ...cycle,
            finishDateTime: new Date(),
          }
        } else {
          return cycle
        }
      })
    }

    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

    // setCycles((prevstate) => [...prevstate, newCycle])
    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function handleInterruptCountdown() {
    setActiveCycleId(null)

    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return {
    //         ...cycle,
    //         interruptionsDateTime: new Date(),
    //       }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return {
    //         ...cycle,
    //         finishDateTime: new Date(),
    //       }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
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
