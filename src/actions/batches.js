import { normalize, schema } from 'normalizr';

const batchSchema = new schema.Entity('batches')

export const BATCHES_REQUEST = 'BATCHES_REQUEST'
export const BATCHES_SUCCESS = 'BATCHES_SUCCESS'
export const BATCHES_ERROR = 'BATCHES_ERROR'

export const BATCH_SUCCESS = 'BATCH_SUCCESS'
export const BATCH_ERROR = 'BATCH_ERROR'

const endpoint = 'http://localhost:4000/batches'

export const loadBatch = (id) => async (dispatch, getState) => {
  if (getState().entities.batches[id]) return null

  try {
    const response = await fetch(`${endpoint}/${id}`)
    const body = await response.json()

    if (response.status === 404) {
      dispatch({
        type: BATCH_ERROR,
        errorMessage: `Batch ${ id } does not exist`
      })
    }
    else {
      dispatch({
        type: BATCH_SUCCESS,
        ...normalize(body, batchSchema)
      })
    }
  }
  catch(error) {
    dispatch({
      type: BATCH_ERROR,
      errorMessage: error.toString()
    })
  }
}

export const loadBatches = (page = 0) => async (dispatch, getState) => {
  if (getState().paginatedBatches.page === page) return null

  dispatch({
    type: BATCHES_REQUEST
  })
  const uri = `${endpoint}?_page=${ page }`
  
  try {
    const response = await fetch(uri)
    const body = await response.json()

    const { entities, result } = normalize(body, [ batchSchema ])
    const total = Number(response.headers.get('x-total-count'))

    dispatch({
      type: BATCHES_SUCCESS,
      entities,
      result,
      page,
      total
    })
  }
  catch(error) {
    dispatch({
      type: BATCHES_ERROR,
      errorMessage: error.toString()
    })
  }
}