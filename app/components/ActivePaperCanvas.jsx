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

    this.currentPaper.view.onMouseUp = (event) => {
      this.props.onMouseUp(event, this.currentPaper);
    }
    
    this.currentPaper.view.onMouseDrag = (event) => { 
      this.props.onMouseDrag(event, this.currentPaper)
    }

    this.props.getCurrentPaper(this.currentPaper)



  }

  componentWillReceiveProps(nextProps){
    if(nextProps.json !== this.props.json) {
      return new Promise((resolve, reject) => {
        resolve(this.currentPaper.project.clear())
      }).then((paper) => {
        this.currentPaper.importJSON(nextProps.json);
      })
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

ActivePaperCanvas.defaultProps = {
  width: '450px',
  height: '450px',
  onMouseUp: function(){},
  onMouseDown: function(){},
  onMouseDrag: function(){},
}

export default ActivePaperCanvas