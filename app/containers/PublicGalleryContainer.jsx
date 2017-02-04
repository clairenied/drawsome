import React, { Component } from 'react';
import {connect} from 'react-redux'

//components
import Doodle from '../components/Doodle'

class PublicGalleryContainer extends Component {
 constructor(props) {
    super(props);
    this.state = {
      shape : ""
    }
    
  }

  render(){
    return(
      <div className="container">
        <h1>Your Gallery</h1>
        <hr className="divider-rule"/>
        <div className="row">
          <div>
            {
            this.props.drawings && this.props.drawings.map((drawing) =>{
              let version = this.props.versions[Math.max(...drawing.versions)]
              return (
                <Doodle key={drawing.id} drawing={drawing} version={version} user={this.props.user} />
              )
            })
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.auth,
    drawings:  Object.values(state.drawings).filter(drawing => drawing.type === "masterpiece" && drawing.private === false),
    friends: state.friends,
    versions: state.versions
  }
}

export default connect(mapStateToProps)(PublicGalleryContainer)
