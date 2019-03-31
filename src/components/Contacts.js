import React, { useState, useEffect } from 'react'

export default function Contacts({
  isFetching,
  nextPage,
  contacts,
  paginateContacts
}) {
  const [pageToFetch, setPageToFetch] = useState(nextPage)

  useEffect(() => {
    if (pageToFetch) {
      paginateContacts(pageToFetch)
    }
  }, [ pageToFetch ])

  if (isFetching) {
    return <h1>Carregando...</h1>
  }

  if (!contacts.length) {
    return <h1>Nada para mostrar</h1>
  }

  return (
    <div>
      <h1>Contatos (páginas: {pageToFetch})</h1>

      <ul>
        {contacts.map((contact, index) => (<li key={index}>
          <p>Nome: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Fone: {contact.phone}</p>
          <p>Mensagem: {contact.message}</p>
        </li>))}
      </ul>

      <button disabled={!nextPage} onClick={() => {
        setPageToFetch(pageToFetch + 1)
      }}>load more</button>
    </div>
  )
}
