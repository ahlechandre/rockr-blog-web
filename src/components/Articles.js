import React, { useEffect } from 'react'
import styled from 'styled-components'
// Componentes...
import { Link } from 'react-router-dom'
import { Cell, Grid, Row } from '@material/react-layout-grid';
import Feedback from './Feedback'
import Paginate from './Paginate'

export default function Articles({
  paginateArticles,
  isFetching,
  nextPage,
  articles
}) {
  // Hook para side-effect. Busca a primeira página de artigos ao renderizar.
  useEffect(() => {
    paginateArticles(1)
  }, [])

  // Verifica se está pronto para mostrar a lista de artigos...
  if (!articles.length && isFetching) {
    return (
      <Feedback text="Preparando artigos..." />
    )
  }
  // Renderiza um item de artigo com link para visualizar mais.
  const mapArticleToRender = (article, index) => {
    // Calcula artigos em destaque para desktop.
    const desktopColumns = index === 0 ? 12 : (
      index <= 2 ? 6 : 3 
    ) 
    // Calcula artigos em destaque para tablet.
    const tabletColumns = index <= 2 ? 8 : 4

    return (
      <ArticleCell
        background={article.cover_image_src}
        desktopColumns={desktopColumns}
        tabletColumns={tabletColumns}
        phoneColumns={4}
        key={index}>
        <ArticleLink to={`/articles/${article.id}`}>
          <div style={{ padding: `${desktopColumns * 4}px` }}>
            {/* Título */}
            <Title desktopColumns={desktopColumns}>{article.title}</Title>
            {/* Atuor */}
            <Author>{article.author_name}</Author>
            {/* Data de publicação */}
            <PublicatedAt>{
              (new Date(article.created_at)).toLocaleDateString()
            }</PublicatedAt>
          </div>
        </ArticleLink>
      </ArticleCell>
    )
  }

  return (
    <div>
      {/* Grid para artigos */}
      <Grid>
        {/* Lista */}
        <Row>
          {articles.map(mapArticleToRender)}          
        </Row>
        
        {/* Paginação */}
        <Row>
          <Cell desktopColumns={12} style={{
            textAlign: 'center'
          }}>
            <Paginate
              disabled={!nextPage}
              onClick={() => {
                // Despacha ação para buscar próxima página de artigos.
                paginateArticles(nextPage)
              }}>Carregar mais</Paginate>          
          </Cell>
        </Row>
      </Grid>
    </div>
  )
}

// Célula do artigo.
const ArticleCell = styled(Cell)`
  height: ${({ desktopColumns }) => desktopColumns * 50}px;
  background-image: url(${({ background }) => background});
  background-size: cover;
  background-repeat: no-repeat;
`

// Link para artigo.
const ArticleLink = styled(Link)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  height: inherit;
  background-color: rgba(0, 0, 0, .75);
  transition: .175s linear;
  text-decoration: none;

  &:hover {
    background-color: transparent;
  }
`

// Título do artigo.
const Title = styled.h1`
  color: white;
  text-decoration: none;
  margin: 0;
  font-size: ${({ desktopColumns }) => desktopColumns * .5}rem;
`

// Autor do artigo.
const Author = styled.h3`
  font-size: 1rem;
  color: white;
`

// Data de publicação.
const PublicatedAt = styled.h3`
  font-size: 1rem;
  color: rgba(255, 255, 255, .5);
`