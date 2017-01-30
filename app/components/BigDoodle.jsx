import React, { Component } from 'react';
import { Link } from 'react-router'

const BigDoodle = (props) => {
  console.log("PROPSSS", props)
  let masterpiece = props.masterpiece;
  let profile = props.profile.profile;
  //   console.log("DRAWING IN BIG DOODLE COMPONENT", drawing)
  // let mostRecent;
  // drawing.type!=="comment" ? mostRecent = Math.max(...drawing.versions) : null;
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
              <img 
                className="img-responsive big-doodle-img"
                src="https://acdn.architizer.com/thumbnails-PRODUCTION/b0/61/b06105f2382b1e9f4bb8766c0c602c6f.jpg"/>
            </div>
          </Link>
        </div>
        <div className="col-xs-12">
          <div className="col-xs-12">
            <h3>Comments:</h3>
          </div>
          <div className="col-xs-3">
            <img 
              className="img-responsive big-doodle-img"
              src="https://acdn.architizer.com/thumbnails-PRODUCTION/b0/61/b06105f2382b1e9f4bb8766c0c602c6f.jpg"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigDoodle