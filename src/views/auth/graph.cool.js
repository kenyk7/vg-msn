import gql from 'graphql-tag'

export const createUser = gql`
  mutation createUser ($email: String!, $password: String!, $username: String!) {
    createUser(username: $username, authProvider: {
      email: {
        email: $email
        password: $password
      }
    }) {
      id
    }
  }
`

export const createAndLoginUser = gql`
  mutation createLoginUser ($email: String!, $password: String!, $username: String!) {
    createUser(username: $username, authProvider: {
      email: {
        email: $email
        password: $password
      }
    }) {
      id
    }
    signinUser(email: {
      email: $email
      password: $password
    }){
      token,
      user{
        id
        email
        username
      }
    }
  }
`

export const login = gql`
  mutation signinUser ($email: String!, $password: String!) {
    signinUser(email: {
      email: $email
      password: $password
    }) {
      token,
      user{
        id
        email
        username
      }
    }
  }
`

export const getUserId = gql`
  query getUser ($id: ID!) {
    User (id: $id) {
      id
      email
      username
    }
  }
`
