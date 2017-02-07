import axios from 'axios';
import { receiveVersion, receiveVersions } from './versions'
import { browserHistory } from 'react-router'
import io from '../socket'

const transformDrawing = drawingObj => {
  if(drawingObj.versions) {
    const versionsArr = drawingObj.versions.map(version => {
      return version.id
    })
    drawingObj.versions = versionsArr
  } else {
    drawingObj.versions = []
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
    case REMOVE_DRAWING:
      delete nextState[action.drawing.id]
      break;
    case REMOVE_DRAWING_ID:
      delete nextState[action.drawing]
      break;
    default:
       return state;
  }
  return nextState
}

export const REMOVE_DRAWING = 'REMOVE_DRAWING'
export const REMOVE_DRAWING_ID = 'REMOVE_DRAWING_ID'
export const removeDrawingsFromStore = drawings => 
  dispatch => {
    drawings.forEach(drawing => {
      if(!drawing.id) {
        return dispatch({
          type: REMOVE_DRAWING_ID,
          drawing,
        }) 
      }
      return dispatch({
        type: REMOVE_DRAWING,
        drawing,
      })  
    })
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
      if (drawing.versions) dispatch(receiveVersions(drawing.versions));
      dispatch(receiveDrawing(drawing));
    });
  }
}

export const getDrawings = () =>
  dispatch =>
    axios.get('/api/drawings')
      .then(res => {
        return res.data
      })
      .then(drawings => dispatch(receiveDrawings(drawings)));


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

export const postComment = (userId, masterpiece, profileId, json, canEdit, priv) => {
  return dispatch => {
    axios.post('/api/drawings/comment', {userId, masterpiece, json, canEdit, priv})
    .then(drawing => {
      console.log("DRAWING?????", drawing)
      dispatch(receiveVersions(drawing.data.versions))
      dispatch(receiveDrawing(drawing.data))
      browserHistory.push(`/profile/${profileId}`)
    })
    .catch(err => console.log('there was an error posting the comment', err))
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
    .then(res => {
      dispatch(receiveVersion(res.data))
    })
  }
}

export const postChat = (drawingData, drawingId) => {
  return dispatch => {
    return axios.post('/api/messages', { drawingData, drawingId })
    .then(res => {
      dispatch(receiveVersion(res.data))
    })
  }
}

export const subscribeToNewChats = (drawing_id) => {
  return dispatch =>
    io.on('new-chat', version => {
      if(version.drawing_id === drawing_id) {
        return dispatch(receiveVersion(version))
      }
    })
}

export default reducer
