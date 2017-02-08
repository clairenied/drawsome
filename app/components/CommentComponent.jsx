import React, { Component } from 'react';
import {connect} from 'react-redux'
import paper from 'paper'
import ActivePaperCanvas from '../components/ActivePaperCanvas'
import {postComment} from '../reducers/drawings'

export class CommentComponent extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      paperSettings: {
        strokeWidth: 7,
        strokeCap: 'round',
        strokeJoin: 'round',
        strokeColor: 'black',
        opacity: 1,
      },
      currentPaper: null,
      name: '',
      showComment: false
    }

    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseDrag = this.onMouseDrag.bind(this)
    this.onInitialize = this.onInitialize.bind(this)
    this.saveComment = this.saveComment.bind(this)
    this.getCurrentPaper = this.getCurrentPaper.bind(this)
    this.clearCanvas = this.clearCanvas.bind(this)
    this.undoDraw = this.undoDraw.bind(this)
    this.toggleComment=this.toggleComment.bind(this)
    this.changeColor = this.changeColor.bind(this)
  }

  onInitialize(paperScope) {
    paperScope.install(this);
    this.path = new this.Path(this.state.paperSettings);
  }

  onMouseDown(event, currentPaper){
    this.path = new this.Path(this.state.paperSettings);
  }

  toggleComment(event, currentPaper){
      let toggle = this.state.showComment;
      this.setState({showComment: !toggle})
    }

  onMouseDrag(event, currentPaper) {
    this.path.add(event.point);
    this.path.smooth({ type: 'continuous' })
  }

  saveComment(e){
    e.preventDefault()
    this.props.postComment(this.props.user.id, this.props.masterpiece, this.props.profile.id, this.state.currentPaper.project.exportJSON(), false, false)
    this.toggleComment()
  }

  getCurrentPaper(paper) {
    this.setState({currentPaper: paper})
  }

  clearCanvas(){
    return new Promise((resolve, reject) => resolve(this.state.currentPaper.project.clear())
      .then(()=> this.getCurrentPaper(paper))
    )
  }

  changeColor(color){
    const currentSettings = this.state.paperSettings
    this.setState(Object.assign(currentSettings, { strokeColor: color }))
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
      <div>
        <button type="button" id="post-button" className="btn btn=secondary" onClick={this.toggleComment}>{this.state.showComment ? "Discard" : "Add Comment"}</button>
              <div className="container">
                <div className="col-xs-12 col-sm-4">
                  {this.state.showComment ?
                  (<div className="palette">
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
                  </div>) : null }
                </div>

              {this.state.showComment ?
                (<div className="col-xs-12 col-sm-8">
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
                      <button type="button" onClick={this.saveComment} className="btn btn-secondary" id="post-button">Post</button>
                    </form>
                  </div>
                </div>) : null}
              </div>
              <div className="draft-section">
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

export default connect(mapStateToProps, {postComment})(CommentComponent)
