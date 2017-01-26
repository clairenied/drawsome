import React, { Component } from 'react';
import { Link } from 'react-router'

export default class ChatPageContainer extends Component {

  render(){
    return(
      <div className="container">
        <div className="col-xs-12">
          <h1>Your Messages</h1>
        </div>
        <div className="col-xs-12 col-sm-4">
          <hr className="divider-rule"/>
          <h3>Friends</h3>
          <h4><Link>Danielle Katz</Link><span className="online glyphicon glyphicon-star"></span></h4>
        </div>
        <div className="chat-app-container col-xs-8">
        </div>
      </div>
    )
  }
}