import React, { Component } from 'react';
import Link from 'react-router'

const Navbar = (props) => {
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
                <li><a href="#">New Masterpiece</a></li>
                <li><a href="#">My Profile</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar