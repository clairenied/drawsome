import axios from 'axios'
import { browserHistory } from 'react-router'
import socket from '../socket';

const initialState = {}

const transformMessage = (message) => {
  // message.users = message.users.map(user => user.id)
  // message.versions = message.versions[0].id
  return message
}

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
const setMessage = (message) => {
  console.log('MY MESSAGE', message)
  return {
    type: SET_MESSAGE,
    message: transformMessage(message),
  }
}


export const setAllMessages = (allMessages) => {
  return dispatch => {
    return allMessages.forEach(message => {
      dispatch(setMessage(message));
    })
  }
}

export const subscribeToNewMessages = () => {
  console.log('SUBSCRIBED TO NEW MESSAGES')
  return dispatch => {
    socket.on('new-message', (message) => {
      console.log('NEW MESSAGE', message)
      dispatch(setMessage(message))
    })    
  }
}

export const setAllServerMessages = () => {
  return dispatch => {
    return axios.get('/api/messages')
    .then(res => dispatch(setAllMessages(res.data)))
  }
}

export const postMessage = (drawingData, loggedInUser, friendUser, drawingId) => {
  console.log('I have been posted!', loggedInUser, friendUser, drawingId)
  return dispatch => {
    return axios.post('/api/messages', { drawingData, loggedInUser, friendUser, drawingId })
  }
}

export default reducer