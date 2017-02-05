import React, { Component } from 'react';
import {connect} from 'react-redux';
import DraftContainer from './DraftContainer';
import MakeDrawing from './MakeDrawing';

export function EditMasterpieceDraft(props){
  return(
    <div>
      <div>
        <MakeDrawing user={props.user} drawings={props.drawings} versions={props.versions} selectedMasterpiece={props.selectedMasterpiece} params={props.params}/>
      </div>
      <div className="draft-section">
        <DraftContainer />
      </div>
    </div>
  )
}

function mapStateToProps(state, props){
  return {
    user: state.auth,
    drawings: state.drawings,
    versions: state.versions,
    drafts: Object.values(state.drawings).filter(drawing => drawing.type === "masterpiece" && drawing.private === true),
    selectedMasterpiece: Object.assign({versions: []}, state.drawings[Number(props.params.id)]),
    params: props.params
  }
}

export default connect(mapStateToProps)(EditMasterpieceDraft)
