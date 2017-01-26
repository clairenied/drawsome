import React, { Component } from 'react';
import paper from 'paper'

export default class MasterpieceContainer extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      path: {},
      paperSettings: {
        strokeWidth: 10,
        strokeCap: 'round',
        strokeJoin: 'round',
        strokeColor: 'black',
        opacity: 1,
      }
    }

    this.biggerBrushSize = this.biggerBrushSize.bind(this)
    this.smallerBrushSize = this.smallerBrushSize.bind(this)
    this.moreOpaque = this.moreOpaque.bind(this)
    this.lessOpaque = this.lessOpaque.bind(this)
    this.changeColor = this.changeColor.bind(this)
  }

  componentDidMount() {
    let path
    
    paper.setup(this.canvas)
    
    paper.view.onMouseDown = (event) => {
      path = new paper.Path(this.state.paperSettings);
    }

    paper.view.onMouseDrag = (event) => {
      path.add(event.point);
    }
  }

  biggerBrushSize(){
    const currentSettings = this.state.paperSettings
    const thickerStroke = currentSettings.strokeWidth + 5
    this.setState(Object.assign(currentSettings, { strokeWidth: thickerStroke }))
  }

  smallerBrushSize(){
    const currentSettings = this.state.paperSettings
    if(currentSettings.strokeWidth > 5){
      const thinnerStroke = currentSettings.strokeWidth - 5
      this.setState(Object.assign(currentSettings, { strokeWidth: thinnerStroke }))
    }
  }

  moreOpaque(){
    const currentSettings = this.state.paperSettings
    if(currentSettings.opacity < 1){
      const greaterOpacity = currentSettings.opacity + 0.1
      this.setState(Object.assign(currentSettings, { opacity: greaterOpacity }))
      console.log(currentSettings)
    }
  }

  lessOpaque(){
    const currentSettings = this.state.paperSettings
    if(currentSettings.opacity > 0.1){
      const lessOpacity = currentSettings.opacity - 0.1
      this.setState(Object.assign(currentSettings, { opacity: lessOpacity }))
      console.log(currentSettings)
    }
  }

  changeColor(color){
    console.log(color)
    const currentSettings = this.state.paperSettings
    this.setState(Object.assign(currentSettings, { strokeColor: color }))
  }

  render(){
    return(
      <div className="container">
        <div className="col-xs-12">
          <h1>Now editing: Your masterpiece</h1>
        </div>
        <div className="col-xs-3 col-sm-3">
          <hr className="divider-rule"/>
          <h3>Size: {this.state.paperSettings.strokeWidth}</h3>
          <span><h3><a onClick={this.biggerBrushSize}>+</a>&emsp;/&emsp;<a onClick={this.smallerBrushSize}>-</a></h3></span>
          <h3>Opacity: {this.state.paperSettings.opacity.toFixed(1)}</h3>
          <span><h3><a onClick={this.moreOpaque}>+</a>&emsp;/&emsp;<a onClick={this.lessOpaque}>-</a></h3></span>
          <div className="palette">
            <a onClick={() => this.changeColor('red')}><div className="red"></div></a>
            <a onClick={() => this.changeColor('yellow')}><div className="yellow"></div></a>
            <a onClick={() => this.changeColor('blue')}><div className="blue"></div></a>
            <a onClick={() => this.changeColor('#00ff00')}><div className="green"></div></a>
            <a onClick={() => this.changeColor('black')}><div className="black"></div></a>
            <a onClick={() => this.changeColor('white')}><div className="white"></div></a>
          </div>
        </div>  
        <div className="col-xs-9 col-sm-9">
          <div className="masterpiece-container">
            <canvas width="450" height="450" ref={(elem) => this.canvas = elem}></canvas>
          </div>
        </div> 
      </div>
    )
  }
}

// MasterpieceContainer.propTypes = {
//     json: React.PropTypes.array.isRequired,
// }