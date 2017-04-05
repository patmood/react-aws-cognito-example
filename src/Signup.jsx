import React, { Component } from 'react'
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import uuid from 'uuid'
import poolData from '../cognito-pool-data'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.changeName = this.changeName.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.createUser = this.createUser.bind(this)

    this.userPool = new CognitoUserPool(poolData)

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
    console.log(this.state)
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: this.state.email,
      }),
    ]

    // Username must be unique in a pool, and cant be a valid email format
    // To log in with email, make sure it is set as an alias attribute in Cognito
    // More info: http://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-usernames
    const username = uuid()

    this.userPool.signUp(username, this.state.password, attributeList, null, (err, result) => {
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
