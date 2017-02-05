import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default, 
  warnings: require('./warnings.jsx').default,
  users: require('./users.jsx').default,
  friendships: require('./friendships').default,
  drawings: require('./drawings.jsx').default,
  versions: require('./versions.jsx').default,
})

export default rootReducer
