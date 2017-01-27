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

    // axios.get('/api/users/shape')
    //   .then(res => {
    //      this.setState({
    //   shape: res.data[0].firstName
    // });
    //   })
    //   .catch(err => console.log(err));
}

  render(){
    return(
      <div className="container">
        <h1>Your Gallery</h1>
        <hr className="divider-rule"/>
        <div className="row">
          <div>
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
            <Doodle />
          </div>
        </div>
      </div>
    )
  }
}