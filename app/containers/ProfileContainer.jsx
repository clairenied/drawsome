import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router'
import axios from 'axios'
import { getUser, removeUserFromStore, addFriend, deleteFriend } from '../reducers/users'

import ProfileDoodle from '../components/ProfileDoodle.jsx'

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="container">
        <h1>Art By: { this.props.profile.fullName }</h1>

        <div className="row">
        { this.props.profile && this.props.isFriend && (this.props.profile.id !== this.props.user.id) ?
          ( <button
              className="btn btn-danger btn-sm"
              onClick={this.props.deleteFriend.bind(this)}>unfollow
            </button> ) : null }

        { this.props.profile && (this.props.isFriend === false) && (this.props.profile.id !== this.props.user.id) ?
          ( <button
              className="btn btn-primary btn-sm"
              onClick={this.props.addFriend}>follow
            </button> ) : null }
          <div>
            { this.props.drawings && this.props.drawings.map(drawing => {
              return (
                <ProfileDoodle
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
  const versions = Object.values(state.versions)
    .filter(version => version.user_id === Number(ownProps.params.id));

  const drawings = Object.values(state.drawings)
    .filter(drawing => drawing.type === 'masterpiece' && drawing.private===false && drawing.versions
      .some(version_id => versions.some(version => version.id === version_id))
      )

  return {
    user: state.auth || dummyUser(),
    drawings,
    versions,
    profile: state.users[Number(ownProps.params.id)] || dummyUser(),
    friendships: state.friendships || dummyFriendships(),
    isFriend: Object.values(state.friendships)
      .some(friendship =>
      {
       return friendship.follower_id === state.auth.id && friendship.followee_id === Number(ownProps.params.id)
      })
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUser: () => dispatch(getUser(Number(ownProps.params.id))),
    removeUserFromStore: () => dispatch(removeUserFromStore(Number(ownProps.params.id))),
    addFriend: () => dispatch(addFriend(Number(ownProps.params.id))),
    deleteFriend: () => dispatch(deleteFriend(Number(ownProps.params.id))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
