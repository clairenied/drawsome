import React, { Component } from 'react';
import { Link } from 'react-router'
import paper from 'paper'

import ActivePaperCanvas from '../components/ActivePaperCanvas'

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChat: true,
      paperSettings: {
        strokeWidth: 10,
        strokeCap: 'round',
        strokeJoin: 'round',
        strokeColor: 'black',
        opacity: 0.8,
      }
    }

    this.onInitialize = this.onInitialize.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseDrag = this.onMouseDrag.bind(this)
    this.toggleShowChat = this.toggleShowChat.bind(this)
  }

  onInitialize(paperScope) {
    paperScope.install(this);
    this.path = new this.Path(this.state.paperSettings);
  }

  toggleShowChat(){
    console.log('I have been clicked!')
    let oppositeState = (!this.state.showChat)
    this.setState({ showChat: oppositeState })
  }

  onMouseDown(event, currentPaper){
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDrag(event, currentPaper) {
    this.path.add(event.point);
    this.path.smooth({ type: 'continuous' })
  }

  render(){ 
    return (
      <div className="chat-box-wrapper">
        <div onClick={this.toggleShowChat} className="chat-box-title">
          <span>Danielle Katz</span><span className="close glyphicon glyphicon-remove"></span>
        </div>
        <div>     
          <div className={ this.state.showChat ? "chat-box-container" : "hidden" }>   
            <ActivePaperCanvas
              onInitialize={this.onInitialize}
              onMouseDown={this.onMouseDown}
              onMouseDrag={this.onMouseDrag}
              width="200"
              height="250"
              />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatBox