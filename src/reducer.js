import { actiontypes } from './constants'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case actiontypes.GET_FIELDS_REQUEST: {
      return Object.assign({}, state, { loading: true })
    }
    case actiontypes.GET_FIELDS_ERROR: {
      return Object.assign({}, state, { loading: false })
    }
    case actiontypes.GET_FIELDS: {
      const { data = [] } = action
      return Object.assign({}, state, {
        fields: data,
        backup: data,
        loading: false
      })
    }
    case actiontypes.UPDATE_FIELDS: {
      const { fields = [] } = action
      return Object.assign({}, state, { fields })
    }
    case actiontypes.DELETE_FIELD: {
      const { position } = action
      let { fields = [], bin = [] } = state
      const deletedItem = fields[position]
      fields = fields.slice(0)
      fields.splice(position, 1)
      return Object.assign({}, state, {
        fields,
        bin: [...bin, deletedItem]
      })
    }
    case actiontypes.RESTORE_FIELD: {
      const { position } = action
      let { fields = [], bin = [] } = state
      const recycledItem = bin[position]
      bin = bin.slice(0)
      bin.splice(position, 1)
      return Object.assign({}, state, {
        fields: [...fields, recycledItem],
        bin
      })
    }
    case actiontypes.RESET_FIELDS: {
      const { backup } = state
      return Object.assign({
        fields: backup.slice(0),
        bin: [],
        backup
      })
    }
    case actiontypes.SAVE_FIELDS_REQUEST: {
      return Object.assign({}, state, { saving: true })
    }
    case actiontypes.SAVE_FIELDS:
    case actiontypes.SAVE_FIELDS_ERROR: {
      return Object.assign({}, state, { saving: false })
    }
    default: return state
  }
}