import React from 'react'
import {connect, Provider} from 'react-redux'

import Navbar from '../components/Navbar'
import ChatContacts from '../components/ChatContacts'
import ChatBox from '../components/ChatBox'

const AppContainer = connect(
  ({ auth, users }) => ({ user: auth, users: users })
) (
  ({ user, users, children }) =>
    <div>
      <Navbar />
      <div className="chatbox-pen">
        <ChatContacts />
        <ChatBox key="1"/>
        <ChatBox key="2"/>
        <ChatBox key="3"/>
      </div>
      <div className="app-container">
        {children}
      </div>
    </div>
)

export default AppContainer