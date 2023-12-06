import { Play } from 'phosphor-react'
import { CountdownContainer, FormContainer, HomeContainer } from './style'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="tasnk">Vou trabalhar em</label>
          <input type="text" id="task" />

          <label htmlFor="tasnk">durante</label>
          <input type="number" id="minutesAmmount" />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play /> Começar
        </button>
      </form>
    </HomeContainer>
  )
}
