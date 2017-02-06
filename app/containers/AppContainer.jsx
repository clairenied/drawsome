import React from 'react'
import {connect, Provider} from 'react-redux'

import Navbar from '../components/Navbar'
import ChatBox from '../components/ChatBox'
import { subscribeToNewChats } from '../reducers/drawings'

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
    this.getFriends = this.getFriends.bind(this)
  }

  componentDidMount() {
    this.props.subscribeToNewChats()
  }

  toggleShowChatSidebar(){
    let oppositeState = (!this.state.showChatSidebar)
    this.setState({ showChatSidebar: oppositeState })
  }

  toggleShowChat(userId){
    let newState = {}
    newState[userId] = !this.state.openChats[userId]

    this.setState({ 
      openChats: Object.assign(this.state.openChats, newState) 
    })
  }

  closeChat(userId){
    let newState = delete this.state.openChats[userId]
    this.setState({
      openChats: Object.assign(this.state.openChats, newState),
      activeChat: '',
    })
  }

  openChat(userId){
    if ( !Object.keys(this.state.openChats).includes(userId) && Object.keys(this.state.openChats).length < 3 ){
      let friendObj = {}
      friendObj[userId] = true

      this.setState({ 
        openChats: Object.assign(this.state.openChats, friendObj),
        activeChat: userId,
      })   
    }
  }

  getFriends(){
    return Object.values(this.props.friendships).map(friendship => {
      if (this.props.user.id !== friendship.follower_id) { return friendship.follower_id }
      else { return friendship.followee_id }
    })
  }

  setActiveChat(userId){
    this.setState({ activeChat: userId })
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
                  this.getFriends().map(friendId => {
                    console.log('FRIEEEEEND', friendId)
                    const friend = this.props.users[friendId]
                    return <p
                      key={friendId}
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
            Object.keys(this.state.openChats).map((userId) => {
              return (
                <div 
                  key={userId}
                  className="chat-box-wrapper">
                  <div className="chat-box-title">
                    <span 
                      className="title-name"
                      onClick={ this.toggleShowChat.bind(this, userId) }>
                      { this.props.users[userId].firstName } { this.props.users[userId].lastName }
                    </span>
                    <span 
                      className="close glyphicon glyphicon-remove"
                      onClick={ this.closeChat.bind(this, userId) }>
                    </span>
                  </div>
                  <div onClick={ this.setActiveChat.bind(this, userId) }>
                    <ChatBox 
                      showChat={ this.state.openChats[userId] }
                      postMessage={ this.props.postMessage }
                      friendId={ userId }
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

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth,
    users: state.users,
    friendships: state.friendships
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    subscribeToNewChats: () => dispatch(subscribeToNewChats()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)