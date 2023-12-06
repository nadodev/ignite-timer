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

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="tasnk">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
          />
          <label htmlFor="tasnk">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmmount"
            placeholder="00"
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
