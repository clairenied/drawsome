import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router'

//components
import BigDoodle from '../components/BigDoodle'


class ProfileContainer extends Component {
  render(){
 console.log("PROPSSSS", this.props)
  let friendID = this.props.profileID

    
    return(
      <div className="container">
        <h1>Art By: {friends && friends[friendID].firstName} {friend && friend[friendID].lastName}</h1>
        <div className="row">
          <div>
            {
              friend && friend.drawings && friend.drawings.map(dID => {
                return (
                  <BigDoodle key={dID} drawing={this.props.drawings[dID]}/>
                )
              })
            }
            {
              user && !user.drawings.length ?
              <div>
                <hr className="divider-rule"/>
                <h3>You don't have any art yet - create a masterpiece <Link to="/create-masterpiece">here</Link></h3>
              </div>
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  let profileID = ownProps.params.ID;
    return {
    user: state.auth,
    profileID: profileID,
    masterpieces: Object.values(state.drawings).filter(drawing => drawing.type === "masterpiece"),
    comments: Object.values(state.drawings).filter(drawing => drawing.type === "comments"),
  }
}

export default connect(mapStateToProps)(ProfileContainer)