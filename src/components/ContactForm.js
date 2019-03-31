import React, { useState, useEffect } from 'react'

export default function ContactForm({
  isFetching,
  sendContact,
  error,
  submitted
}) {
  const dataInitialState = {
    name: '',
    email: '',
    phone: '',
    message: '',
  }
  const [data, setData] = useState(dataInitialState)
  const succeeded = !isFetching && (submitted && !error)

  useEffect(() => {
    if (succeeded) {
      setData(dataInitialState)
    }
  }, [succeeded])

  if (isFetching) {
    return (
      <h1>Aguarde...</h1>
    )
  }

  return (
    <div>
      <h1>contact form</h1>
      {succeeded ? (
        <p style={{ color: 'green' }}>Enviado com sucesso!</p>
      ) : null}

      <form onSubmit={e => {
        sendContact(data)

        e.preventDefault()
      }}>
        <div>
          <input type="text" value={data.name} required placeholder="name" onChange={e => setData({
            ...data,
            name: e.target.value
          })} />
          {error && error['name'] ? (
            <p style={{ color: 'red' }}>{error['name'][0]}</p>
          ) : null}
        </div>

        <div>
          <input type="email" value={data.email} required placeholder="email" onChange={e => setData({
            ...data,
            email: e.target.value
          })} />
          {error && error['email'] ? (
            <p style={{ color: 'red' }}>{error['email'][0]}</p>
          ) : null}          
        </div>

        <div>
          <input type="phone" value={data.phone} required placeholder="phone" onChange={e => setData({
            ...data,
            phone: e.target.value
          })} />
          {error && error['phone'] ? (
            <p style={{ color: 'red' }}>{error['phone'][0]}</p>
          ) : null}
        </div>

        <div>
          <textarea placeholder="message" required onChange={e => setData({
            ...data,
            message: e.target.value
          })} value={data.message}></textarea>
          {error && error['message'] ? (
            <p style={{ color: 'red' }}>{error['message'][0]}</p>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
