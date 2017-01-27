import React, { Component } from 'react';

import { Link } from 'react-router'

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChat: true,
    }

    this.toggleShowChat = this.toggleShowChat.bind(this)
  }

  toggleShowChat(){
    let oppositeState = (!this.state.showChat)
    this.setState({ showChat: oppositeState })
  }

  render(){    
    return (
      <span className="chat-box-wrapper">
        <div onClick={this.toggleShowChat} className="chat-box-title">
          <span>Danielle Katz</span><span className="close glyphicon glyphicon-remove"></span>
        </div>
        { this.state.showChat ? 
          <span>
            <div className="chat-box-container">
            </div>
          </span> 
          : 
          <span></span> 
        }      
      </span>
    )
  }
}

export default ChatBox