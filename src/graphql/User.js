import gql from 'graphql-tag'

import { fieldsPosts } from './fragments'

const fAllUsers = gql`
  fragment fAllUsers on User {
    id
    username
    email
    followers(filter: {id: $userAuth}){
      id
      username
    }
    followings(filter: {id: $userAuth}){
      id
      username
    }
  }
`
export const usersQuery = gql`
  query allUsers ($userAuth: ID!) {
    allUsers(last: 7, orderBy: updatedAt_DESC, filter: {id_not: $userAuth}) {
      ...fAllUsers
    }
  }
  ${fAllUsers}
`
export const usersFollowSubs = gql`
  subscription ($userAuth: ID!) {
    User (filter: {node: {id_not: $userAuth}}) {
      mutation
      node {
        ...fAllUsers
      }
      previousValues {
        id
      }
    }
  }
  ${fAllUsers}
`

const fAuthUser = gql`
  fragment fAuthUser on User {
    id
    username
    email
    posts (last: 7){
      ...fieldsPosts
    }
    likes (last: 7) {
      ...fieldsPosts
    }
    _postsMeta{
      count
    }
    _likesMeta{
      count
    }
    _followersMeta{
      count
    },
    _followingsMeta{
      count
    }
  }
`
export const profileInfo = gql`
  query User ($userAuth: ID!) {
    User(id: $userAuth){
      ...fAuthUser
    }
  }
  ${fieldsPosts}
  ${fAuthUser}
`

export const userAuthSubs = gql`
  subscription ($userAuth: ID!) {
    User (filter: {mutation_in: [UPDATED], node: {id: $userAuth}}) {
      mutation
      node {
        ...fAuthUser
      }
      previousValues {
        id
      }
    }
  }
  ${fieldsPosts}
  ${fAuthUser}
`
