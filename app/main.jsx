'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

//components
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Navbar from './components/Navbar'

//containers
import AppContainer from './containers/AppContainer'
import ComposeExquisiteCorpseContainer from './containers/ComposeExquisiteCorpseContainer'
import ComposeMasterpieceContainer from './containers/ComposeMasterpieceContainer'
import ProfileContainer from './containers/ProfileContainer'
import PublicGalleryContainer from './containers/PublicGalleryContainer'
import SingleMasterpieceViewContainer from './containers/SingleMasterpieceViewContainer'
import ChatPageContainer from './containers/ChatPageContainer'
import MasterpieceContainer from './containers/MasterpieceContainer'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/gallery" />
        <Route path="/gallery" component={PublicGalleryContainer} />
        <Route path="/masterpiece" component={SingleMasterpieceViewContainer} />
        <Route path="/profile" component={ProfileContainer} />
        <Route path="/chat" component={ChatPageContainer}/>
        <Route path="/create-masterpiece" component={MasterpieceContainer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)