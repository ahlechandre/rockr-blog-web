import React from 'react'
// Redux...
import { Provider } from 'react-redux'
import store from './store'
// Componentes...
import GlobalStyle from './components/GlobalStyle'
import Layout from './components/Layout'

export default function App() {
  return (
    <Provider store={store}>
      {/* Estilo CSS Global */}
      <GlobalStyle />
      {/* Layout da aplicação */}
      <Layout />
    </Provider>
  )
}
