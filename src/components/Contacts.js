import React, { useEffect } from 'react'
import styled from 'styled-components'
// Componentes...
import { Cell, Grid, Row } from '@material/react-layout-grid';
import Feedback from './Feedback'
import Button from './Button'

export default function Contacts({
  paginateContacts,
  isFetching,
  nextPage,
  contacts
}) {
  // Hook para side-effect. Busca a primeira página de contatos ao renderizar.
  useEffect(() => {
    paginateContacts(1)
  }, [])

  // Verifica se está pronto para mostrar a lista de contatos...
  if (!contacts.length && isFetching) {
    return (
      <Feedback text="Preparando contatos..." />
    )
  }
  
  // Renderiza um item de contato.
  const mapContactToRender = (contact, index) => {
    return (
      <Cell desktopColumns={12} key={index}>
        {/* Divisor */}
        <div style={{
          height: index === 0 ? 0 : '1px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, .1)'
        }}></div>

        {/* Data de envio */}
        <ContactedAt>{
          (new Date(contact.created_at)).toLocaleDateString()
        }</ContactedAt>

        {/* Nome e e-mail */}
        <h4>{contact.name} {`<${contact.email}, ${contact.phone}>`}</h4>
        {/* Mensagem */}
        <p>
          {contact.message}
        </p>
      </Cell>
    )
  }

  return (
    <div>
      {/* Grid para contatos */}
      <Grid>
        {/* Título */}
        <Row>
          <Cell desktopColumns={12} style={{
            textAlign: 'center'
          }}>
            <h1>Contatos</h1>
          </Cell>          
        </Row>

        {/* Lista */}
        <Row>
          {contacts.map(mapContactToRender)}          
        </Row>
        
        {/* Paginação */}
        <Row>
          <Cell desktopColumns={12} style={{
            textAlign: 'center'
          }}>
            <Button
              disabled={!nextPage}
              onClick={() => {
                // Despacha ação para buscar próxima página de contatos.
                paginateContacts(nextPage)
              }}>Carregar mais</Button>          
          </Cell>
        </Row>
      </Grid>
    </div>
  )
}

const ContactedAt = styled.h3`
  color: rgba(255, 255, 255, .4);
`