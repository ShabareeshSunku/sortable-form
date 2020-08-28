import { actiontypes } from './constants'
import axios from 'axios'
const getFields = () => {
  const resourceURI = 'http://54.193.89.54:8230/readFields'
  const promise = axios.get(resourceURI)
  return {
    resourceURI,
    promise,
    type: actiontypes.GET_FIELDS
  }
}

const updateFields = (fields = []) => {
  return {
    fields,
    type: actiontypes.UPDATE_FIELDS
  }
}
const deleteField = position => {
  return {
    position,
    type: actiontypes.DELETE_FIELD
  }
}
const restoreField = position => {
  return {
    position,
    type: actiontypes.RESTORE_FIELD
  }
}
const resetFields = () => {
  return {
    type: actiontypes.RESET_FIELDS
  }
}
const saveFields = (fields = []) => {
  const updatedFields = fields.map((field, idx) => ({ ...field, order: idx + 1 }))
  const resourceURI = 'http://54.193.89.54:8230/saveFields'
  const promise = axios.post(resourceURI, updatedFields)
  return {
    resourceURI,
    promise,
    type: actiontypes.SAVE_FIELDS
  }
}
export {
  getFields,
  updateFields,
  deleteField,
  restoreField,
  resetFields,
  saveFields
}