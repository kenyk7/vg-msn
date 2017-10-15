import gql from 'graphql-tag'

// create post
export const createPost = gql`
  mutation createPost($content: String!, $sendBy: ID!, $postCreated: DateTime!) {
    createPost(content: $content, sendById: $sendBy, postCreated: $postCreated) {
      id
      content
    }
  }
`
// delete post
export const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`
// toggle publish post
export const updatePostActive = gql`
  mutation updatePost($id: ID!, $active: Boolean!) {
    updatePost(id: $id, publish: $active) {
      id
    }
  }
`

// add like to user inpost
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

// add user on user: follow to user
export const addToUserOnUser = gql`
  mutation addToUserOnUser($idFrom: ID!, $idTo: ID!) {
    addToUserOnUser(followingsUserId: $idTo, followersUserId: $idFrom) {
      followingsUser {
        id
      }
      followersUser {
        id
      }
    }
  }
`
export const removeFromUserOnUser = gql`
  mutation removeFromUserOnUser($idFrom: ID!, $idTo: ID!) {
    removeFromUserOnUser(followingsUserId: $idTo, followersUserId: $idFrom) {
      followingsUser {
        id
      }
      followersUser {
        id
      }
    }
  }
`

// fakes
export const updatePostFake = gql`
  mutation updatePost($id: ID!) {
    updatePost(id: $id, dummy: "dummy") {
      id
    }
  }
`
export const updateUserFake = gql`
  mutation updateUser($id: ID!) {
    updateUser(id: $id, dummy: "dummy") {
      id
    }
  }
`
