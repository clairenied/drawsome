import React from 'react'
import {connect, Provider} from 'react-redux'

import Navbar from '../components/Navbar'
import ChatContacts from '../components/ChatContacts'

const AppContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />
      <ChatContacts />
      {children}
    </div>
)

export default AppContainer