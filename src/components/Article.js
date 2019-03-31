import React, { useEffect } from 'react'

export default function Article({ isFetching, article, error, fetchArticle }) {

  useEffect(() => {
    if (!article) {
      fetchArticle()
    }
  }, [])

  if (isFetching) {
    return (
      <h1>Carregando artigo...</h1>
    )
  }

  if (error) {
    return (
      <h1>Erro: {error}</h1>
    )
  }

  if (!article) {
    return (
      <h1>Nada para mostrar</h1>
    )
  }

  return (
    <div>
      <img src={article.cover_image_src} alt="rock consert" />
      <h1>{article.title}</h1>
      <p>{article.author_name}</p>
      <div dangerouslySetInnerHTML={{
        __html: article.content
      }}></div>
    </div>
  )
}
