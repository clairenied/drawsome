import React, { Component } from 'react';
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {logout} from '../reducers/auth'
import {DropdownButton, MenuItem} from 'react-bootstrap'

export class Navbar extends Component {

  
  renderLogout(){
    return(
      <ul className="nav navbar-nav navbar-right">
        <form className="navbar-form navbar-left">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search"/>
          </div>
        </form>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/create-masterpiece">New Masterpiece</Link></li>
          <li>
            <div id="welcomeName">Welcome, {this.props.user.firstName}</div>
          </li>
          <li>
            <div className="user-dropdown">
              <DropdownButton title={<span className="glyphicon glyphicon-user"></span>} id={`dropdown-basic-1`}>
                <MenuItem eventKey="1" href="/profile">
                  My Profile
                </MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="2" onSelect={this.props.logout.bind(this)}>
                  Logout
                </MenuItem>
              </DropdownButton>
            </div>
        </li>
      </ul>
    );

  }
  renderLoginSignup(){
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    )
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="custom-navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/gallery">
                  <span className="custom-navbar-logo-pink"><b>Draw</b></span><span className="custom-navbar-logo-orange"><b>Some</b></span>
                </Link>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
               {
                this.props.user ?
                this.renderLogout():
                this.renderLoginSignup()
               }
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, {logout})(Navbar)
