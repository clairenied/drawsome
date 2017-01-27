import React from 'react'
import {connect, Provider} from 'react-redux'

import Navbar from '../components/Navbar'
import ChatContacts from '../components/ChatContacts'
import ChatBox from '../components/ChatBox'

const AppContainer = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />
      <ChatContacts />
      <div className="chatbox-pen">
        <ChatBox />
        <ChatBox />
        <ChatBox />
      </div>
      <div className="app-container">
        {children}
      </div>
    </div>
)

export default AppContainer