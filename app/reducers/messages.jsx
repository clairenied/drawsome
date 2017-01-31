import axios from 'axios'
import { browserHistory } from 'react-router'

// import { setUser } from './users';
// import socket from '../socket';


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
    delete message.user;
    dispatch({
      type: SET_MESSAGE,
      message,
    })
  }


export const setAllMessages = (allMessages) => {
  return dispatch => {
    return allMessages.forEach(message => {
      dispatch(setMessage(message));
    });
  }
}

export const subscribeToNewMessages = () =>
  dispatch =>
    socket.on('new-message', (message) => {
      return dispatch(setMessage(message))
    });

export const getAllMessages = () => {
  return dispatch => {
    return axios.get('/api/messages')
    .then(res => dispatch(setAllMessages(res.data)))
  }
}

export const postMessage = (text, loggedInUser) => {
  return dispatch => {
    return axios.post('/api/messages', {text, loggedInUser})
  }
}

export default reducer