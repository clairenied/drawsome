import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router'

//components
import BigDoodle from '../components/BigDoodle.jsx'


class ProfileContainer extends Component {

  render(){

  let profile = this.props;

    return(
      <div className="container">
        <h1>Art By: {profile.firstName} {profile.lastName}</h1>
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
     
    )
  }
}

      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  let profileId = ownProps.params.id;
  let masterpieces;
  let comments;

  if (state.profile.drawings) {
    masterpieces = Object.values(state.profile.drawings).filter(drawing => drawing.type === "masterpiece");
    comments = Object.values(state.profile.drawings).filter(drawing => drawing.type === "comment");
   
  }

    return {
    profile: state.profile, 
    comments,
    masterpieces
  }
}

export default connect(mapStateToProps)(ProfileContainer)