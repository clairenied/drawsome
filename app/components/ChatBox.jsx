import React, { Component } from 'react';
import { Link } from 'react-router'
import paper from 'paper'

import ActivePaperCanvas from '../components/ActivePaperCanvas'

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChat: false,
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
    this.getCurrentPaper = this.getCurrentPaper.bind(this)
  }

  onInitialize(paperScope) {
    paperScope.install(this);
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDown(event, currentPaper){
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDrag(event, currentPaper) {
    this.path.add(event.point);
    this.path.smooth({ type: 'continuous' })
  }
  
  getCurrentPaper(paper) {
    this.setState({currentPaper: paper}) 
  }

  render(){ 
    return (
      <div>     
        <div className={ this.props.showChat ? "chat-box-container" : "hidden" }>   
          <ActivePaperCanvas
            onInitialize={this.onInitialize}
            onMouseDown={this.onMouseDown}
            onMouseDrag={this.onMouseDrag}
            getCurrentPaper={this.getCurrentPaper}
            width="200"
            height="250"
            />
        </div>
      </div>
    )
  }
}

export default ChatBox