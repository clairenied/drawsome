import React, { Component } from 'react';

import PaperCanvas from './PaperCanvas';
import sampleDrawing from '../sample-drawing';
import { Link } from 'react-router'
import { dateFormatted } from '../helperFunctions'



const Doodle = (props) => {
  let drawing = props.drawing;
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="img-card">
        <Link to={`/masterpiece/${props.drawing.id}`}>
          <div className="doodle-container">
          { props.version &&
            <PaperCanvas json={props.version.data} />
          }
          </div>
        </Link>
        {props.user && !props.artist ? 
          (<h3>{props.drawing.name}<br/><Link to={`/profile/${props.user.id}`}>{props.user.fullName}</Link></h3>) : 
          (<h3>{props.drawing.name}<br/><Link to={`/profile/${props.artist.id}`}>{props.artist.fullName}</Link></h3>)}
        <h4>{dateFormatted(props.drawing.created_at)}</h4>
      </div>

    </div>

  )
}

export default Doodle
