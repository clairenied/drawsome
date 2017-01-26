import axios from 'axios';
const SET_MASTERPIECE = "SET_MASTERPIECE";


export const setMasterpiece = masterpiece => ({
    type: SET_MASTERPIECE,
    masterpiece
});

const initialState = {};

const reducer  = (state = initialState, action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_MASTERPIECE: 

       return nextState[action.masterpiece.id] = action.masterpiece;
    default: 
       return state;
  }
}

export const setAllMasterpieces = (masterpieces) => {
	return dispatch => {
    return masterpieces.forEach(masterpiece => {
    	dispatch(setMasterpiece(masterpiece));
    });
	}
}


export const getMasterpieces = function(){
 return dispatch => {
  axios.get('/api/drawings/masterpieces')
    .then(masterpieces => {
      dispatch(addMasterpieces(masterpieces.data))
    })
    .catch(err => console.log(err));
 }
}

export default reducer