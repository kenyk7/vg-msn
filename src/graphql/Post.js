import gql from 'graphql-tag'

import { fieldsPosts } from './fragments'

export const postsHome = gql`
  query allPosts ($userAuth: ID!) {
    allPosts(last: 21, orderBy: postCreated_DESC, filter: {publish: true}) {
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
