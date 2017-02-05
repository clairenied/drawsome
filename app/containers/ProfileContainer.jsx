import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router'
import axios from 'axios'
import { getUser, removeUserFromStore, addFriend, deleteFriend } from '../reducers/users'

import BigDoodle from '../components/BigDoodle.jsx'

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    console.log('BEKE NIERENBERG', this.props)    
    return(
      <div className="container">
        <h1>Art By: { this.props.profile.fullName }</h1>
        { this.props.profile && this.props.isFriend && (this.props.profile.id !== this.props.user.id) ? 
          ( <button 
              className="btn btn-danger btn-sm" 
              onClick={this.props.deleteFriend()}>unfollow
            </button> ) : null } 
        
        { this.props.profile && (this.props.isFriend === false) && (this.props.profile.id !== this.props.user.id) ? 
          ( <button 
              className="btn btn-primary btn-sm" 
              onClick={this.props.addFriend()}>follow
            </button> ) : null }

        <div className="row">
          <div>
            { Object.values(this.props.drawings).map(drawing => {
              return (
                <BigDoodle 
                  key={drawing.id}
                  masterpiece={drawing}
                  profile={this.props.profile} />
              )
            })}  
          </div>
        </div>
      </div>
    )
  }
}

const dummyUser = () => {
  return {
    createdAt: "",
    updatedAt: "",
    id: "",
    fullName: "",
    drawings: [],
  }
}

const dummyDrawings = () => {
  return {
    0: {
      createdAt: "",
      updatedAt: "",
      id: "",
      versions: [],
    }
  }
}

const dummyVersions = () => {
  return {
    0: {
      createdAt: "",
      updatedAt: "",
      id: "",
      drawing_id: "",
      data: "",
    }
  }
}

const dummyFriendships = () => {
  return {
    createdAt: "",
    updatedAt: "",
    id: "",
    follower_id: "",
    followee_id: "",
  }
}

const mapStateToProps = (state, ownProps) => {  

  // console.log('DANIELLE IS MY FRIEND!', Object.values(state.friendships), Object.values(state.friendships)
  //     .find(friendship => {
  //       return friendship.follower_id === +ownProps.params.id || friendship.followee_id === +ownProps.params.id
  //     }))

  return {
    user: state.auth || dummyUser(),
    drawings: state.drawings || dummyDrawings(),
    versions: state.versions || dummyVersions(),
    profile: state.users[ownProps.params.id] || dummyUser(), 
    friendships: state.friendships || dummyFriendships(),
    isFriend: true,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: () => dispatch(getUser(ownProps.params.id)), 
    removeUserFromStore: () => dispatch(removeUserFromStore(ownProps.params.id)), 
    addFriend: () => dispatch(addFriend(ownProps.params.id)), 
    deleteFriend: () => dispatch(deletFriend(ownProps.params.id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)


