import React, { Component } from 'react';

import PaperCanvas from './PaperCanvas';
import sampleDrawing from '../sample-drawing';

import { Link } from 'react-router'


const Doodle = (props) => {
  let drawing = props.drawing;
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="img-card">
        <div className="doodle-container">
        { props.version &&
          <PaperCanvas json={props.version.data} />
        }
        </div>
        <h2 className="doodle-name">{props.drawing.name}</h2>
        {drawing.users ? (<h3><Link to={`/profile/${drawing.users[0].id}`}>{drawing.users[0].fullName}</Link></h3>) : null}
        {props.user && !drawing.users ? (<h3><Link to={`/profile/${props.user.id}`}>{props.user.fullName}</Link></h3>) : null}
        <h4>{props.drawing.created_at}</h4>
      </div>

    </div>

  )
}

export default Doodle
