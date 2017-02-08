import React, { Component } from 'react';
import { Link } from 'react-router'
import ProfileCanvas from './ProfileCanvas.jsx'
import PaperCanvas from './PaperCanvas.jsx'
import {dateFormatted} from '../helperFunctions.js'
import CommentComponent from './CommentComponent.jsx'
import {connect} from 'react-redux'
import CommentCanvas from './CommentCanvas.jsx'

class ProfileDoodle extends Component {
  constructor(props){
    super(props)

    this.state = {
      toggleComment: false,
    }

    this.toggleComment = this.toggleComment.bind(this)
  }

  toggleComment(event, currentPaper){
    console.log(this.state.toggleComment)
    let toggle = this.state.toggleComment;
    this.setState({toggleComment: !toggle})
  }

  render(){
    const masterpiece = this.props.masterpiece
    const profile = this. props.profile
    const masterpieceVersion = this.props.versions[Math.max(...masterpiece.versions)]
    const comments = this.props.comments
    
    return(
     <div className="row big-doodle">
        <div className="big-doodle-border">
          <div className="col-xs-12">
            <div className="col-xs-12 col-md-7">
              <div className="profile-masterpiece-container">
                <ProfileCanvas height="450" width="450" json={ masterpieceVersion && masterpieceVersion.data} />
              </div>
            </div>
            <div className="col-xs-12 col-md-5">
             <hr className="divider-rule"/>
            
              <h2>{ masterpiece && masterpiece.name }</h2>
              <button type="button" id="comment-button" className="btn btn-secondary" onClick={this.toggleComment}>{this.state.showComment ? "Discard" : "Add Comment"}</button>
              <CommentComponent 
                toggleComment={this.state.toggleComment}
                masterpiece={this.props.masterpiece} 
                profile={this.props.profile}/>
            </div>
          </div>
          <div>
            <div className="col-xs-12">
              <h3>Comments:</h3>
              { comments && comments.map(comment => {

                let name = "";
                  this.props.users[comment.version.user_id] ? name = this.props.users[comment.version.user_id].fullName : null;
                  return (
                    <div className="profile-card">
                      <CommentCanvas json={comment.version.data} key={comment.version.id}/>
                      <div className="img-info">
                        <h3 className="comment-name"><Link to={`/profile/${comment.version.user_id}`}>{name}</Link></h3>
                        <h4 className="date-h4">{dateFormatted(comment.version.created_at)}</h4>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    versions: state.versions
  }
}


export default connect(mapStateToProps)(ProfileDoodle)
