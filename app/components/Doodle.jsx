import React, { Component } from 'react';
import PaperCanvas from './PaperCanvas';
import sampleDrawing from '../sample-drawing';

const Doodle = (props) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <PaperCanvas json={sampleDrawing} />
      <h3>Danielle Katz, Mike Purgatori, Zeke Nierenberg</h3>
      <h4>September 24, 2014</h4>
    </div>

  )
}

export default Doodle