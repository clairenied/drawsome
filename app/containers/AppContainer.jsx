import React from 'react'
import {connect, Provider} from 'react-redux'

import Navbar from '../components/Navbar'

const AppContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)

export default AppContainer