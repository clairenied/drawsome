import React, { Component } from 'react';
import {connect} from 'react-redux'
import paper from 'paper'
import DraftContainer from './DraftContainer'
import {createMasterpieceDraft, postMasterpieceDraft} from '../reducers/drawings'

import ActivePaperCanvas from '../components/ActivePaperCanvas'

class MasterpieceContainer extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      paperSettings: {
        strokeWidth: 10,
        strokeCap: 'round',
        strokeJoin: 'round',
        strokeColor: 'black',
        opacity: 1,
      },
      currentPaper: null,
      name: ''
    }

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseDrag = this.onMouseDrag.bind(this)
    this.biggerBrushSize = this.biggerBrushSize.bind(this)
    this.smallerBrushSize = this.smallerBrushSize.bind(this)
    this.moreOpaque = this.moreOpaque.bind(this)
    this.lessOpaque = this.lessOpaque.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.onInitialize = this.onInitialize.bind(this)
    this.saveDrawing = this.saveDrawing.bind(this)
    this.postDrawing = this.postDrawing.bind(this)
    this.getCurrentPaper = this.getCurrentPaper.bind(this)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.undoDraw = this.undoDraw.bind(this)
  }



  onInitialize(paperScope) {
    paperScope.install(this);
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDown(event, currentPaper){
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDrag(event, currentPaper) {
    this.path.add(event.point);
    this.path.smooth({ type: 'continuous' })
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
    }
  }

  lessOpaque(){
    const currentSettings = this.state.paperSettings
    if(currentSettings.opacity > 0.1){
      const lessOpacity = currentSettings.opacity - 0.1
      this.setState(Object.assign(currentSettings, { opacity: lessOpacity }))
    }
  }

  changeColor(color){
    const currentSettings = this.state.paperSettings
    this.setState(Object.assign(currentSettings, { strokeColor: color }))
  }

  updateName(e){
    this.setState({name: e.target.value})
  }

  saveDrawing(e){
    e.preventDefault()
    console.log('IMPORTANT INFO',this.props.user.id, this.state.name, this.state.currentPaper.project.exportJSON())
    this.props.createMasterpieceDraft(this.props.user.id, this.state.name, this.state.currentPaper.project.exportJSON(), true, true)
  }

  postDrawing(e){
    e.preventDefault()
    this.props.postMasterpieceDraft(this.props.user.id, this.state.name, this.state.currentPaper.project.exportJSON(), true, false)
  }

  getCurrentPaper(paper) {
    this.setState({currentPaper: paper}) 
  }

  clearCanvas(){
    return new Promise((resolve, reject) => resolve(this.state.currentPaper.project.clear())
      .then(()=> this.getCurrentPaper(paper))
    )
  }

  undoDraw(){
    let children = this.state.currentPaper.project.activeLayer.children
    return new Promise((resolve, reject) => resolve(children[children.length-1].removeItem())
      .then(()=> {
        this.getCurrentPaper(paper)
      })
    )
  }

  render(){
    return(
      <div>
      <div className="container">
        <div className="col-xs-12">
          <div className="master-header">
            <h1 className="master-h1">Now editing: </h1>
            <div id="master-form" className="form-group">
              <input type="text" 
                className="masterpiece-input" 
                placeholder="Your Masterpiece" 
                value={this.state.name}
                onChange={this.updateName.bind(this)}
              />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4">
          <span><h3>Size:&ensp;{this.state.paperSettings.strokeWidth}&ensp;<a onClick={this.biggerBrushSize}>+</a>/<a onClick={this.smallerBrushSize}>-</a></h3></span>
          <span><h3>Opacity:&ensp;{this.state.paperSettings.opacity.toFixed(1)}&ensp;<a onClick={this.moreOpaque}>+</a>/<a onClick={this.lessOpaque}>-</a></h3></span>
          <div className="palette">
            <a onClick={() => this.changeColor('red')}><div className="red"></div></a>
            <a onClick={() => this.changeColor('#ff5602')}><div className="orange"></div></a>
            <a onClick={() => this.changeColor('yellow')}><div className="yellow"></div></a>
            <a onClick={() => this.changeColor('#00ff00')}><div className="green"></div></a>
            <a onClick={() => this.changeColor('blue')}><div className="blue"></div></a>
            <a onClick={() => this.changeColor('#8500ff')}><div className="purple"></div></a>
            <a onClick={() => this.changeColor('black')}><div className="black"></div></a>
            <a onClick={() => this.changeColor('white')}><div className="white"></div></a>  
            <button type="button" className="btn btn=secondary" onClick={this.clearCanvas}>Clear</button>  
            <button type="button" className="btn btn=secondary" onClick={this.undoDraw}>Undo</button> 
          </div>
        </div>  
        <div className="col-xs-12 col-sm-8">
          <div className="masterpiece-container">
            <ActivePaperCanvas
              getCurrentPaper={this.getCurrentPaper}
              onInitialize={this.onInitialize}
              onMouseDrag={this.onMouseDrag}
              onMouseDown={this.onMouseDown}
              clearCanvas={this.clearCanvas}
              undoDraw = {this.undoDraw}
              />
            <form id="master-buttons" className="form-inline">
              <button type="button" onClick={this.saveDrawing} className="btn btn-secondary" id="save-button">Save</button>
              <button type="button" onClick={this.postDrawing} className="btn btn-secondary" id="post-button">Post</button>
            </form>
          </div>
        </div> 
      </div>
      <div className="draft-section">
        <DraftContainer />
      </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {createMasterpieceDraft, postMasterpieceDraft})(MasterpieceContainer)
