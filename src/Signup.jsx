import React, { Component } from 'react'
import { createUser, verifyUser } from './Cognito'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.changeEmail = this.changeEmail.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeVerifyCode = this.changeVerifyCode.bind(this)
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    this.handleVerifySubmit = this.handleVerifySubmit.bind(this)

    this.state = {
      email: '',
      password: '',
      verifyCode: '',
      username: '',
      showVerification: false,
    }
  }

  changeEmail (e) {
    this.setState({ email: e.target.value })
  }

  changeUsername (e) {
    this.setState({ username: e.target.value })
  }

  changePassword (e) {
    this.setState({ password: e.target.value })
  }

  changeVerifyCode (e) {
    this.setState({ verifyCode: e.target.value })
  }

  handleSignupSubmit (e) {
    const { username, email, password } = this.state
    e.preventDefault()
    console.log('Entered:', this.state)
    createUser(username, email, password, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(result.user)
      this.setState({ showVerification: true })
    })
  }

  handleVerifySubmit (e) {
    e.preventDefault()
    verifyUser(this.state.username, this.state.verifyCode, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      alert(result)
    })
  }

  render () {
    return (
      <div className="Signup">
        <h2>Sign Up</h2>
        {
          !this.state.showVerification ? (
            <form onSubmit={this.handleSignupSubmit}>
              <div>
                <input
                  value={this.state.email}
                  placeholder='Email'
                  type='email'
                  onChange={this.changeEmail} />
              </div>
              <div>
                <input
                  value={this.state.username}
                  placeholder='Username'
                  onChange={this.changeUsername} />
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
                <button type='submit'>Sign up</button>
              </div>
            </form>
          ) : (
            <form onSubmit={this.handleVerifySubmit}>
              <input
                value={this.state.verifyCode}
                onChange={this.changeVerifyCode}
                placeholder='code' />
              <button type='submit'>Verify</button>
            </form>
          )
        }
      </div>
    )
  }
}

export default Signup
