// const reducer  = (state = {}, action) => {
//   const nextState = Object.assign({}, state);
//   switch (action.type) {
//     case SET_SELECTED_MASTERPIECE: 
//       nextState.masterpiece = action.masterpiece
//       break;
//     case SET_SELECTED_VERSION:
//     	nextState.version = action.version
//       break;
//     default: 
//        return state;
//   }
//   return nextState
// }

// //CONSTANTS

// const SET_SELECTED_MASTERPIECE = "SET_SELECTED_MASTERPIECE";
// const SET_SELECTED_VERSION = "SET_SELECTED_VERSION"

// //ACTION CREATORS

// export const setSelectedMasterpiece = masterpiece => {
//   return {
//     type: SET_SELECTED_MASTERPIECE,
//     masterpiece
//   }
// };

// export const setSelectedVersion = version => {
//   return {
//     type: SET_SELECTED_VERSION,
//     version
//   }
// };

// export default reducer