import React, { Component } from 'react';

import PaperCanvas from './PaperCanvas';
import sampleDrawing from '../sample-drawing';

import { Link } from 'react-router'


const Doodle = (props) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="img-card">
        <div className="doodle-container">
        { props.version &&
          <PaperCanvas json={props.version.versionData} />
        }
        </div>
        <h2 className="doodle-name">{props.drawing.name}</h2>
        <h3> <Link to="/profile">Mike Purgatori,</Link> <Link to="/profile">Zeke Nierenberg</Link></h3>
        <h4>{props.drawing.created_at}</h4>
      </div>

    </div>

  )
}

export default Doodle
