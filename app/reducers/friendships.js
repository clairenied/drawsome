import axios from 'axios';
import { setAllMasterpieces } from './drawings'
import { setAllVersions } from './versions'
import { receiveUser } from './users'

const transformFriendship = friendObj => {
  delete friendObj.follower
  delete friendObj.followee
  return friendObj
}

const initialState = {}

const reducer = (state=initialState, action) => {
  const nextState = Object.assign({}, state);
  switch(action.type){
    case ADD_FRIENDSHIP:
      nextState[action.friendship.id] = action.friendship
      break;
    default: 
      return state
  }
  return nextState
}

export const ADD_FRIENDSHIP = 'ADD_FRIENDSHIP'
export const receiveFriendship = friendship => {
  return {
    type: 'ADD_FRIENDSHIP',
    friendship: transformFriendship(friendship),
  }
}

export const receiveFriendships = friendships => {
  return dispatch => {
    return friendships.forEach(friendship => {
      if(friendship.follower) {
        dispatch(receiveUser(friendship.follower));
      } else if(friendship.followee) {
        dispatch(receiveUser(friendship.followee));
      }
      return dispatch(receiveFriendship(friendship))
    })
  }
}

export const getFriendships = () =>
  dispatch =>
    axios.get('/api/friendships')
      .then(res => {
        return res.data
      })
      .then(friendships => dispatch(receiveFriendships(friendships)));

export default reducer