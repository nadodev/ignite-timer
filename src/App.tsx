import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/themeDefault'
import { GlobalStyle } from './styles/global'
import { ActivityCycleProvider } from './context/CycleContext'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ActivityCycleProvider>
          <Router />
        </ActivityCycleProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
