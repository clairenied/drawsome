import React, { Component } from 'react';

//components
import BigDoodleSingleMasterpiece from '../components/BigDoodleSingleMasterpiece'

export default class SingleMasterpieceViewContainer extends Component {

  render(){
    return(
      <div className="container">
        <h1>Image Title</h1>
        <div className="row">
          <BigDoodleSingleMasterpiece />
        </div>
      </div>
    )
  }
}