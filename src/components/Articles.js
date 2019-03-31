import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Articles({
  isFetching,
  nextPage,
  articles,
  paginateArticles
}) {
  const [pageToFetch, setPageToFetch] = useState(nextPage)

  useEffect(() => {
    if (pageToFetch) {
      paginateArticles(pageToFetch)
    }
  }, [ pageToFetch ])

  if (isFetching) {
    return <h1>Carregando...</h1>
  }

  if (!articles.length) {
    return <h1>Nada para mostrar</h1>
  }

  return (
    <div>
      <h1>artigos (páginas: {pageToFetch})</h1>

      <ul>
        {articles.map((article, index) => (<li key={index}>
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
          <p>{article.author_name}</p>
        </li>))}
      </ul>

      <button disabled={!nextPage} onClick={() => {
        setPageToFetch(pageToFetch + 1)
      }}>load more</button>
    </div>
  )
}
