import gql from 'graphql-tag'

const fieldsPosts = gql`
  fragment fieldsPosts on Post {
    id
    title
    content
    publish
    postCreated
    sendBy{
      id
      username
    }
    _likedPostsMeta{
      count
    }
  }
`
export const usersQuery = gql`
  query allUsers ($userAuth: ID!) {
    allUsers(orderBy: updatedAt_DESC, filter: {id_not: $userAuth}) {
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
  }
`

export const postsHome = gql`
  query allPosts ($userAuth: ID!) {
    allPosts(orderBy: postCreated_DESC, filter: {publish: true}) {
      ...fieldsPosts
      likedPosts(filter: {id: $userAuth}){
        id
      }
    }
  }
  ${fieldsPosts}
`

export const postsHomeSus = gql`
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

export const profileInfo = gql`
  query User ($userId: ID!) {
    User(id: $userId){
      id
      username
      email
      posts (last: 21){
        ...fieldsPosts
      }
      likes (last: 21) {
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
  }
  ${fieldsPosts}
`
