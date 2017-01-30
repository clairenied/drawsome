import axios from 'axios';
import {setAllVersions} from './versions'
const SET_MASTERPIECE = "SET_MASTERPIECE";

const initialState = {};

const reducer  = (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_MASTERPIECE: 
      nextState[action.masterpiece.id] = action.masterpiece;
      break;
    default: 
       return state;
  }
  return nextState
}

export const setMasterpiece = masterpiece => {
  let drawingVersions = masterpiece.versions 
  masterpiece.versions = []
  drawingVersions.forEach(version => masterpiece.versions.push(version.id))
  return {
    type: SET_MASTERPIECE,
    masterpiece
  }
};


export const setAllMasterpieces = (masterpieces) => {
	return dispatch => {
    return masterpieces.forEach(masterpiece => {
    	dispatch(setMasterpiece(masterpiece));
    });
	}
}




export default reducer