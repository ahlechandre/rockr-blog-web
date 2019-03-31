// Sistema de grid.
import '@material/react-layout-grid/dist/layout-grid.css';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
    font-family: 'Roboto', sans-serif;
    background-color: #202020;
    color: white
  }
`

export default GlobalStyle
