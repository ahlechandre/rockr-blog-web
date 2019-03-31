import { combineReducers } from 'redux'
import {
  FETCH_COLLECTION_REQUESTED,
  FETCH_COLLECTION_SUCCEEDED,
  FETCH_COLLECTION_FAILED,
  CREATE_RESOURCE_REQUESTED,
  CREATE_RESOURCE_SUCCEEDED,
  CREATE_RESOURCE_FAILED,
  FETCH_RESOURCE_REQUESTED,
  FETCH_RESOURCE_SUCCEEDED,
  FETCH_RESOURCE_FAILED
} from '../constants'

/**
 * -----------------------------------------------
 * Shapes.
 * -----------------------------------------------
 */

// Estado inicial de cada entidade.
const entityInitialState = {
  isFetching: false,
  submitted: false,
  byId: {},
  allIds: [],
  error: null,
  pages: {
    current: null,
    next: null,
  }
}

// Estado inicial das entidades.
const entitiesInitialState = {
  articles: entityInitialState,
  contacts: entityInitialState,
}

/**
 * -----------------------------------------------
 * Reducers.
 * -----------------------------------------------
 */

/**
 * Formaliza o estado.
 * Ler mais: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape#designing-a-normalized-state.
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const collectionFetched = (state, action) => {
  const { collection, pages } = action.payload
  const nextById = collection.reduce((prevCollection, resource) => ({
    ...prevCollection,
    [resource.id]: resource
  }), {})
  const byId = {
    ...state.byId,
    ...nextById
  }
  // Mantém a ordem do JSON.
  const allIds = [
    ...state.allIds,
    // Adiciona apenas os que não existem.
    ...action.payload.collection
      .filter(resource => !state.allIds.includes(resource.id))
      .map(resource => resource.id)
  ]

  return {
    allIds,
    pages,
    byId
  }
}

/**
 * Apenas adiciona mais um item ao estado formalizado.
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const resourceFetched = (state, action) => {
  const { resource } = action.payload
  const byId = {
    ...state.byId,
    [resource.id]: resource
  }
  const allIds = Object.keys(byId)

  return {
    allIds,
    byId
  }
}

 /**
  * 
  * @param {Object} state 
  * @param {Object} action 
  */
const entityRequestSucceeded = (state, action) => {
  const nextState = {
    ...state,
    error: null,
    isFetching: false
  }

  switch (action.type) {
    case FETCH_COLLECTION_SUCCEEDED:
      // Recebe coleção de recursos.
      return {
        ...nextState,
        ...collectionFetched(state, action)
      }
    case FETCH_RESOURCE_SUCCEEDED:
    case CREATE_RESOURCE_SUCCEEDED:
      // Recebe um único recurso.
      return {
        ...nextState,
        ...resourceFetched(state, action)
      }
    default:
      return nextState
  }
}

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const entityRequested = (state, action) => {
  const nextState = {
    ...state,
    isFetching: true
  }

  switch (action.type) {
    case CREATE_RESOURCE_REQUESTED:
      // Ao requisitar armazenamento de dados, define flag para 
      // indicar esta submissão de dados.
      return {
        ...nextState,
        submitted: true
      }
    default:
      return nextState
  }
}

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const entityReceived = (state, action) => {
  switch (action.type) {
    case FETCH_COLLECTION_SUCCEEDED:
    case FETCH_RESOURCE_SUCCEEDED:
    case CREATE_RESOURCE_SUCCEEDED:
      // Ao requisitar com sucesso.
      return entityRequestSucceeded(state, action)
    case FETCH_COLLECTION_FAILED:
    case FETCH_RESOURCE_FAILED:
    case CREATE_RESOURCE_FAILED:
      // Ao requisitar com falha.
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
      }
    default:
      return state
  }
}

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const entity = (state, action) => {
  switch (action.type) {
    case FETCH_COLLECTION_REQUESTED:
    case FETCH_RESOURCE_REQUESTED:
    case CREATE_RESOURCE_REQUESTED:
      // Ao requisitar entidade à API.
      return entityRequested(state, action)
    case FETCH_COLLECTION_SUCCEEDED:
    case FETCH_RESOURCE_SUCCEEDED:
    case CREATE_RESOURCE_SUCCEEDED:
    case FETCH_COLLECTION_FAILED:
    case FETCH_RESOURCE_FAILED:
    case CREATE_RESOURCE_FAILED:
      // Ao receber dados de entidade da API.
      return entityReceived(state, action)
    default:
      return state
  }
}

/**
 * 
 * @param {Object} state 
 * @param {Object} action 
 */
const entities = (state = entitiesInitialState, action) => {
  switch (action.type) {
    case FETCH_COLLECTION_REQUESTED:
    case FETCH_COLLECTION_SUCCEEDED:
    case FETCH_COLLECTION_FAILED:
    case CREATE_RESOURCE_REQUESTED:
    case CREATE_RESOURCE_SUCCEEDED:
    case CREATE_RESOURCE_FAILED:
    case FETCH_RESOURCE_REQUESTED:
    case FETCH_RESOURCE_SUCCEEDED:
    case FETCH_RESOURCE_FAILED:
      // Por entidade.
      return {
        ...state,
        [action.payload.entity]: entity(state[action.payload.entity], action) 
      }
    default:
      return state
  }
}

// Não há outros domínios além de entidades.
export default combineReducers({
  entities
})
