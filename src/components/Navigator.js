import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
// Containers.
import ArticleContainer from '../containers/ArticleContainer'
import ArticlesContainer from '../containers/ArticlesContainer'
import ContactFormContainer from '../containers/ContactFormContainer'
import ContactsContainer from '../containers/ContactsContainer'
// Componentes.
import NotFound from '../components/NotFound'

export default function Navigator() {
  return (
    <Router>
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
