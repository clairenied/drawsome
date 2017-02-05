import React, { Component } from 'react';
import {connect} from 'react-redux';
import DraftContainer from './DraftContainer';
import MakeDrawing from './MakeDrawing';

class MasterpieceContainer extends Component{
  
  componentDidUpdate() {
    window.scrollTo(0,0);
  }
    return(
      <div>
        <div>
          <MakeDrawing user={this.props.user}/>
        </div>
        <div className="draft-section">
          <DraftContainer />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(MasterpieceContainer)
