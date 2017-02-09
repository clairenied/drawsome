import React, { Component } from 'react';
import PaperCanvas from './PaperCanvas';
import sampleDrawing from '../sample-drawing';
import { Link } from 'react-router'
import { dateFormatted } from '../helperFunctions'


const DoodleDraft = (props) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <div className="img-card">
        <div className="doodle-container">
        { props.version &&
          <PaperCanvas json={props.version.data} />
        }
        </div>
        <h3 className="draft-name">{props.drawing.name}</h3>
        <h4 className="draft-date">{dateFormatted(props.drawing.created_at)}</h4>
      </div>

    </div>

  )
}

export default DoodleDraft
