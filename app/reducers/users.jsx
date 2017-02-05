import axios from 'axios';
import { setAllMasterpieces } from './drawings'
import { receiveVersions } from './versions'
import { receiveDrawings } from './drawings'

const transformUser = userObj => {
	if(userObj.drawings){
		const userDrawingsArr = userObj.drawings.map(drawing => {
			return drawing.id
		})

		userObj.drawings = userDrawingsArr		
	}
	return userObj
}

const initialState = {}

const reducer = (state=initialState, action) => {
	const nextState = Object.assign({}, state);
	switch(action.type){
		case ADD_USER:
			nextState[action.user.id] = action.user
			break;
		case REMOVE_USER:
			delete nextState[action.user.id]
		default: 
			return state
	}
	return nextState
}

export const ADD_USER = 'ADD_USER'
export const receiveUser = user =>
	dispatch => {
		if(user.drawings){
			dispatch(receiveDrawings(user.drawings))
		}
		return dispatch({
			type: ADD_USER,
			user: transformUser(user),
		})
	}

export const REMOVE_USER = 'REMOVE_USER'
export const removeUserFromStore = user => 
	dispatch => {
		return dispatch({
			type: REMOVE_USER,
			user,
		})
	}



export const getUser = id => {
	return dispatch => {
		return axios.get(`/api/profile/${id}`)
			.then(response => {
				if(true){
					dispatch(receiveUser(response.data))
				}
			})
			.catch( err => console.log(err) )
		}
	}

export const addFriend = id => {
	return dispatch => {
		return axios.post('/api/friendships/', { id })
		.then(res => {
			if(res) dispatch(receiveUser(res.data))
		})
		.catch( err => console.log(err) )
	}
}

export const removeFriend = id => {
	return dispatch => {
		return axios.delete('/api/friendships/', { id })
		.then(res => {
			if(res) dispatch(removeUserFromStore(res.data))
		})
		.catch( err => console.log(err) )
	}
}

export default reducer