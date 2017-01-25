import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  warnings: require('./warnings.jsx').default
})

export default rootReducer
