import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// Componentes...
import { Cell, Grid, Row } from '@material/react-layout-grid';
import Button from './Button'

export default function ContactForm({
  sendContact,
  isFetching,
  submitted,
  error,
}) {
  // Define o estado inicial do formulário de contato.
  const dataInitialState = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }
  // Hook para definição dos dados de contato.
  const [data, setData] = useState(dataInitialState)
  // Formulário foi submetido e obteve sucesso?
  const succeeded = !isFetching && (submitted && !error)
  // Hook para side-effect. Apenas se o formulário foi submetido com sucesso,
  // redefine os dados de contato para os valores iniciais.
  useEffect(() => {
    if (succeeded) {
      setData(dataInitialState)
    }
  }, [succeeded])
  // Determina se o formulário possui todos os campos preenchidos.
  const formFilled = (() => {
    return data.name && data.email && data.phone && data.message
  })()
  // Manipula ao submeter o formulário.
  const handleSubmit = event => {
    event.preventDefault()
    // Despacha ação para enviar dados de contato.
    sendContact(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid style={{
        maxWidth: '750px'
      }}>
        {/* Título */}
        <Row>
          <Cell desktopColumns={12} style={{
            textAlign: 'center'
          }}>
            <h1>Novo contato</h1>

            {/* Formulário enviado com sucesso? */}
            {
              succeeded ? (
                <SuccessMessage>Legal, recebemos o seu contato!</SuccessMessage>
              ) : null
            }
          </Cell>
        </Row>

        {/* Inputs */}
        <Row>
          {/* Nome */}
          <Cell
            desktopColumns={12}
            tabletColumns={8}
            phoneColumns={4}>
            <Label>Nome</Label>
            <Input
              type="text"
              required
              placeholder="e.g. Alexandre Thebaldi"
              value={data.name}
              onChange={event => setData({
                ...data,
                name: event.target.value
              })}/>
              {/* Validação */}
              <ValidationMessage>{
                error && error.name ? error.name[0] : null
              }</ValidationMessage>
          </Cell>

          {/* E-mail */}
          <Cell
            desktopColumns={6}
            tabletColumns={4}
            phoneColumns={4}>
            <Label>E-mail</Label>
            <Input
              type="email"
              required
              placeholder="e.g. ahlechandre@gmail.com"
              value={data.email}
              onChange={event => setData({
                ...data,
                email: event.target.value
              })}/>
              {/* Validação */}
              <ValidationMessage>{
                error && error.email ? error.email[0] : null
              }</ValidationMessage>
          </Cell>

          {/* Telefone */}
          <Cell
            desktopColumns={6}
            tabletColumns={4}
            phoneColumns={4}>
            <Label>Telefone</Label>
            <Input
              type="text"
              required
              placeholder="e.g. (66) 99622-4282"
              value={data.phone}
              onChange={event => setData({
                ...data,
                phone: event.target.value
              })}/>
              {/* Validação */}
              <ValidationMessage>{
                error && error.phone ? error.phone[0] : null
              }</ValidationMessage>
          </Cell>

          {/* Mensagem */}
          <Cell
            desktopColumns={12}>
            <Label>Mensagem</Label>
            <TextArea
              required
              placeholder="Olá, como vai?"
              value={data.message}
              onChange={event => setData({
                ...data,
                message: event.target.value
              })}/>
              {/* Validação */}
              <ValidationMessage>{
                error && error.message ? error.message[0] : null
              }</ValidationMessage>
          </Cell>

        </Row>
          
        <Row>
          <Cell desktopColumns={12} style={{
            textAlign: 'center'
          }}>
            <Button disabled={!formFilled}>Enviar contato</Button>
          </Cell>
        </Row>
      </Grid>
    </form>
  )
}

// Mensagem de sucesso.
const SuccessMessage = styled.h3`
  width: 100%;
  font-size: 1.2rem;
  background-color: rgba(255, 255, 255, .5);
  padding: 12px;
  border-radius: 4px;
  color: black;
`
// Mensagem de validação.
const ValidationMessage = styled.span`
  font-size: 1rem;
  color: red;
`

// Label para inputs.
const Label = styled.label`
  display: block;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, .5);
` 

// Inputs de texto.
const Input = styled.input`
  width: 100%;
  background-color: rgba(0, 0, 0, .25);
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, .25);
  color: white;
  font-size: 1.25rem;
  margin: 12px 0;
  padding: 12px;
` 

// Caixa de texto para mensagem.
const TextArea = styled.textarea`
  width: 100%;
  background-color: rgba(0, 0, 0, .25);
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, .25);
  color: white;
  font-size: 1.25rem;
  margin-top: 12px;
  padding: 12px;
`