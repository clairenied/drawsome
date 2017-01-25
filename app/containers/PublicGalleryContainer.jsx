import React, { Component } from 'react';

//components
import Doodle from '../components/Doodle'

export default class PublicGalleryContainer extends Component {

  render(){
    return(
      <div className="container">
        <h1>Your Gallery</h1>
        <hr className="divider-rule"/>
        <div className="row">
          <div>
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
          </div>
        </div>
      </div>
    )
  }
}