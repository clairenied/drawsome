import React from 'react'
import {connect, Provider} from 'react-redux'

import Navbar from '../components/Navbar'
import ChatBox from '../components/ChatBox'

class AppContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showChatSidebar: false,
      openMessages: {},
      activeMessage: '',
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
    newState[friendId] = !this.state.openMessages[friendId]

    this.setState({ 
      openMessages: Object.assign(newState, this.state.openMessages) 
    })
  }

  closeChat(friendId){
    let newState = delete this.state.openMessages[friendId]
    this.setState({
      openMessages: Object.assign(newState, this.state.openMessages),
      activeMessage: '',
    })
  }

  openMessageBox(friendId){
    if ( !Object.keys(this.state.openMessages).includes(friendId) && Object.keys(this.state.openMessages).length < 3 ){
      let friendObj = {}
      friendObj[friendId] = true

      this.setState({ 
        openMessages: Object.assign(friendObj, this.state.openMessages),
        activeMessage: friendId,
      })   
    }
  }

  setActiveMessage(friendId){
    this.setState({ activeMessage: friendId })
  }

  render(){
    return (
      <div>
        <Navbar />
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
                        onClick={ this.openMessageBox.bind(this, friendId) }>
                          { friend.firstName } { friend.lastName }
                      </p>
                  })
                }
              </div> 
              : 
              <div></div> }      
          </div>
          {
            Object.keys(this.state.openMessages).map((friendId, i) => {
              return (
                <div 
                  key={i}
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
                  <div onClick={ this.setActiveMessage.bind(this, friendId) }>
                    <ChatBox showChat={this.state.openMessages[friendId]}/>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="app-container">
          {this.props.children}
        </div>
      </div>
    )   
  }
}

function mapStateToProps(state, props){
  return {
    friends: state.friends,
    user: state.auth,
  }
}

export default connect(mapStateToProps)(AppContainer)