import React, {Component} from 'react';
import {Link} from 'react-router'
import axios from 'axios'
import SearchInput, {createFilter} from 'react-search-input'


export class SearchBar extends Component {
  constructor(){
    super()
    this.state = {
      input:"",
      nameArr: []
    }
    this.axiosCall = this.axiosCall.bind(this);
    this.searchUpdate = this.searchUpdate.bind(this);
  }

  axiosCall(name){
    axios.get(`/api/users/searchbar/`, {params:{name}})
    .then(names => {
      console.log('HERE IS THE NEWNAME GOD DAMNIT',names.data);
      this.setState({ nameArr: names.data })
    })
  }


  searchUpdate(e){
    let val = e.target.value;
    this.setState({
      input: val,
      nameArr: val ? this.state.nameArr: []
    })
      if(val){
      this.axiosCall(val);
    }
  }


  render() {

        return (
          <div>
          <input type="text"
            className="form-control"
            name="searchTerm"
            placeholder="Search for friends"
            value={this.state.input}
            onChange={ this.searchUpdate} />
          { this.state.nameArr.map(name => {
            return (
              <div key={name.email}>
              <Link to={`/profile/${name.id}`}>{name.fullName}</Link>
              </div>
            )
          })}
          </div>
        )

    }
}
