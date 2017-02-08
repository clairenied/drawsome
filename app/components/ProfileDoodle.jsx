import React, { Component } from 'react';
import { Link } from 'react-router'
import ProfileCanvas from './ProfileCanvas.jsx'
import PaperCanvas from './PaperCanvas.jsx'

import CommentComponent from './CommentComponent.jsx'
import {connect} from 'react-redux'
import CommentCanvas from './CommentCanvas.jsx'


const ProfileDoodle = (props) => {
  const masterpiece = props.masterpiece;
  const profile = props.profile;

  const masterpieceVersion = props.versions[masterpiece.versions[0]];
  const comments = props.comments

  return (
   <div className="row big-doodle">
      <div className="big-doodle-border">
        <div className="col-xs-12">
          <div className="col-md-4">
            <hr className="divider-rule"/>
            <h3>{ masterpiece && masterpiece.name }</h3>
          </div>
          <div className="col-xs-12 col-md-8">
            <div className="masterpiece-container">
              <ProfileCanvas height="450" width="450" json={ masterpieceVersion && masterpieceVersion.data} />
            </div>
          </div>
        </div>
        <div>
          <CommentComponent masterpiece={props.masterpiece} profile={props.profile}/>
            <h3>Comments:</h3>

          <div className="col-xs-12">
            { comments && comments.map(comment => {

              let name = "";
                props.users[comment.version.user_id] ? name = props.users[comment.version.user_id].fullName : null;
                return (
                  <div className="profile-card">
                  <h4><Link to={`/profile/${comment.version.user_id}`}>{name}</Link></h4>
                    <CommentCanvas json={comment.version.data} key={comment.version.id}/>
                    <h4>{dateFormatted(comment.version.created_at)}</h4>
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

const mapStateToProps = (state, ownProps) => {
  return {
    versions: state.versions
  }
}


export default connect(mapStateToProps)(ProfileDoodle)
