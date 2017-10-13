import gql from 'graphql-tag'

export const createPost = gql`
  mutation createPost($title: String!, $description: String!, $sendBy: ID!) {
    createPost(title: $title, content: $description, sendById: $sendBy) {
      id
      title
      content
    }
  }
`

export const updatePostActive = gql`
  mutation updatePost($id: ID!, $active: Boolean!) {
    updatePost(id: $id, publish: $active) {
      id
    }
  }
`

export const updatePostFake = gql`
  mutation updatePost($id: ID!) {
    updatePost(id: $id, dummy: "dummy") {
      id
    }
  }
`

export const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export const addToUserOnPost = gql`
  mutation addToUserOnPost($postId: ID!, $userId: ID!) {
    addToUserOnPost(likesPostId: $postId, likedPostsUserId: $userId) {
      likedPostsUser {
        id
      }
      likesPost {
        id
      }
    }
  }
`

export const removeFromUserOnPost = gql`
mutation removeFromUserOnPost($postId: ID!, $userId: ID!) {
  removeFromUserOnPost(likesPostId: $postId, likedPostsUserId: $userId) {
    likedPostsUser {
      id
    }
    likesPost {
      id
    }
  }
}
`
