import styled from 'styled-components'

// Botão para paginação.
const Paginate = styled.button`
  font-size: 1rem;
  margin: 24px 0;
  border: none;
  background-color: rgba(0, 0, 0, .25);
  cursor: pointer;
  color: white;
  text-transform: uppercase;
  padding: 16px;
  
  &:disabled {
    background-color: rgba(0, 0, 0, .1);
    color: rgba(255, 255, 255, 0.5);
    cursor: initial;
  }
`

export default Paginate
