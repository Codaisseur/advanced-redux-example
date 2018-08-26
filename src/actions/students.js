import { normalize, schema } from 'normalizr';

export const STUDENTS_REQUEST = 'STUDENTS_REQUEST'
export const STUDENTS_SUCCESS = 'STUDENTS_SUCCESS'
export const STUDENTS_ERROR = 'STUDENTS_ERROR'
export const ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS'

const studentSchema = new schema.Entity('students')

const endpoint = 'http://localhost:4000/students'

export const loadStudents = (batch) => async (dispatch, getState) => {
  if (getState().studentsForBatch[batch]) return null

  dispatch({
    type: STUDENTS_REQUEST,
    batch
  })
  const uri = `${endpoint}?batchId=${batch}`
  
  try {
    const response = await fetch(uri)
    const body = await response.json()

    dispatch({
      type: STUDENTS_SUCCESS,
      batch,
      ...normalize(body, [studentSchema])
    })
  }
  catch(error) {
    dispatch({
      type: STUDENTS_ERROR,
      errorMessage: error.toString()
    })
  }
}

export const addStudent = (student, batchId) => async (dispatch) => {
  const response = await fetch(endpoint, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...student,
      batchId
    })
  })
  const body = await response.json()

  dispatch({
    type: ADD_STUDENT_SUCCESS,
    ...normalize(body, studentSchema)
  })
}