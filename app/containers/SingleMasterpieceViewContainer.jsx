import React, { Component } from 'react';
import {connect} from 'react-redux'

//components
import BigDoodleSingleMasterpiece from '../components/BigDoodleSingleMasterpiece'
import ProfileDoodle from '../components/ProfileDoodle'

export class SingleMasterpieceViewContainer extends Component {

  render(){
    return(
      <div className="container">
        <ProfileDoodle
          masterpiece={this.props.currrentMasterpiece}
          comments={this.props.comments}
          users={this.props.users}
        />
      </div>
    )
  }
}

function mapStateToProps(state, props){
  return {
    currrentMasterpiece: state.drawings[Number(props.params.id)],
    comments: Object.values(state.drawings).filter(drawing => drawing.parent_drawing_id && drawing.parent_drawing_id === Number(props.params.id)),
    users: state.users
  }
}

export default connect(mapStateToProps)(SingleMasterpieceViewContainer)