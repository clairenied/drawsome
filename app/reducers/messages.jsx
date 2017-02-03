import axios from 'axios'
import { browserHistory } from 'react-router'
import socket from '../socket';
import { setMasterpiece } from './drawings'

const initialState = {}

const reducer = (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  
  switch (action.type) {
    case SET_MESSAGE:
      nextState[action.message.id] = action.message;
      break;
    default:
      return state;
  }
  return nextState;
}

const SET_MESSAGE = 'SET_MESSAGE'
const setMessage = (message) => 
  dispatch => {
    // dispatch(setUser(message.user));
    dispatch({
      type: SET_MESSAGE,
      message,
    })
  }


export const setAllMessages = (allMessages) => {
  return dispatch => {
    return allMessages.forEach(message => {
      if(message.type === 'chat'){
        dispatch(setMessage(message));
      }
    });
  }
}

export const subscribeToNewMessages = () =>
  dispatch =>
    socket.on('new-message', (message) => {
      return dispatch(setMessage(message))
    });

export const postMessage = (text, loggedInUser) => {
  return dispatch => {
    return axios.post('/api/messages', {text, loggedInUser})
  }
}

export default reducer