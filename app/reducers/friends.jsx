import axios from 'axios';
import {setAllMasterpieces} from './drawings'

const initialState = {
	drawings: []
}

const reducer = (state=initialState, action) => {
	const nextState = Object.assign({}, state);
	switch(action.type){
		case GET_FRIEND:
			nextState[action.friend.id] = action.friend
			break;
		default: 
			return state
	}
	return nextState
}


// CONSTANTS

export const GET_FRIEND = 'GET_FRIEND'
export const SET_FRIEND_DRAWINGS = 'SET_FRIEND_DRAWINGS'


// ACTION CREATORS

export const getFriend = (friend) => {
	let personDrawings = friend.drawings
	friend.drawings = []
	personDrawings.forEach(drawing => friend.drawings.push(drawing.id))
	return {
	  type: GET_FRIEND, 
	  friend
	}
}

export const getAllFriends = (allFriends) => {
	return dispatch => {
		return allFriends.forEach(friend => {
			dispatch(setAllMasterpieces(friend.drawings))
			dispatch(getFriend(friend))
		})
	}
}

export const setAllFriends = (id) => {
	return dispatch => {
		return axios.get(`/api/users/${id}/friends`)
		.then(response => {
			console.log("FRIENDS", response.data)
			dispatch(getAllFriends(response.data.friend))
		})
		.catch((err)=> console.log(err))
	}
}

// export const getUser = () => {
// 	return dispatch => {
// 		return axios.get('/api/auth/whoami')
// 		.then(res => {
// 			dispatch(setAllFriends(res.data.id))
// 		})
// 	}
// }

export default reducer