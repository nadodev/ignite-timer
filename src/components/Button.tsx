import { ButtonVariants } from '../@types/ButtonVariant'
import { ButtonContainer } from './styles'

interface ButtonProps {
  color: ButtonVariants
}

export function Button({ color }: ButtonProps) {
  return <ButtonContainer variant={color}>Button</ButtonContainer>
}
