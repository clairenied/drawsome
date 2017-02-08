import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router'
import axios from 'axios'
import { getUser, removeUserFromStore, addFriend, deleteFriend, getProfileInfo } from '../reducers/users'

import ProfileDoodle from '../components/ProfileDoodle.jsx'

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
  }

  componentDidMount(){
    if(!this.props.isFriend && this.props.user.id !== Number(this.props.params.id)){
      this.props.profile && this.props.getProfileInfo()
    }
  }

  componentWillUnmount(){
    if(!this.props.isFriend && this.props.user.id !== Number(this.props.params.id)){
      this.props.removeUserFromStore(this.props.profile)
    }
  }

  render(){
    return(
      <div className="container">
        <div className="master-header">
          <h1 className="master-h1">Art By: { this.props.profile.fullName }</h1>
           <hr className="divider-rule"/>
            <div className="follow-btns">
              { this.props.profile && this.props.isFriend && (this.props.profile.id !== this.props.user.id) ?
                ( <button
                    className="btn btn-secondary" id="unfollow-button"
                    onClick={this.props.deleteFriend.bind(this)}>unfollow
                  </button> ) : null } 
              
              { this.props.profile && (this.props.isFriend === false) && (this.props.profile.id !== this.props.user.id) ? 
                ( <button 
                    className="btn btn-secondary"  id="follow-button"
                    onClick={this.props.addFriend.bind(this)}>follow
                  </button> ) : null }
            </div>
        </div>

        <div className="row">
          <div>

            { this.props.drawings.map(drawing => {
              let commentsarr = this.props.comments.filter(comment => comment.parent_drawing_id === drawing.id);

              return (
                <ProfileDoodle
                  key={drawing.id}
                  masterpiece={drawing}
                  profile={this.props.profile} comments={commentsarr} users={this.props.users}/>
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
  
  const versions = Object.values(state.versions)
    .filter(version => version.user_id === Number(ownProps.params.id));

  const drawings = Object.values(state.drawings)
    .filter(drawing => drawing.type === 'masterpiece' && drawing.private===false && drawing.versions
      .some(version_id => versions.some(version => version.id === version_id))
      )

  const comments = Object.values(state.drawings)
    .filter(drawing => drawing.parent_drawing_id)
  
  return {
    user: state.auth || dummyUser(),
    drawings,
    versions,
    comments,
    users: state.users,
    profile: state.users[Number(ownProps.params.id)] || dummyUser(), 
    friendships: state.friendships || dummyFriendships(),
    isFriend: Object.values(state.friendships).some(friendship => {
       return friendship.follower_id === state.auth.id && friendship.followee_id === Number(ownProps.params.id)
      })
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: () => dispatch(getUser(Number(ownProps.params.id))), 
    removeUserFromStore: (user) => dispatch(removeUserFromStore(user)), 
    addFriend: () => dispatch(addFriend(Number(ownProps.params.id))), 
    deleteFriend: () => dispatch(deleteFriend(Number(ownProps.params.id))),
    getProfileInfo: () => dispatch(getProfileInfo(Number(ownProps.params.id)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
