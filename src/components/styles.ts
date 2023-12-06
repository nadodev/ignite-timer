import styled from "styled-components";
import { ButtonVariants } from "../@types/ButtonVariant";

interface colorProps {
    variant: ButtonVariants
}

export const ButtonContainer = styled.button<colorProps>`
    border: none;
    padding: 15px 32px;
    margin: 4px 2px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;

    background-color:  ${props => props.theme["gray-500"]};
    
`