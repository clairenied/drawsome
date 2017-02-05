import React, { Component } from 'react';
import {connect, Provider} from 'react-redux'
import { Link } from 'react-router'
import paper from 'paper'
import axios from 'axios'

import ActivePaperCanvas from '../components/ActivePaperCanvas'

import { getChat } from '../reducers/drawings'

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
  }

  componentDidMount() {
    const friendshipId = this.props.friendship.id
    this.props.getChat(friendshipId)
  }

  onInitialize(paperScope) {
    paperScope.install(this);
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDown(event, currentPaper){
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseUp(event, currentPaper){
    axios.post('/api/messages', { 
      drawingData: this.state.currentPaper.project.exportJSON(),
      drawingId: this.props.friendship.chat_drawing_id,
    })
  }

  onMouseDrag(event, currentPaper) {
    this.path.add(event.point);
    this.path.smooth({ type: 'continuous' })
  }
  
  getCurrentPaper(paper) {
    this.setState({currentPaper: paper}) 
  }

  render(){ 
    const version = Object.values(this.props.versions).find(version => {
      return version.drawing_id === this.props.friendship.chat_drawing_id
    })

    console.log('VERSION', version)
    return (
      <div>     
        <div className={ this.props.showChat ? "chat-box-container" : "hidden" }>   
          <ActivePaperCanvas
            onInitialize={this.onInitialize}
            onMouseDown={this.onMouseDown}
            onMouseDrag={this.onMouseDrag}
            onMouseUp={this.onMouseUp}
            getCurrentPaper={this.getCurrentPaper}
            json={version.data}
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
    drawings: state.drawings,
    versions: state.versions,
    friendship: Object.values(state.friendships)
      .find(friendship => {
        return friendship.follower_id === +ownProps.friendId || friendship.followee_id === +ownProps.friendId
      }),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getChat: friendshipId => dispatch(getChat(friendshipId))
  }
}

ChatBox.defaultProps = {
  getChat: function(){},
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox)
