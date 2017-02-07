import React, { Component } from 'react';
import {connect} from 'react-redux'

//components
import BigDoodleSingleMasterpiece from '../components/BigDoodleSingleMasterpiece'

export class SingleMasterpieceViewContainer extends Component {

  render(){
    return(
      <div className="container">
        <h1>{currrentMasterpiece.name}</h1>
        <div className="row">
          <BigDoodleSingleMasterpiece />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props){
  return {
    currrentMasterpiece: state.drawings[Number(props.params.id)]
  }
}

export default connect()(SingleMasterpieceViewContainer)