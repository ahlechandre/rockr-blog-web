import React, { useEffect } from 'react'
import styled from 'styled-components'
// Componentes...
import { Cell, Grid, Row } from '@material/react-layout-grid';
import Feedback from './Feedback'

export default function Article({
  fetchArticle,
  isFetching,
  article,
}) {
  // Hook para side-effect. Tenta buscar artigo na primeira renderização.
  useEffect(() => {
    // Apenas busca o artigo se este não existir na coleção atual.
    if (!article) {
      fetchArticle()
    }
  }, [])

  // Verifica se está pronto para mostrar o artigo...
  if (!article || isFetching) {
    return (
      <Feedback text="Preparando artigo..." />
    )
  }

  return (
    <div>
      {/* Imagem de capa. */}
      <Cover src={article.cover_image_src}/>

      {/* Grid para corpo do artigo. */}
      <Grid style={{
        maxWidth: '750px'
      }}>
        <Row>
          <Cell desktopColumns={12}>
            {/* Título */}
            <Title>{article.title}</Title>
          </Cell>

          <Cell desktopColumns={12} align="right">
            {/* Autor */}
            <Author>{article.author_name}</Author>
            {/* Data de publicação */}
            <PublicatedAt>{
              (new Date(article.created_at)).toLocaleDateString()
            }</PublicatedAt>

          </Cell>

          <Cell desktopColumns={12}>
            {/* Divisor para o conteúdo */}
            <Divider />
          </Cell>

          <Cell desktopColumns={12}>
            {/* Conteúdo */}
            <Content dangerouslySetInnerHTML={{
              __html: article.content
            }} />
          </Cell>
        </Row>
      </Grid>
    </div>
  )
}

// Imagem de capa.
const Cover = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
`

// Título do artigo.
const Title = styled.h1`
  font-size: 3rem;
  margin-top: -7rem;
  margin-bottom: 0;
`

// Autor do artigo.
const Author = styled.h3`
  font-size: 1.25rem;
  color: white;
  margin: 0;
`

// Data de publicação.
const PublicatedAt = styled.h3`
  font-size: 1rem;
  color: rgba(255, 255, 255, .5);
`

// Conteúdo.
const Content = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, .75);
  line-height: 160%;
`

// Divisor.
const Divider = styled.div`
  margin: auto;
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, .1)
`