import React from 'react'
import styled from 'styled-components'

const Centralize = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Text = styled.h3`
  color: rgba(255, 255, 255, .5);
`

export default function Feedback({ text }) {
  return (
    <Centralize>
      <Text>{ text }</Text>
    </Centralize>
  )
}