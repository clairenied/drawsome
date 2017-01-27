import React, { Component } from 'react';

import { Link } from 'react-router'

class ChatContacts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChatSidebar: true,
    }

    this.toggleShowChatSidebar = this.toggleShowChatSidebar.bind(this)
  }

  toggleShowChatSidebar(){
    let oppositeState = (!this.state.showChatSidebar)
    this.setState({ showChatSidebar: oppositeState })
  }

  render(){    
    return (
      <div>
        <div onClick={this.toggleShowChatSidebar} className="title">
          <span>My Contacts</span><span className="close">&mdash;</span>
        </div>
        { this.state.showChatSidebar ? 
          <div className="chat-sidebar-container-contents">
          <p><b>Danielle Katz</b></p>
          <p><b>Danielle Katz</b></p>
          <p><b>Danielle Katz</b></p>
          <p><b>Danielle Katz</b></p>
          <p><b>Danielle Katz</b></p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          </div> 
          : 
          <div></div>}      
      </div>
    )
  }
}

export default ChatContacts