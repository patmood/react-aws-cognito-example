import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'
import uuid from 'uuid'
import poolData from '../cognito-pool-data'

const userPool = new CognitoUserPool(poolData)

export const createUser = (email, password, callback) => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
  ]

  // Username must be unique in a pool, and cant be a valid email format
  // To log in with email, make sure it is set as an alias attribute in Cognito
  // More info: http://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-usernames
  const username = uuid()

  userPool.signUp(username, password, attributeList, null, callback)
}


export const verifyUser = (username, verifyCode, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  }
  const cognitoUser = new CognitoUser(userData)
  cognitoUser.confirmRegistration(verifyCode, true, callback)
}

export const authenticateUser = (email, password, callback) => {
  const authData = {
    Username: email,
    Password: password,
  }
  const authDetails = new AuthenticationDetails(authData)
  const userData = {
    Username: email,
    Pool: userPool,
  }
  const cognitoUser = new CognitoUser(userData)
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: result => {
      console.log('access token + ' + result.getAccessToken().getJwtToken())
      callback(null, result)
    },
    onFailure: err => {
      callback(err)
    }
  })
}
