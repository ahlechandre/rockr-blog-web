import { connect } from 'react-redux'
import { createResourceRequested } from '../actions'
// Componente a ser conectado com as mudanças da store.
import ContactForm from '../components/ContactForm'

/**
 * Mapeia o estado global (store) para as propriedades dos artigos.
 * 
 * @param {Object} state 
 * @param {Object} ownProps 
 */
const mapStateToProps = state => {
  const { isFetching, error, submitted } = state.entities.contacts

  return {
    isFetching,
    submitted,
    error
  }
}

/**
 * Mapeia o despache de ações para as propriedades dos artigos.
 * 
 * @param {Object} state 
 * @param {Object} ownProps 
 */
const mapDispatchToProps = dispatch => ({
  sendContact: data => {
    // Ação para enviar novo contato.
    const action = createResourceRequested('contacts', data)

    return dispatch(action)
  }
})

// Conectando...
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
