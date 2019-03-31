import Api from '../services/api'
import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  FETCH_COLLECTION_REQUESTED,
  CREATE_RESOURCE_REQUESTED,
  FETCH_RESOURCE_REQUESTED,
} from '../constants'
import {
  fetchCollectionSucceeded,
  fetchCollectionFailed,
  fetchResourceSucceeded,
  fetchResourceFailed,
  createResourceSucceeded,
  createResourceFailed,
} from '../actions'

/**
 * Saga para requisitar coleção de recursos.
 * 
 * @param {Object} action 
 */
function* fetchCollection(action) {
  const { entity } = action.payload

  try {
    const collectionPaginateApi = Api(entity).paginate
    const page = action.payload.page
    // Realiza chamada para API.
    const response = yield call(collectionPaginateApi, page)
    // Resolve a resposta HTTP para JSON.
    const json = yield call([response, response.json])
    // Despacha a ação de sucesso.
    yield put(fetchCollectionSucceeded(entity, json))
  } catch (error) {
    // Despacha a ação de falha.
    yield put(fetchCollectionFailed(entity, error))
  }
}

/**
 * Saga para requisitar um recurso.
 * 
 * @param {Object} action 
 */
function* fetchResource(action) {
  const { entity } = action.payload

  try {
    const resourceShowApi = Api(entity).show
    const id = action.payload.id
    // Realiza chamada para API.
    const response = yield call(resourceShowApi, id)
    // Resolve a resposta HTTP para JSON.
    const json = yield call([response, response.json])
    // Despacha a ação de sucesso.
    yield put(fetchResourceSucceeded(entity, json))
  } catch (error) {
    // Despacha a ação de falha.
    yield put(fetchResourceFailed(entity, error))
  }
}

/**
 * Saga para criar novo recurso.
 * 
 * @param {Object} action 
 */
function* createResource(action) {
  const { entity } = action.payload

  try {
    const resourceStoreApi = Api(entity).store
    const data = action.payload.data
    // Realiza chamada para API.
    const response = yield call(resourceStoreApi, data)
    // Resolve a resposta HTTP para JSON.
    const json = yield call([response, response.json])

    if (response.status === 422) {
      // Em caso de falha de validação, lança todas as falhas de validação.
      throw (json)
    }
    // Despacha a ação de sucesso.
    yield put(createResourceSucceeded(entity, json))
  } catch (error) {
    // Despacha a ação de falha.
    yield put(createResourceFailed(entity, error))
  }
}

/**
 * Assiste sempre à última ação de buscar coleção de recursos.
 */
function* watchCollectionFetch() {
  yield takeLatest(FETCH_COLLECTION_REQUESTED, fetchCollection)
} 

/**
 * Assiste às ações de buscar um recurso.
 */
function* watchResourceFetch() {
  yield takeEvery(FETCH_RESOURCE_REQUESTED, fetchResource)
} 

/**
 * Assiste às ações de criar um novo recurso.
 */
function* watchResourceCreate() {
  yield takeEvery(CREATE_RESOURCE_REQUESTED, createResource)
} 

export default function* rootSaga() {
  yield all([
    watchCollectionFetch(),
    watchResourceCreate(),
    watchResourceFetch(),
  ])
}
