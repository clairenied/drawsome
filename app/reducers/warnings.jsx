
const initialState = {
	loginError: false,
	signinError: false
}

const reducer = (state=initialState, action) => {
	const newState = Object.assign({}, state)
	switch(action.type) {
		case LOGIN_ISSUE:
			newState.loginError = action.loginError
			break;
		case SIGNIN_ISSUE:
			newState.signinError = action.signinError
			break;
		default:
			return state;
	}
	return newState
}


// CONSTANTS

const LOGIN_ISSUE = 'LOGIN_ISSUE';
const SIGNIN_ISSUE = 'SIGNIN_ISSUE';


// ACTION-CREATORS

export const loginIssue = () => ({
  type: LOGIN_ISSUE, 
  loginError: true
})

export const signinIssue = () => ({
  type: SIGNIN_ISSUE, 
  signinError: true
})

export default reducer;