import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router'

//components
import BigDoodle from '../components/BigDoodle'

class ProfileContainer extends Component {

  render(){
    let user = this.props.user
    return(
      <div className="container">
<<<<<<< HEAD
        <div className="col-xs-12">
          <h1>Art By: {this.props.user && this.props.user.firstName} {this.props.user && this.props.user.lastName}</h1>
          <div className="row">
            <div>
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
              <BigDoodle />
            </div>
=======
        <h1>Art By: {user && user.firstName} {user && user.lastName}</h1>
        <div className="row">
          <div>
            {
              user && user.drawings && user.drawings.map(dID => {
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
>>>>>>> master
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.auth,
    drawings: state.drawings
  }
}

export default connect(mapStateToProps)(ProfileContainer)