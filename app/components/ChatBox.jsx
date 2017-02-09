import React, { Component } from 'react';
import {connect, Provider} from 'react-redux'
import { Link } from 'react-router'
import paper from 'paper'
import axios from 'axios'
import io from '../socket'

import ActivePaperCanvas from '../components/ActivePaperCanvas'

import { getChat, postChat, subscribeToNewChats } from '../reducers/drawings'

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
    this.getVersion = this.getVersion.bind(this)
  }

  componentDidMount() {
    const friendshipId = this.props.friendship.id
    this.props.getChat(friendshipId)
    this.props.subscribeToNewChats(this.props.friendship.chat_drawing_id)
  }

  getVersion(){
    return Object.values(this.props.versions)
      .filter(version => {
        return version.drawing_id === this.props.friendship.chat_drawing_id
      })
      .reverse()[0]
  }

  onInitialize(paperScope) {
    paperScope.install(this);
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDown(event, currentPaper){
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseUp(event, currentPaper){
    const version = this.getVersion()
    this.props.postChat(currentPaper.project.exportJSON(), this.props.friendship.chat_drawing_id)
    return io.emit('new-chat', version)
  }

  onMouseDrag(event, currentPaper) {
    this.path.add(event.point);
    this.path.smooth({ type: 'continuous' })
  }
  
  getCurrentPaper(paper) {
    this.setState({currentPaper: paper}) 
  }


  clearCanvas(){
    const version = this.getVersion()
    delete version.data
    version.data = ""
    this.props.postChat("", this.props.friendship.chat_drawing_id)
    return io.emit('new-chat', version)
  }

  render(){ 
    const version = this.getVersion()
    return (
      <div> 
        <div className={ this.props.showChat ? "clear-title" : "hidden" }><a onClick={this.clearCanvas}>Clear</a></div>
        <div className={ this.props.showChat ? "chat-box-container" : "hidden" }>  
          <ActivePaperCanvas
            onInitialize={this.onInitialize}
            onMouseDown={this.onMouseDown}
            onMouseDrag={this.onMouseDrag}
            onMouseUp={this.onMouseUp}
            getCurrentPaper={this.getCurrentPaper}
            json={version.data}
            undoDraw = {this.undoDraw}
            width="200"
            height="250"
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth,
    versions: state.versions,
    friendship: Object.values(state.friendships)
      .find(friendship => {
        return friendship.follower_id === +ownProps.friendId || friendship.followee_id === +ownProps.friendId
      }),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getChat: friendshipId => dispatch(getChat(friendshipId)),
    postChat: (drawingData, drawingId) => dispatch(postChat(drawingData, drawingId)),
    subscribeToNewChats: drawing_id => dispatch(subscribeToNewChats(drawing_id))
  }
}

ChatBox.defaultProps = {
  getChat: function(){},
  postChat: function(){},
  subscribeToNewChats: function(){},
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)
