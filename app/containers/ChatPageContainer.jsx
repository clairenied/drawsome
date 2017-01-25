import React, { Component } from 'react';

export default class ChatPageContainer extends Component {

  render(){
    return(
      <div className="container">
        <h1>Your Messages</h1>
        <hr className="divider-rule"/>
        <div className="chat-sidebar-container col-xs-3">
        <h3>Friends</h3>
          <p><b className="online">&#8226;</b>Danielle Katz</p>
          <p><b className="online">&#8226;</b>Danielle Katz</p>
          <p><b className="online">&#8226;</b>Danielle Katz</p>
          <p><b className="online">&#8226;</b>Danielle Katz</p>
          <p><b className="online">&#8226;</b>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
          <p>Danielle Katz</p>
        </div>
        <div className="chat-app-container col-xs-9">
        </div>
      </div>
    )
  }
}