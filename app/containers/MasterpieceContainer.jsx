import React, { Component } from 'react';

export default class MasterpieceContainer extends Component {

  render(){
    return(
      <div className="container">
        <h1>Now editing: Your masterpiece</h1>
        <hr className="divider-rule"/>
        <div className="masterpiece-container">
        </div>      
      </div>
    )
  }
}