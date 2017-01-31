import React, { Component } from 'react'
import paper from 'paper'

class ActivePaperCanvas extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.currentPaper = new paper.PaperScope()
    this.currentPaper.setup(this.canvas);

    if(this.props.json) {
      this.currentPaper.importJSON(this.props.json);
    }

    this.props.onInitialize(this.currentPaper);
    
    this.currentPaper.view.onMouseDown = (event) => {
      this.currentPaper.activate();
      this.props.onMouseDown(event, this.currentPaper);
    }
    
    this.currentPaper.view.onMouseDrag = (event) => { 
      this.props.onMouseDrag(event, this.currentPaper)
    }

    this.props.getCurrentPaper(this.currentPaper)

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