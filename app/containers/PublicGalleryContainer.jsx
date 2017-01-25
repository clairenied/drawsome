import React, { Component } from 'react';

//components
import Doodle from '../components/Doodle'

export default class PublicGalleryContainer extends Component {

  render(){
    return(
      <div className="container">
        <div className="page-header">
          <h1>Your Gallery</h1>
        </div>
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