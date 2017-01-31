import React from 'react'
import {Alert} from 'react-bootstrap';

export class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  loginUser(e){
    e.preventDefault();
    this.props.login(this.state.email, this.state.password)
  }

  updateInput(field, e){
    this.setState({
      [field]: e.target.value
    })
  }

  render(){
    return (
      <div className="container">
        <div className="page-header">
          <h1>Login</h1>
        </div>
        <form className="login-form" onSubmit={this.loginUser.bind(this)}>
          <div className="buffer-oauth">
            <p>
              <a target="_self"
                 href="/api/auth/google"
                 className="btn btn-social btn-google">
              <span className="fa fa-google"></span>
              <span>Login with Google</span>
              </a>
            </p>
          </div>
          <div className="or buffer">
            <div className="back-line">
              <span>OR</span>
            </div>
          </div>
          <div>
          { this.props.warnings.loginError ?
            (<Alert bsStyle="warning">
              <strong>Oh no!</strong> Looks like your email or password is incorrect. Try again!
            </Alert>) : null
          }
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input className="form-control"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.updateInput.bind(this, 'email')}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.updateInput.bind(this, 'password')}
            />
          </div>
          <button type="submit" className="btn btn-default">Login</button>
        </form>
      </div>
    );
  }
}


import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'


function mapStateToProps(state){
  return {
    user: state.auth,
    warnings: state.warnings
  }
}

export default connect (mapStateToProps,
  {login},
) (Login)
