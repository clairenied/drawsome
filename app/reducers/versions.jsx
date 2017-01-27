const initialState = {};

const reducer  = (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_VERSION: 
      nextState[action.version.id] = action.version;
      break;
    default: 
       return state;
  }
  return nextState
}

// CONSTANTS 

const SET_VERSION = "SET_VERSION";


// ACTION-CREATORS

export const setVersion = version => ({
    type: SET_VERSION,
    version
});


export const setAllVersions = (versions) => {
	return dispatch => {
    return versions.forEach(version => {
    	dispatch(setVersion(version));
    });
	}
}

export default reducer