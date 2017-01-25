import React, { Component } from 'react';

//components
import BigDoodle from '../components/BigDoodle'
import Navbar from '../components/Navbar'

export default class ProfileContainer extends Component {

  render(){
    return(
      <div>
        <div className="page-header">
          <h1>Danielle Katz</h1>
        </div>
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