import React, { Component } from 'react';
import paper from 'paper'

export default class MasterpieceContainer extends React.Component {

  componentDidMount() {
    paper.setup(this.canvas)

    console.log(paper.onMouseDown)
    
    paper.view.onMouseDrag = (event) => {
      console.log('I am firing')
      // Create a new circle shaped path with a radius of 10
      // at the position of the mouse (event.point):
      var path = new paper.Path.Circle({
        center: event.point,
        radius: 10,
        fillColor: 'black'
      });
    };
  }
  

  render(){
    return(
      <div className="container">
        <h1>Now editing: Your masterpiece</h1>
        <hr className="divider-rule"/>
        <div className="masterpiece-container">
          <canvas width="500" height="500" ref={(elem) => this.canvas = elem}></canvas>
        </div>      
      </div>
    )
  }
}

// MasterpieceContainer.propTypes = {
//     json: React.PropTypes.array.isRequired,
// }