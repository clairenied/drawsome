import React, { Component } from 'react';
import { Link } from 'react-router'
import {connect} from 'react-redux'

const Navbar = (props) => {
  console.log(props.user)
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
              <ul className="nav navbar-nav navbar-right">
                <form className="navbar-form navbar-left">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                  </div>
                </form>
                {props.user &&
                  <li><Link to="/chat">Chat</Link></li>
                }
                {props.user &&
                <li><Link to="/create-masterpiece">New Masterpiece</Link></li>
                }
                {props.user &&
                <li><Link to="profile">My Profile</Link></li>
                }
                {props.user &&
                <li><Link to="#">Logout</Link></li>
                }
                {!props.user &&
                <li><Link to="/login">Login</Link></li>
                }
                {!props.user &&
                <li><Link to="/signup">Signup</Link></li>
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

function mapStateToProps(state){
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps)(Navbar)
