import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router'
import axios from 'axios'
import { getUser, removeUserFromStore, addFriend, deleteFriend } from '../reducers/users'

//components
import BigDoodle from '../components/BigDoodle.jsx'

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    let profile = this.props;
    let isFriend;
    this.props.friends[this.props.profile.id] ? isFriend = true : isFriend = false;
    let profileId = this.props.profile.id;
    let userId;
    this.props.user ? userId = this.props.user.id : null;
  
    return(
      <div className="container">
        <h1>Art By: {profile.profile.fullName}</h1>
        {isFriend && (profileId !== userId) ? (<button className="btn btn-danger btn-sm" onClick={this.deleteFriend}>unfollow</button>) : null} 
        {!isFriend && (profileId !== userId) ? (<button className="btn btn-primary btn-sm" onClick={this.addFriend}>follow</button>) : null}

        <div className="row">
          <div>
          {
              profile.masterpieces && profile.masterpieces.map(masterpiece => {

                return (
                  <BigDoodle masterpiece={masterpiece} profile={profile} key={masterpiece.id}/>
                )
              })
            }  
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  if (state.profile.drawings) {
    masterpieces = Object.values(state.profile.profdrawings).filter(drawing => drawing.type === "masterpiece");
    //comments = Object.values(state.profile.drawings).filter(drawing => drawing.type === "comment");
   
  }

  return {
    masterpieces: state.drawings,
    user: state.auth,
    profile: state.users[ownProps.params.id], 
    friend: state.friends,
  }
}

export default connect(mapStateToProps)(ProfileContainer)