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

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function ActivityCycleProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [cyclesState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  interruptionsDateTime: new Date(),
                }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  finishDateTime: new Date(),
                }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

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

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    setAmountSecondsPassed(0)
  }

  function handleInterruptCountdown() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
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
