import axios from 'axios';
import { setAllMasterpieces } from './drawings'
import { setAllVersions } from './versions'
import { receiveUser } from './users'

const transformFriendship = friendObj => {
  if(friendObj.follower){
    delete friendObj.follower  
  }
  if(friendObj.followee){
    delete friendObj.followee
  }
  return friendObj
}

const initialState = {}

const reducer = (state=initialState, action) => {
  const nextState = Object.assign({}, state);
  switch(action.type){
    case ADD_FRIENDSHIP:
      nextState[action.friendship.id] = action.friendship
      break;
    case DELETE_FRIENDSHIP:
      delete nextState[action.friendship.id]
      break;
    default: 
      return state
  }
  return nextState
}

export const ADD_FRIENDSHIP = 'ADD_FRIENDSHIP'
export const receiveFriendship = friendship => {
  console.log('GETTING TO RECEIVE F')
  return {
    type: 'ADD_FRIENDSHIP',
    friendship: transformFriendship(friendship),
  }
}

export const DELETE_FRIENDSHIP = 'DELETE_FRIENDSHIP'
export const deleteFriendship = friendship => {
  return {
    type: 'DELETE_FRIENDSHIP',
    friendship,
  }
}


export const receiveFriendships = friendships => {
  return dispatch => {
    return friendships.forEach(friendship => {
      if(friendship.follower) {
        dispatch(receiveUser(friendship.follower));
      }
      if(friendship.followee) {
        dispatch(receiveUser(friendship.followee));
      }
      return dispatch(receiveFriendship(friendship))
    })
  }
}

export const getFriendships = () =>
  dispatch =>
    axios.get('/api/friendships')
      .then(friendships => {
        dispatch(receiveFriendships(friendships.data))
      });

export default reducer
