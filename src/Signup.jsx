import React, { Component } from 'react'
import { createUser, verifyUser } from './Cognito'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.changeName = this.changeName.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeVerifyCode = this.changeVerifyCode.bind(this)
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    this.handleVerifySubmit = this.handleVerifySubmit.bind(this)

    this.state = {
      email: '',
      password: '',
      verifyCode: '',
      username: null,
    }
  }

  changeName (e) {
    this.setState({ name: e.target.value })
  }

  changeEmail (e) {
    this.setState({ email: e.target.value })
  }

  changePassword (e) {
    this.setState({ password: e.target.value })
  }

  changeVerifyCode (e) {
    this.setState({ verifyCode: e.target.value })
  }

  handleSignupSubmit (e) {
    e.preventDefault()
    console.log('Entered:', this.state)
    createUser(this.state.email, this.state.password, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(result.user)
      this.setState({ username: result.user.getUsername() })
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
        <h2>Signup</h2>
        {
          !this.state.username ? (
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
