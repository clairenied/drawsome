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
    let path 

    paper.setup(this.canvas)
    
    paper.view.onMouseDown = (event) => {
      console.log('i happen')
      path = new paper.Path(this.state.paperSettings);
    }

    paper.view.onMouseDrag = (event) => {
      console.log('drag happens')
      path.add(event.point);
    }
  }

  toggleShowChat(){
    let oppositeState = (!this.state.showChat)
    this.setState({ showChat: oppositeState })
  }

  render(){    
    return (
      <div className="chat-box-wrapper">
        <div onClick={this.toggleShowChat} className="chat-box-title">
          <span>Danielle Katz</span><span className="close glyphicon glyphicon-remove"></span>
        </div>
        { this.state.showChat ? 
          <div>
            <div className="chat-box-container">
              <canvas width="200" height="250" ref={(elem) => this.canvas = elem}></canvas>
            </div>
          </div>
          : 
          <div></div> 
        }      
      </div>
    )
  }
}

export default ChatBox