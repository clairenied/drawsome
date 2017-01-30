import axios from 'axios'
import {setAllMasterpieces} from './drawings'
const SET_PROFILE = "SET_PROFILE";


const initialState = {}

const reducer = (state=initialState, action) => {
	const nextState = Object.assign({}, state);
	switch(action.type){
		case SET_PROFILE:
			nextState[action.profile.id] = action.profile
			break;
		default: 
			return state
	}
	return nextState
}


export const setProfile = (profile) => {
	let personDrawings = profile.drawings
	profile.drawings = []
	personDrawings.forEach(drawing => profile.drawings.push(drawing.id))
	let personVersions = profile.versions 
	profile.versions = []
	personVersions.forEach(version => profile.versions.push(version.id))
	return {
	  type: GET_PROFILE, 
	  profile
	}
}

export const getProfile = (id) => {
	return dispatch => {
		return axios.get(`/api/profile/${id}`)
		.then(response => {
			if(response.data.drawings){
				dispatch(setProfile(response.data))
			}
		})
		.catch((err)=> console.log(err))
	}
}

export default reducer