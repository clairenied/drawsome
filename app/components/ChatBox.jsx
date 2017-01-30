import React, { Component } from 'react';
import { Link } from 'react-router'

import paper from 'paper'

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChat: false,
      path: {},
      paperSettings: {
        strokeWidth: 10,
        strokeCap: 'round',
        strokeJoin: 'round',
        strokeColor: 'black',
        opacity: 0.8,
      }
    }

    this.toggleShowChat = this.toggleShowChat.bind(this)
  }

  componentDidMount() {
    console.log(this.state)
    let path 

    paper.setup(this.canvas)
    
    paper.view.onMouseDown = (event) => {
      console.log('i happen')
      path = new paper.Path(this.state.paperSettings);
    }

    paper.view.onMouseDrag = (event) => {
      path.add(event.point);
    }
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
              <canvas width="200" height="250" ref={(elem) => this.canvas = elem}></canvas>
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