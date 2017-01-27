import React, { Component } from 'react';
import { Link } from 'react-router'

const BigDoodle = (props) => {
  let drawing = props.drawing
  return (
    <div className="row big-doodle">
      <div className="big-doodle-border">
        <div className="col-xs-12">
          <div className="col-xs-12 col-md-4">
            <hr className="divider-rule"/>
            <h3>{drawing && drawing.name}</h3>
            <h3><Link to="/profile">Danielle Katz,</Link> <Link to="/profile">Mike Purgatori,</Link> <Link to="/profile">Zeke Nierenberg</Link></h3>
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
          <div className="col-xs-3">
            <img 
              className="img-responsive big-doodle-img"
              src="https://acdn.architizer.com/thumbnails-PRODUCTION/b0/61/b06105f2382b1e9f4bb8766c0c602c6f.jpg"/>
          </div>
          <div className="col-xs-3">
            <img 
              className="img-responsive big-doodle-img"
              src="https://acdn.architizer.com/thumbnails-PRODUCTION/b0/61/b06105f2382b1e9f4bb8766c0c602c6f.jpg"/>
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