import React, { Component } from 'react';
import {connect} from 'react-redux'
import paper from 'paper'
import DraftContainer from './DraftContainer'
import {createMasterpieceDraft, postMasterpieceDraft} from '../reducers/drawings'

import ActivePaperCanvas from '../components/ActivePaperCanvas'
import MakeDrawing from './MakeDrawing'

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

function mapStateToProps(state){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {createMasterpieceDraft, postMasterpieceDraft})(MasterpieceContainer)
