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
 * 
 * @param {string} entity 
 * @param {null|Number} page 
 */
export const fetchCollectionRequested = (entity, page) => ({
  type: FETCH_COLLECTION_REQUESTED,
  payload: {
    entity, page
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
export const fetchCollectionSucceeded = (entity, json) => ({
  type: FETCH_COLLECTION_SUCCEEDED,
  payload: {
    entity,
    collection: json.data,
    pages: {
      current: json.current_page,
      next: json.next_page_url ? json.current_page + 1 : null
    }
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
export const fetchCollectionFailed = (entity, error) => ({
  type: FETCH_COLLECTION_FAILED,
  payload: {
    entity, error
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Object} data 
 */
export const createResourceRequested = (entity, data) => ({
  type: CREATE_RESOURCE_REQUESTED,
  payload: {
    entity, data
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
export const createResourceSucceeded = (entity, json) => ({
  type: CREATE_RESOURCE_SUCCEEDED,
  payload: {
    entity,
    resource: json
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
export const createResourceFailed = (entity, error) => ({
  type: CREATE_RESOURCE_FAILED,
  payload: {
    entity, error
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Number} id 
 */
export const fetchResourceRequested = (entity, id) => ({
  type: FETCH_RESOURCE_REQUESTED,
  payload: {
    entity, id
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
export const fetchResourceSucceeded = (entity, json) => ({
  type: FETCH_RESOURCE_SUCCEEDED,
  payload: {
    entity,
    resource: json
  }
})

/**
 * 
 * @param {string} entity 
 * @param {Object} json 
 */
export const fetchResourceFailed = (entity, error) => ({
  type: FETCH_RESOURCE_FAILED,
  payload: {
    entity, error
  }
})
