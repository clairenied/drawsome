import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router'
import axios from 'axios'
import {getFriend, removeFriend} from '../reducers/friends'

//components
import BigDoodle from '../components/BigDoodle.jsx'



class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    
  
  this.addFriend = this.addFriend.bind(this);  
  this.deleteFriend = this.deleteFriend.bind(this); 
  }

  addFriend(e) {
    let id = this.props.profile.id
    axios.put(`/api/users/${id}/friends`)
    .then((res) => {
      this.props.getFriend(this.props.profile)
    }
    )
  }

  deleteFriend(e) {
    let id = this.props.profile.id
    axios.delete(`/api/users/${id}/friends`)
    .then((res) => {
      this.props.removeFriend(this.props.profile)
    }
    )
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
        {isFriend && (profileId !== userId) ? (<button className="btn btn-danger btn-sm" onClick={this.deleteFriend}>unfriend</button>) : null} 
        {!isFriend && (profileId !== userId) ? (<button className="btn btn-primary btn-sm" onClick={this.addFriend}>add friend</button>) : null}

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
  let profileId = ownProps.params.id;
  let masterpieces;
  let user = state.auth;
  let friends = state.friends
  
  if (state.profile.drawings) {
    masterpieces = Object.values(state.profile.profdrawings).filter(drawing => drawing.type === "masterpiece");
    //comments = Object.values(state.profile.drawings).filter(drawing => drawing.type === "comment");
   
  }

    return {
    profile: state.profile, 
    masterpieces,
    user,
    friends
  }
}

export default connect(mapStateToProps, {getFriend, removeFriend})(ProfileContainer)