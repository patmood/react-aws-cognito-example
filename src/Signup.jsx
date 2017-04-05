import React, { Component } from 'react'
import { createUser } from './Cognito'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.changeName = this.changeName.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.createUser = this.createUser.bind(this)

    this.state = {
      email: '',
      password: '',
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

  createUser (e) {
    e.preventDefault()
    console.log('Entered:', this.state)
    createUser(this.state.email, this.state.password, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(result.user)
    })
  }

  render () {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <form onSubmit={this.createUser}>
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
      </div>
    )
  }
}

export default Signup
