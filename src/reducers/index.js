import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import {BATCHES_REQUEST, BATCHES_SUCCESS, BATCHES_ERROR} from '../actions/batches'
import {STUDENTS_ERROR, STUDENTS_REQUEST, STUDENTS_SUCCESS, ADD_STUDENT_SUCCESS} from '../actions/students'

const entities = (state = { students: {}, batches: {} }, action) => {
  if (action.entities) {
    return merge({}, state, action.entities)
  }
  return state
}

const errorMessage = (state = null, action) => {
  if (action.errorMessage) return action.errorMessage
  return state
}

const paginatedBatches = (state = { fetching: false, ids: [], page: null, total: null }, action) => {
  switch(action.type) {
    case BATCHES_REQUEST:
      return {
        ...state,
        fetching: true
      }
    
    case BATCHES_SUCCESS:
      return {
        fetching: false,
        ids: action.result,
        page: action.page,
        total: action.total
      }
    
    case BATCHES_ERROR:
      return {
        ...state,
        fetching: false
      }
    
    default:
      return state
  }
}


const studentsForBatch = (state = {}, action) => {
  switch(action.type) {
    case STUDENTS_REQUEST:
      return {
        ...state,
        [action.batch]: {
          ids: [],
          ...state[action.batch],
          fetching: true
        }
      }
    
    case STUDENTS_SUCCESS:
      return {
        ...state,
        [action.batch]: {
          ...state[action.batch],
          fetching: false,
          ids: action.result,
        }
      }

    case STUDENTS_ERROR:
      return {
        ...state,
        [action.batch]: {
          ...state[action.batch],
          fetching: false
        }
      }

    case ADD_STUDENT_SUCCESS:
      const student = action.entities.students[action.result]
      return {
        ...state,
        [student.batchId]: {
          ...state[student.batchId],
          ids: state[student.batchId].ids.concat(student.id)
        }
      }
    
    default:
      return state
  }
}

export default combineReducers({
  entities,
  errorMessage,
  paginatedBatches,
  studentsForBatch
})