import React, { Component } from 'react';
import {connect} from 'react-redux'
import paper from 'paper'
import {createMasterpieceDraft} from '../reducers/drawings'

import ActivePaperCanvas from '../components/ActivePaperCanvas'

export class MasterpieceContainer extends React.Component {

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
    console.log(this.props)
    e.preventDefault()
    this.props.createMasterpieceDraft(this.props.user.id, this.state.name, paper.project.exportJSON())
  }

  render(){
    return(
      <div className="container">
        <div className="col-xs-12">
          <h1>Now editing: Your masterpiece</h1>
        </div>
        <div className="col-xs-12 col-sm-4">
          <hr className="divider-rule"/>
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
          </div>
        </div>  
        <div className="col-xs-12 col-sm-8">
          <div className="masterpiece-container">
            <ActivePaperCanvas
              onInitialize={this.onInitialize}
              onMouseDown={this.onMouseDown}
              onMouseDrag={this.onMouseDrag} 
              />
            <p></p>
            <form className="form-inline" onSubmit={this.saveDrawing.bind(this)}>
              <div className="form-group">
                <label>Masterpiece Title:  </label>
                <input type="name" 
                  className="form-control" 
                  placeholder="Masterpiece Title" 
                  value={this.state.name}
                  onChange={this.updateName.bind(this)}
                />
              </div>
              <button type="submit" className="btn btn-secondary" id="save-button">Save</button>
              <button type="post" className="btn btn-secondary" id="post-button">Post</button>
            </form>
          </div>
        </div> 
      </div>
    )
  }
}

// MasterpieceContainer.propTypes = {
//     json: React.PropTypes.array.isRequired,
// }

function mapStateToProps(state){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {createMasterpieceDraft})(MasterpieceContainer)
