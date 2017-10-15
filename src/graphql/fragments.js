import gql from 'graphql-tag'

export const fieldsPosts = gql`
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
