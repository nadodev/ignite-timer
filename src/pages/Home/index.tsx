import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  ButtonSubmit,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput,
} from './style'

const newCycleFormValidationScheema = zod.object({
  task: zod.string().min(1, 'A task name is required'),
  minutesAmmount: zod
    .number()
    .min(5, 'O Valor minimo é 5')
    .max(60, 'O valor máximo é 60'),
})
export function Home() {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(newCycleFormValidationScheema),
  })

  const handleStartCountdown = (data: any) => {
    console.log(data)
  }

  console.log(formState.errors)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartCountdown)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            list="task-suggestions"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Projeto 5" />
          </datalist>
          <label htmlFor="task">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmmount"
            placeholder="00"
            step={5}
            min={5}
            {...register('minutesAmmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <ButtonSubmit type="submit" disabled={isSubmitDisabled}>
          <Play /> Começar
        </ButtonSubmit>
      </form>
    </HomeContainer>
  )
}
