import React, { Component } from 'react';
import { Link } from 'react-router'
import PaperCanvas from './PaperCanvas.jsx'
import CommentComponent from './CommentComponent.jsx'

const BigDoodle = (props) => {

  let masterpiece = props.masterpiece;
  let profile = props.profile.profile;
  let masterpieceVersion = masterpiece.versions;
  let comments = masterpiece.comments;
  return (
    <div className="row big-doodle">
      <div className="big-doodle-border">
        <div className="col-xs-12">
          <div className="col-xs-12 col-md-4">
            <hr className="divider-rule"/>
            <h3>{masterpiece && masterpiece.name}</h3>
            <h3><Link to={`/profile/${profile.id}`}>{profile.firstName} {profile.lastName}</Link></h3>
          </div>
          <Link to="/masterpiece">
            <div className="col-xs-12 col-md-8">
              <div className="masterpiece-container">
                <PaperCanvas json={masterpieceVersion[0].data} />
              </div>
            </div>
          </Link>
        </div>
        <div className="col-xs-12">
<CommentComponent masterpiece={props.masterpiece} profile={props.profile}/>
          <div className="col-xs-12">
            <h3>Comments:</h3>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">    
            <div className="img-card">
              <div className="doodle-container">      
                    { comments && comments.map(comment => {
                        return ( 
                          <div key={comment.id}>
                          <h4><Link to={`/profile/${comment.users[0].id}`}>{comment.users[0].fullName}</Link></h4>
                            <PaperCanvas json={comment.versions[0].data} />
                          </div>
                        )
                      })
                    }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigDoodle