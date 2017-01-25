import React, { Component } from 'react';

//components
import BigDoodle from '../components/BigDoodle'

export default class ProfileContainer extends Component {

  render(){
    return(
      <div className="container">
        <h1>Art By: Danielle Katz</h1>
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