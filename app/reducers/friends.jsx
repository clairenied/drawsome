import axios from 'axios'

const reducer = (state={}, action) => {
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


// ACTION CREATORS

export const getFriend = (friend) => {
	return {
	  type: GET_FRIEND, 
	  friend
	}
}

export const getAllFriends = (allFriends) => {
	return dispatch => {
		return allFriends.forEach(friend => {
			dispatch(getFriend(friend))
		})
	}
}

export const setAllFriends = (id) => {
	return dispatch => {
		return axios.get(`/api/users/${id}/friends`)
		.then(response => {
			console.log(response.data)
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