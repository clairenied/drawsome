import React, { Component } from 'react';
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'

//components
import Doodle from '../components/Doodle'

class PublicGalleryContainer extends Component {
 constructor(props) {
    super(props);
    this.state = {
      shape : ""
    }
  }

  componentDidMount(){
    if(this.props&& !this.props.user){
      browserHistory.push('/login')
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
              let artist = this.props.friends[version.user_id]
              return (
                <Doodle key={drawing.id} drawing={drawing} version={version} user={this.props.user} artist={artist} />
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
    friends: state.users,
    versions: state.versions
  }
}

export default connect(mapStateToProps)(PublicGalleryContainer)
