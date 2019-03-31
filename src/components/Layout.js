import React from 'react'
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Redirect,
  NavLink,
  Switch,
  Route,
} from 'react-router-dom'
// Containers...
import ArticleContainer from '../containers/ArticleContainer'
import ArticlesContainer from '../containers/ArticlesContainer'
import ContactFormContainer from '../containers/ContactFormContainer'
import ContactsContainer from '../containers/ContactsContainer'
// Componentes...
import NotFound from './NotFound'

export default function Layout() {
  return (
    <Router>
      {/* Toolbar */}
      <Toolbar>
        <ToolbarLogo>Rockr Blog</ToolbarLogo>
        <ToolbarNav>
          <ToolbarLink
            to="/articles"
            activeStyle={ToolbarLinkStyle}>Artigos</ToolbarLink>
          <ToolbarLink
            to="/contacts"
            activeStyle={ToolbarLinkStyle}>Contatos</ToolbarLink>
          <ToolbarLink
            to="/contact"
            activeStyle={ToolbarLinkStyle}>Novo contato</ToolbarLink>
        </ToolbarNav>
      </Toolbar>

      <Switch>
        {/* Inicia a navegação na tela de artigos, por padrão. */}
        <Redirect exact from="/" to="/articles" />
        {/* Um artigo. */}
        <Route path="/articles/:id" component={ArticleContainer} />
        {/* Todos os artigos. */}
        <Route path="/articles" component={ArticlesContainer} />
        {/* Novo contato. */}
        <Route path="/contact" component={ContactFormContainer} />
        {/* Todos os contatos. */}
        <Route path="/contacts" component={ContactsContainer} />
        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

const ToolbarLinkStyle = {
  color: 'white',
}

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  background-color: black;
`

const ToolbarLogo = styled.div`
  margin: 0 16px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`

const ToolbarNav = styled.div`
  /* margin: 0 10px; */
`

const ToolbarLink = styled(NavLink)`
  color: rgba(255, 255, 255, .6);
  text-decoration: none;
  margin: 0 16px;

  &:hover, &:active, &:focus {
    color: white;
  }
`