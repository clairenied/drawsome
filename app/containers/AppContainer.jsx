import React from 'react'
import {connect, Provider} from 'react-redux'

import Navbar from '../components/Navbar'
import ChatBox from '../components/ChatBox'

class AppContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showChatSidebar: false,
      openChats: {},
      activeChat: '',
    }

    this.toggleShowChatSidebar = this.toggleShowChatSidebar.bind(this)
    this.toggleShowChat = this.toggleShowChat.bind(this)
  }

  toggleShowChatSidebar(){
    let oppositeState = (!this.state.showChatSidebar)
    this.setState({ showChatSidebar: oppositeState })
  }

  toggleShowChat(friendId){
    let newState = {}
    newState[friendId] = !this.state.openChats[friendId]

    this.setState({ 
      openChats: Object.assign(this.state.openChats, newState) 
    })
  }

  closeChat(friendId){
    let newState = delete this.state.openChats[friendId]
    this.setState({
      openChats: Object.assign(this.state.openChats, newState),
      activeChat: '',
    })
  }

  openChat(friendId){
    if ( !Object.keys(this.state.openChats).includes(friendId) && Object.keys(this.state.openChats).length < 3 ){
      let friendObj = {}
      friendObj[friendId] = true

      this.setState({ 
        openChats: Object.assign(this.state.openChats, friendObj),
        activeChat: friendId,
      })   
    }
  }

  setActiveChat(friendId){
    this.setState({ activeChat: friendId })
  }

  render(){
    return (
      <div>
        <Navbar />
        { this.props.user ? 

        <div className="chatbox-pen">
          <div className="chat-box-wrapper">
            <div onClick={this.toggleShowChatSidebar} className="title">
              <span>My Contacts</span><span className="close">&mdash;</span>
            </div>
            { this.state.showChatSidebar ? 
              <div className="chat-sidebar-container-contents">
                { 
                  Object.values(this.props.friends).map((friend, i) => {
                    const friendId = friend.id
                    return <p 
                        key={i} 
                        className="online"
                        onClick={ this.openChat.bind(this, friendId) }>
                          { friend.firstName } { friend.lastName }
                      </p>
                  })
                }
              </div> 
              : 
              <div></div> }      
          </div>
          {
            Object.keys(this.state.openChats).map((friendId) => {
              return (
                <div 
                  key={friendId}
                  className="chat-box-wrapper">
                  <div className="chat-box-title">
                    <span 
                      className="title-name"
                      onClick={ this.toggleShowChat.bind(this, friendId) }>
                      { this.props.friends[friendId].firstName } { this.props.friends[friendId].lastName }
                    </span>
                    <span 
                      className="close glyphicon glyphicon-remove"
                      onClick={ this.closeChat.bind(this, friendId) }>
                    </span>
                  </div>
                  <div onClick={ this.setActiveChat.bind(this, friendId) }>
                    <ChatBox 
                      showChat={ this.state.openChats[friendId] }
                      postMessage={ this.props.postMessage }
                      friend={ friendId }
                      />
                  </div>
                </div>
              )
            })
          }
        </div> :
        <div></div>
        }
        <div className="app-container">
          {this.props.children}
        </div>
      </div>
    )   
  }
}

function mapStateToProps(state, ownProps){
  return {
    user: state.auth,
    friends: state.friends,
  }
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    postMessage: (drawingData, loggedInUser, friendUser, drawingId) => {
      return dispatch(postMessage(drawingData, loggedInUser, friendUser, drawingId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)