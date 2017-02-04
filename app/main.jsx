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
import ProfileContainer from './containers/ProfileContainer'
import PublicGalleryContainer from './containers/PublicGalleryContainer'
import SingleMasterpieceViewContainer from './containers/SingleMasterpieceViewContainer'
import MasterpieceContainer from './containers/MasterpieceContainer'
import EditMasterpieceDraft from './containers/EditMasterpieceDraft'
import DraftContainer from './containers/DraftContainer'

// import {setSelectedMasterpiece} from './reducers/selected.jsx'
import {getMasterpieceDraft} from './reducers/drawings.jsx'
import {getProfile} from './reducers/profile.jsx'
import { subscribeToNewMessages } from './reducers/messages.jsx'
import {whoami} from './reducers/auth'

const loadProfileOnEnter = function (nextRouterState) {
  const profileId = nextRouterState.params.id;
  store.dispatch(getProfile(profileId));
  // store.dispatch(subscribeToNewMessages())
};

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/gallery" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/gallery" component={PublicGalleryContainer}/>
        <Route path="/masterpiece" component={SingleMasterpieceViewContainer} />
        <Route path="/profile/:id" component={ProfileContainer} onEnter={loadProfileOnEnter}/>
        <Route path="/create-masterpiece" component={MasterpieceContainer}/>
        <Route path="/edit-masterpiece/:id" component={EditMasterpieceDraft} />
        <Route path="/drafts" component={DraftContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
