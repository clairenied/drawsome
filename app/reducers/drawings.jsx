import axios from 'axios';
import {setAllVersions} from './versions'
import {browserHistory} from 'react-router'

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

//CONSTANTS

const SET_MASTERPIECE = "SET_MASTERPIECE";


//ACTION CREATORS

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
      dispatch(setAllVersions(masterpiece.versions));
      dispatch(setMasterpiece(masterpiece));
    });
	}
}

export const createMasterpieceDraft = (userId, name, json) => {
  return dispatch => {
    axios.post('/api/drawings/', {userId, name, json})
    .then(drawing => {
      dispatch(setMasterpiece(drawing.data))
      browserHistory.push(`/edit-masterpiece/${drawing.data.id}`)
    })
    .catch(err => console.log('there was an error saving the masterpiece', err))
  }
}

export const saveNewMasterpieceDraft = (id) => {
  return dispatch => {
    axios.post(`/api/drawings/${id}`, {})
  }
}

export const getMasterpieceDraft = (id) => {
  return dispatch => {
    axios.get(`/api/drawings/${id}`)
    .then(drawing => console.log(drawing.data))
  }
}


export default reducer