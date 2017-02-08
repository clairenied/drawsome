import React, { Component } from 'react';
import {connect} from 'react-redux'

//components
import BigDoodleSingleMasterpiece from '../components/BigDoodleSingleMasterpiece'
import ProfileDoodle from '../components/ProfileDoodle'

export class SingleMasterpieceViewContainer extends Component {

  render(){
    console.log('CURRENT MASTER',this.props.currrentMasterpiece)
    // let profile =  this.props.users[this.props.currrentMasterpiece.version.user_id] 
    return(
      <div className="container">
        <ProfileDoodle
          masterpiece={this.props.currrentMasterpiece}
          comments={this.props.comments}
          users={this.props.users}
          profile={this.props.profile}
        />
      </div>
    )
  }
}

function mapStateToProps(state, props){
  return {
    currrentMasterpiece: state.drawings[Number(props.params.id)],
    comments: Object.values(state.drawings).filter(drawing => drawing.parent_drawing_id && drawing.parent_drawing_id === Number(props.params.id)),
    users: state.users,
    profile: state.users[state.drawings[Number(props.params.id)].version.user_id]
  }
}

export default connect(mapStateToProps)(SingleMasterpieceViewContainer)