import React, { Component } from 'react';
import { Link } from 'react-router'
import ProfileCanvas from './ProfileCanvas.jsx'
import CommentCanvas from './CommentCanvas.jsx'

import CommentComponent from './CommentComponent.jsx'
import {connect} from 'react-redux'


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
          <Link to="/masterpiece">
            <div className="col-xs-12 col-md-8">
              <div className="masterpiece-container">
                <ProfileCanvas height="450" width="450" json={ masterpieceVersion && masterpieceVersion.data} />
              </div>
            </div>
          </Link>
        </div>
        <div>
          <CommentComponent masterpiece={props.masterpiece} profile={props.profile}/>
            <h3>Comments:</h3>

          <div className="col-xs-12">
            { comments && comments.map(comment => {
                return (
                  <div className="profile-card">
                  <h4><Link to={`/profile/${comment.version.users_id}`}>{}</Link></h4>
                    <CommentCanvas json={comment.version.data} />
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
