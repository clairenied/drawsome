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
import ChatboxContainer from './containers/ChatboxContainer'
import ComposeExquisiteCorpseContainer from './containers/ComposeExquisiteCorpseContainer'
import ComposeMasterpieceContainer from './containers/ComposeMasterpieceContainer'
import ProfileContainer from './containers/ProfileContainer'
import PublicGalleryContainer from './containers/PublicGalleryContainer'

const AppContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="/gallery" />
        <Route path="/gallery" component={PublicGalleryContainer} />
        <Route path="/profile" component={ProfileContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)