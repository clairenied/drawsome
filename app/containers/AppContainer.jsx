import React from 'react'
import {connect, Provider} from 'react-redux'

import Navbar from '../components/Navbar'

const AppContainer = connect(
  ({ auth, users }) => ({ user: auth, users: users })
) (
  ({ user, users, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)

export default AppContainer