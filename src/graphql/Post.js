import gql from 'graphql-tag'

import { fieldsPosts } from './fragments'

export const postsHome = gql`
  query allPosts ($userAuth: ID!, $after: String, $perPage: Int!) {
    allPosts(first: $perPage, after: $after, orderBy: postCreated_DESC, filter: {publish: true}) {
      ...fieldsPosts
      likedPosts(filter: {id: $userAuth}){
        id
      }
    }
  }
  ${fieldsPosts}
`

// ignore publish
export const myPosts = gql`
  query allPosts ($userAuth: ID!) {
    allPosts(first: 7, orderBy: postCreated_DESC, filter: {sendBy: {id: $userAuth}}) {
      ...fieldsPosts
      likedPosts(filter: {id: $userAuth}){
        id
      }
    }
  }
  ${fieldsPosts}
`

export const myPostsLikes = gql`
  query allPosts ($userAuth: ID!) {
    allPosts(first: 7, orderBy: postCreated_DESC, filter: {likedPosts_some: {id: $userAuth}}) {
      ...fieldsPosts
      likedPosts(filter: {id: $userAuth}){
        id
      }
    }
  }
  ${fieldsPosts}
`

export const postsHomeSubs = gql`
  subscription ($userAuth: ID!) {
    Post {
      mutation
      node {
        ...fieldsPosts
        likedPosts(filter: {id: $userAuth}){
          id
        }
      }
      previousValues {
        id
      }
    }
  }
  ${fieldsPosts}
`
