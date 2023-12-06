import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { defaultTheme } from "./themes/themeDefault";



export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button color="blue"/>
      <Button color="yellow"/>
      <Button  color="red"/>
      <Button color="green"/>
    </ThemeProvider>
  )
}


