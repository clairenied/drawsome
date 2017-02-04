import React, { Component } from 'react';
import {connect, Provider} from 'react-redux'
import { Link } from 'react-router'
import paper from 'paper'

import ActivePaperCanvas from '../components/ActivePaperCanvas'

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChat: false,
      currentPaper: null,
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
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseDrag = this.onMouseDrag.bind(this)
    this.getCurrentPaper = this.getCurrentPaper.bind(this)
    this.clearCanvas= this.clearCanvas.bind(this)
    this.undoDraw = this.undoDraw.bind(this)
  }

  onInitialize(paperScope) {
    paperScope.install(this);
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDown(event, currentPaper){
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseUp(event, currentPaper){
    console.log(this.props.postMessage)
    this.props.postMessage(this.state.currentPaper.project.exportJSON(), this.props.user.id, this.props.friend)
  }

  onMouseDrag(event, currentPaper) {
    this.path.add(event.point);
    this.path.smooth({ type: 'continuous' })
  }
  
  getCurrentPaper(paper) {
    this.setState({currentPaper: paper}) 
  }

  clearCanvas(){
    return new Promise((resolve, reject) => resolve(this.state.currentPaper.project.clear())
      .then(()=> this.getCurrentPaper(paper))
    )
  }

  undoDraw(){
    let children = this.state.currentPaper.project.activeLayer.children
    return new Promise((resolve, reject) => resolve(this.state.currentPaper.project.activeLayer.lastChild.remove())
      .then(()=> {
        this.getCurrentPaper(paper)
      })
    )
  }


  render(){ 
    return (
      <div>     
        <div className={ this.props.showChat ? "chat-box-container" : "hidden" }>   
          <ActivePaperCanvas
            onInitialize={this.onInitialize}
            onMouseDown={this.onMouseDown}
            onMouseDrag={this.onMouseDrag}
            onMouseUp={this.onMouseUp}
            getCurrentPaper={this.getCurrentPaper}
            clearCanvas={this.clearCanvas}
            undoDraw = {this.undoDraw}
            width="200"
            height="250"
            />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    friends: state.friends,
    user: state.auth,
  }
}

ChatBox.defaultProps = {
  friend: '',
  postMessage: function(){},
}

export default connect(mapStateToProps)(ChatBox)
