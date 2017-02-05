import React, { Component } from 'react';
import {connect} from 'react-redux';
import DraftContainer from './DraftContainer';
import MakeDrawing from './MakeDrawing';

export function MasterpieceContainer(props){
  return(
    <div>
      <div>
        <MakeDrawing user={props.user}/>

      </div>
      <div className="draft-section">
        <DraftContainer />
      </div>
    </div>
  )
}

function mapStateToProps(state, props){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(MasterpieceContainer)
