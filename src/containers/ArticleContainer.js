import { connect } from 'react-redux'
import { fetchResourceRequested } from '../actions'
// Componente a ser conectado com as mudanças da store.
import Article from '../components/Article'

/**
 * Mapeia o estado global (store) para as propriedades do artigo.
 * 
 * @param {Object} state 
 * @param {Object} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params
  const {
    articles: {
      isFetching, error, byId
    }
  } = state.entities
  const article = byId[id]

  return {
    isFetching,
    article,
    error
  }
}

/**
 * Mapeia o despache de ações para as propriedades do artigo.
 * 
 * @param {Object} state 
 * @param {Object} ownProps 
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchArticle: () => {
    const { id } = ownProps.match.params
    // Ação para requisitar um único de artigo.
    const action = fetchResourceRequested('articles', id)

    return dispatch(action)
  }
})

// Conectando... 
export default connect(mapStateToProps, mapDispatchToProps)(Article)
