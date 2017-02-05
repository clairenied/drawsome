import React, { Component } from 'react';
import {connect} from 'react-redux'
import paper from 'paper'
import DraftContainer from './DraftContainer'
import {createMasterpieceDraft, postMasterpieceDraft, saveNewMasterpieceDraft, postMasterpieceFromDraft} from '../reducers/drawings'

import ActivePaperCanvas from '../components/ActivePaperCanvas'

class MakeDrawing extends React.Component {

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
    this.saveAndCreateDrawing = this.saveAndCreateDrawing.bind(this)
    this.postAndCreateDrawing = this.postAndCreateDrawing.bind(this)
    this.getCurrentPaper = this.getCurrentPaper.bind(this)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.undoDraw = this.undoDraw.bind(this)
    this.saveVersionDraft = this.saveVersionDraft.bind(this)
    this.postMasterpieceOfDraft = this.postMasterpieceOfDraft.bind(this)
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

  saveAndCreateDrawing(e){
    e.preventDefault()
    this.props.createMasterpieceDraft(this.props.user.id, this.state.name, this.state.currentPaper.project.exportJSON(), true, true)
  }

  postAndCreateDrawing(e){
    e.preventDefault()
    this.props.postMasterpieceDraft(this.props.user.id, this.state.name, this.state.currentPaper.project.exportJSON(), true, false)
  }

  saveVersionDraft(e){
    e.preventDefault()
    this.props.saveNewMasterpieceDraft(this.props.params.id, this.props.user.id, this.state.currentPaper.project.exportJSON())
  }

  postMasterpieceOfDraft(e){
    e.preventDefault()
    this.props.postMasterpieceFromDraft(this.props.params.id, this.props.user.id, this.state.currentPaper.project.exportJSON(), false)
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
    return new Promise((resolve, reject) => resolve(this.state.currentPaper.project.activeLayer.lastChild.remove())
      .then(()=> {
        this.getCurrentPaper(paper)
      })
    )
  }

  render(){
    return(
      <div className="container">
        <div className="col-xs-12">
          <div className="master-header">
            <h1 className="master-h1">Now editing: </h1>
            {
              this.props.selectedMasterpiece ?
                <h1 className="masterpiece-title">{this.props.selectedMasterpiece && this.props.selectedMasterpiece.name}</h1> 
                :
                <div id="master-form" className="form-group">
                  <input type="text" 
                    className="masterpiece-input" 
                    placeholder="Your Masterpiece" 
                    value={this.state.name}
                    onChange={this.updateName.bind(this)}
                  />
                </div>    
            }
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
            <button type="button" id="clear-button" className="btn btn=secondary" onClick={this.clearCanvas}>Clear</button>  
            <button type="button" className="btn btn=secondary" onClick={this.undoDraw}>Undo</button> 
          </div>
        </div>  
        <div className="col-xs-12 col-sm-8">
          <div className="masterpiece-container">
          {
            this.props.versions ? 
              <div>
              { this.props.selectedVersion &&
              <ActivePaperCanvas
                getCurrentPaper={this.getCurrentPaper}
                onInitialize={this.onInitialize}
                onMouseDrag={this.onMouseDrag}
                onMouseDown={this.onMouseDown}
                clearCanvas={this.clearCanvas}
                undoDraw = {this.undoDraw}
                json={this.props.selectedVersion.data}
              />
              }
              </div>
              : 
              <ActivePaperCanvas
                getCurrentPaper={this.getCurrentPaper}
                onInitialize={this.onInitialize}
                onMouseDrag={this.onMouseDrag}
                onMouseDown={this.onMouseDown}
                clearCanvas={this.clearCanvas}
                undoDraw = {this.undoDraw}
              />
          }
            {
              this.props.selectedMasterpiece ?
                <form id="master-buttons" className="form-inline">
                  <button type="button" onClick={this.saveVersionDraft} className="btn btn-secondary" id="save-button">Save</button>
                  <button type="button" onClick={this.postMasterpieceOfDraft} className="btn btn-secondary" id="post-button">Post</button>
                </form>
              :
                <form id="master-buttons" className="form-inline">
                  <button type="button" onClick={this.saveAndCreateDrawing} className="btn btn-secondary" id="save-button">Save</button>
                  <button type="button" onClick={this.postAndCreateDrawing} className="btn btn-secondary" id="post-button">Post</button>
                </form>
            }
          </div>
        </div> 
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const toPutOnProps = {};

  if(props.versions) {
    toPutOnProps.selectedVersion = props.versions[Math.max(...props.selectedMasterpiece.versions)] ;
  }
  return toPutOnProps;
}

export default connect(mapStateToProps, {createMasterpieceDraft, postMasterpieceDraft, saveNewMasterpieceDraft, postMasterpieceFromDraft})(MakeDrawing)