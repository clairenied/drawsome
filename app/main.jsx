'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

//components
import Login from './components/Login'
import Signup from './components/Signup'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'

//containers
import AppContainer from './containers/AppContainer'
import ComposeExquisiteCorpseContainer from './containers/ComposeExquisiteCorpseContainer'
import ComposeMasterpieceContainer from './containers/ComposeMasterpieceContainer'
import ProfileContainer from './containers/ProfileContainer'
import PublicGalleryContainer from './containers/PublicGalleryContainer'
import SingleMasterpieceViewContainer from './containers/SingleMasterpieceViewContainer'
import MasterpieceContainer from './containers/MasterpieceContainer'
import EditMasterpieceDraft from './containers/EditMasterpieceDraft'
// import {setSelectedMasterpiece} from './reducers/selected.jsx'
import {getMasterpieceDraft} from './reducers/drawings.jsx'

const loadProfileOnEnter = function (nextRouterState) {
  const profileId = nextRouterState.params.id;
  store.dispatch(getArtistById(profileId));
};

// const setSelectedMasterpieceOnEnter = function(nextRouterState){
//   const masterpieceId = Number(nextRouterState.params.id);
  // store.dispatch(getMasterpieceDraft(masterpieceId))
  // store.dispatch(setSelectedMasterpiece(masterpieceId))
// }

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/gallery" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/gallery" component={PublicGalleryContainer} />
        <Route path="/masterpiece" component={SingleMasterpieceViewContainer} />
        <Route path="/profile/:id" component={ProfileContainer} onEnter={loadProfileOnEnter}/>
        <Route path="/create-masterpiece" component={MasterpieceContainer}/>
        <Route path="/edit-masterpiece/:id" component={EditMasterpieceDraft} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)