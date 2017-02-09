import React, { Component } from 'react';
import {connect} from 'react-redux';
import DraftContainer from './DraftContainer';
import MakeDrawing from './MakeDrawing';

class EditMasterpieceDraft extends Component{
  componentDidUpdate() {
    window.scrollTo(0,0);
  }
  
  render(){
    return(
      <div>
        <div>
          <MakeDrawing user={this.props.user} drawings={this.props.drawings} versions={this.props.versions} selectedMasterpiece={this.props.selectedMasterpiece} params={this.props.params}/>
        </div>
        <div className="draft-section">
          <DraftContainer versions={this.props.versions}/>
        </div>
      </div>
    )
  }
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
