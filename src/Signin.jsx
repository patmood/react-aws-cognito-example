import React, { Component } from 'react'
import { authenticateUser } from './Cognito'

class Signin extends Component {
  constructor (props) {
    super(props)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.handleSigninSubmit = this.handleSigninSubmit.bind(this)

    this.state = {
      email: '',
      password: '',
    }
  }

  changeEmail (e) {
    this.setState({ email: e.target.value })
  }

  changePassword (e) {
    this.setState({ password: e.target.value })
  }

  handleSigninSubmit (e) {
    e.preventDefault()
    console.log('Entered:', this.state)
    authenticateUser(this.state.email, this.state.password, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      debugger
      console.log(result)
    })
  }

  render () {
    return (
      <div className="Signin">
        <h2>Sign In</h2>
        <form onSubmit={this.handleSigninSubmit}>
          <div>
            <input
              value={this.state.email}
              placeholder='Email'
              type='email'
              onChange={this.changeEmail} />
          </div>
          <div>
            <input
              value={this.state.password}
              placeholder='Password'
              type='password'
              minLength={6}
              onChange={this.changePassword} />
          </div>
          <div>
            <button type='submit'>Sign In</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Signin
