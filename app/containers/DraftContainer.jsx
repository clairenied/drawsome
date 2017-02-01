import React, { Component } from 'react';

class DraftContainer extends Component {



}

function mapStateToProps(state, props){
  return {
    user: state.auth,
    drawings: state.drawings,
    drafts: Object.values(state.drawings).filter(drawing => drawing.type === "masterpiece" && drawing.private === true),
    versions: state.versions,
    selectedMasterpiece: state.drawings[Number(props.params.id)]
  }
}

export default connect(mapStateToProps)(DraftContainer)