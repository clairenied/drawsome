import React, { Component } from 'react';
import axios from 'axios'

//components
import Doodle from '../components/Doodle'

export default class PublicGalleryContainer extends Component {
 constructor(props) {
    super(props);
    this.state = {
      shape : ""
    }
    
  }

componentDidMount(){
  console.log("ANYTHINGGGG!!")
    axios.get('/api/users/shape')
      .then(res => {

         this.setState({
      shape: res.data[0].firstName
    });
      })
      .catch(err => console.log(err));
}

  render(){
    console.log("SHAPE", this.state.shape)
    return(
      <div className="container">
        <div className="page-header">
          <h1>Your Gallery</h1>
        </div>
        <div className="row">
          <div>
            <Doodle drawing={this.state.shape} />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
            <Doodle />
          </div>
        </div>
      </div>
    )
  }
}