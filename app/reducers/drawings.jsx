import axios from 'axios';
import { receiveVersion, receiveVersions } from './versions'
import { browserHistory } from 'react-router'

const transformDrawing = drawingObj => {
  if(drawingObj.versions) {
    const versionsArr = drawingObj.versions.map(version => {
      return version.id
    })
    
    drawingObj.versions = versionsArr
    delete drawingObj.version
  }
  return drawingObj
}

const initialState = {};

const reducer  = (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case ADD_DRAWING: 
      nextState[action.drawing.id] = action.drawing;
      break;
    default: 
       return state;
  }
  return nextState
}

const ADD_DRAWING = "ADD_DRAWING";
export const receiveDrawing = drawing => {
  return {
    type: 'ADD_DRAWING',
    drawing: transformDrawing(drawing)
  }
}

export const receiveDrawings = drawings => {
	return dispatch => {
    return drawings.forEach(drawing => {
      dispatch(receiveVersions(drawing.versions));
      dispatch(receiveDrawing(drawing));
    });
	}
}

export const createMasterpieceDraft = (userId, name, json, canEdit, priv) => {
  return dispatch => {
    axios.post('/api/drawings/', {userId, name, json, canEdit, priv})
    .then(drawing => {
      dispatch(receiveVersions(drawing.data.versions))
      dispatch(receiveDrawing(drawing.data))
      browserHistory.push(`/edit-masterpiece/${drawing.data.id}`)
    })
    .catch(err => console.log('there was an error saving the masterpiece', err))
  }
}

export const postMasterpieceDraft = (userId, name, json, canEdit, priv) => {
  return dispatch => {
    axios.post('/api/drawings/', {userId, name, json, canEdit, priv})
    .then(drawing => {
      dispatch(receiveVersions(drawing.data.versions))
      dispatch(receiveDrawing(drawing.data))
      browserHistory.push(`/gallery`)
    })
    .catch(err => console.log('there was an error posting the masterpiece', err))
  }
}

export const saveNewMasterpieceDraft = (id, userId, json) => {
  return dispatch => {
    axios.post(`/api/drawings/${id}`, {userId, json})
    .then(drawing => {
      dispatch(receiveVersions(drawing.data.versions))
      dispatch(receiveDrawing(drawing.data))
      browserHistory.push(`/edit-masterpiece/${drawing.data.id}`)
    })
    .catch(err => console.log('there was an error saving the masterpiece', err))
  }
}

export const postMasterpieceFromDraft = (id, userId, json, canEdit) => {
  return dispatch => {
    axios.put(`/api/drawings/${id}`, {userId, json, canEdit})
    .then(drawing => {
      dispatch(receiveVersions(drawing.data.versions))
      dispatch(receiveDrawing(drawing.data))
      browserHistory.push(`/gallery`)
    })
    .catch(err => console.log('there was an error saving the masterpiece', err))
  }
}


export const getMasterpieceDraft = (id) => {
  return dispatch => {
    return axios.get(`/api/drawings/${id}`)
    .then(drawing => {
      dispatch(setSelectedVersion(drawing.data))
      dispatch(setSelectedMasterpiece(drawing.data.drawing_id))
    })
  }
}

export const getChat = (friendId) => {
  return dispatch => {
    return axios.get(`/api/messages/${friendId}`)
    .then(chatDrawing => {
      console.log('CHAT DRAWING', chatDrawing.data)
      dispatch(receiveVersion(chatDrawing.data))
    })
  }
}

export default reducer