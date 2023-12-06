import { Play } from 'phosphor-react'
import {
  ButtonSubmit,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  TaskInput,
} from './style'
import { useState } from 'react'

export function Home() {
  const [value, setValue] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const newValue = inputValue.slice(0, 2)
    setValue(newValue)
  }
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="tasnk">Vou trabalhar em</label>
          <TaskInput
            type="text"
            list="task-suggestions"
            id="task"
            placeholder="Dê um nome para o seu projeto"
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
            <option value="Projeto 5" />
          </datalist>
          <label htmlFor="tasnk">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmmount"
            placeholder="00"
            step={5}
            value={value}
            min={5}
            max={60}
            onChange={handleInputChange}
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
        <ButtonSubmit type="submit">
          <Play /> Começar
        </ButtonSubmit>
      </form>
    </HomeContainer>
  )
}
