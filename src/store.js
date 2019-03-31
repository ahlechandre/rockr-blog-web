import { debug } from './env.json'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga' 
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import rootSaga from './sagas'

// Opções da middleware de Logger.
const loggerMiddlewareOptions = {
  collapsed: true,
  timestamp: false
}
// Cria a middleware de Saga.
const sagaMiddleware = createSagaMiddleware()
// Logs apenas em ambiente de teste.
const middlewares = debug ?
  applyMiddleware(sagaMiddleware, createLogger(loggerMiddlewareOptions)) :
  applyMiddleware(sagaMiddleware)
// Cria a store da aplicação.
const store = createStore(rootReducer, middlewares)
// Executa a Saga raíz.
sagaMiddleware.run(rootSaga)

export default store
