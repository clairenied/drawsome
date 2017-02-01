import axios from 'axios'
import {setAllMasterpieces} from './drawings'
const SET_PROFILE = "SET_PROFILE";


const initialState = {}

const reducer = (state=initialState, action) => {
	const nextState = Object.assign({}, state);
	switch(action.type){
		case SET_PROFILE:
			Object.assign(nextState, action.profile)
			break;
		default: 
			return state
	}
	return nextState
}


export const setProfile = (profile) => {
	return {
	  type: SET_PROFILE, 
	  profile
	}
}

export const getProfile = (id) => {
	return dispatch => {
		return axios.get(`/api/profile/${id}`)
		.then(response => {
			if(true){
				console.log("RESPONSE", response)
				dispatch(setProfile(response.data))
			}
		})
		.catch((err)=> console.log(err))
	}
}

export default reducer