import React, { Component } from 'react';

import PaperCanvas from './PaperCanvas';
import sampleDrawing from '../sample-drawing';

import { Link } from 'react-router'


const Doodle = (props) => {
 

  return (
    <div className="col-xs-12 col-sm-6 col-md-4">
      <PaperCanvas json={sampleDrawing} />
      <h3>Danielle Katz, Mike Purgatori, Zeke Nierenberg</h3>
      <h4>September 24, 2014</h4>
      <div className="img-card">
        <img 
          className="img-responsive"
          src="https://acdn.architizer.com/thumbnails-PRODUCTION/b0/61/b06105f2382b1e9f4bb8766c0c602c6f.jpg"/>
        <h3><Link to={`/profile/`}></Link> <Link to="/profile">Mike Purgatori,</Link> <Link to="/profile">Zeke Nierenberg</Link></h3>
        <h4>September 24, 2014</h4>
      </div>

    </div>

  )
}

export default Doodle