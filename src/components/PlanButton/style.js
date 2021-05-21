import styled, { css } from 'styled-components'
import { colors } from '../../config/constants'

export const PlanCircle = styled.div`
  margin-top: 50px;
  border: 1px solid #ff6f61;
  width: 170px;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      border: 1px solid #ff6f61;
      background: #ff6f61;
      span {
        font-family: "Corbert Bold";
        color: #ffffff;
      }
    `}
`

export const PlanTitle = styled.span`
  color: ${colors.accentGray};
  font-size: 20px;
`
