import { receiveDrawing } from './drawings'
const initialState = {};

const transformVersion = versionObj => {
  if(versionObj.drawing) {
    delete versionObj.drawing
  }
  return versionObj
}

const reducer  = (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case ADD_VERSION: 
      nextState[action.version.id] = action.version;
      break;
    default: 
       return state;
  }
  return nextState
}

const ADD_VERSION = "ADD_VERSION"
export const receiveVersion = version => 
  dispatch => {
    if (version.drawing) dispatch(receiveDrawing(version.drawing))
    return dispatch ({
      type: ADD_VERSION,
      version: transformVersion(version)
    })
  }

export const receiveVersions = versions => {
	return dispatch => {
    if (versions) {
      return versions.forEach(version => {
    	dispatch(receiveVersion(version));
      }) 
    }
	}
}

export default reducer