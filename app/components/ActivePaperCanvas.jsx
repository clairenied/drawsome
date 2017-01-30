import React, { Component } from 'react'
import paper from 'paper'

class ActivePaperCanvas extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    let currentPaper = new paper.PaperScope()
    currentPaper.setup(this.canvas);

    if(this.props.json) {
      currentPaper.importJSON(this.props.json);
    }

    this.props.onInitialize(currentPaper);
    
    currentPaper.view.onMouseDown = (event) => {
      currentPaper.activate();
      this.props.onMouseDown(event, currentPaper);
    }
    
    currentPaper.view.onMouseDrag = (event) => { 
      this.props.onMouseDrag(event, currentPaper)
    }
  }

  render() {
    return <canvas 
      width={this.props.width} 
      height={this.props.height} 
      ref={(elem) => this.canvas = elem}>
    </canvas>
  }
}

ActivePaperCanvas.propTypes = {
  json: React.PropTypes.array,
}

ActivePaperCanvas.defaultProps = {
  width: '450px',
  height: '450px',
  onMouseDrag: function() {},

}

export default ActivePaperCanvas