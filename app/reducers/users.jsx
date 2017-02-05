import axios from 'axios';
import { setAllMasterpieces } from './drawings'
import { receiveVersions } from './versions'
import { receiveDrawing } from './drawings'

const transformUser = userObj => {
	if(userObj.versions){
		const userVersionsArr = userObj.versions.map(version => {
			return version.id
		})

		const userDrawingsArr = userObj.versions.map(version => {
			return version.drawing_id
		})

		userObj.versions = userVersionsArr
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
		default: 
			return state
	}
	return nextState
}

export const ADD_USER = 'ADD_USER'
export const receiveUser = user =>
	dispatch => {
		return dispatch({
			type: ADD_USER,
			user: transformUser(user),
		})
	}


export default reducer