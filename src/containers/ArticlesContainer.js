import { connect } from 'react-redux'
import { fetchCollectionRequested } from '../actions'
// Componente a ser conectado com as mudanças da store.
import Articles from '../components/Articles'

/**
 * Mapeia o estado global (store) para as propriedades dos artigos.
 * 
 * @param {Object} state 
 * @param {Object} ownProps 
 */
const mapStateToProps = state => {
  const {
    isFetching,
    allIds,
    pages,
    byId
  } = state.entities.articles
  // Lista de artigos.
  const articles = allIds.map(id => byId[id])
  // Se não existir página atual e nem próxima, então a próxima é a primeira.
  // Caso contrário a próxima está indicada já está indicada no estado.
  const nextPage = !pages.current && !pages.next ? 1 : pages.next

  return {
    isFetching,
    articles,
    nextPage,
  }
}

/**
 * Mapeia o despache de ações para as propriedades dos artigos.
 * 
 * @param {Object} state 
 * @param {Object} ownProps 
 */
const mapDispatchToProps = dispatch => ({
  paginateArticles: page => {
    // Ação para requisitar página com coleção de artigos.
    const action = fetchCollectionRequested('articles', page)

    return dispatch(action)
  } 
})

// Conectando...
export default connect(mapStateToProps, mapDispatchToProps)(Articles)
