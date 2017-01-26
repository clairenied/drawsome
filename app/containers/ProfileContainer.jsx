import React, { Component } from 'react';
import {connect} from 'react-redux'

//components
import BigDoodle from '../components/BigDoodle'

class ProfileContainer extends Component {

  render(){
    console.log(this.props.user)
    return(
      <div className="container">
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
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(ProfileContainer)