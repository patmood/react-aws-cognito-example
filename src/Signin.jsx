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
      loading: false,
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
    this.setState({ loading: true })
    console.log('Entered:', this.state)
    authenticateUser(this.state.email, this.state.password, (err, result) => {
      if (err) {
        console.log(err)
        this.setState({ loading: false })
        return
      }
      console.log(result)
      this.setState({ loading: false })
      window.location.reload()
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
              placeholder='Email/username'
              type='text'
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
            <button type='submit' disabled={this.state.loading}>Sign In</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Signin
