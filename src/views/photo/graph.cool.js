import gql from 'graphql-tag'

export const createPhoto = gql`
  mutation createPhoto($title: String!, $description: String!, $active: Boolean!, $fileId: ID!, $sendBy: ID!) {
    createPhoto(title: $title, description: $description, active: $active, fileId: $fileId, sendById: $sendBy) {
      id
      title
      description
    }
  }
`

export const updatePhotoActive = gql`
  mutation updatePhoto($id: ID!, $active: Boolean!) {
    updatePhoto(id: $id, active: $active) {
      id
    }
  }
`

export const updatePhotoFake = gql`
  mutation updatePhoto($id: ID!) {
    updatePhoto(id: $id, dummy: "dummy") {
      id
    }
  }
`

export const deletePhoto = gql`
  mutation deletePhoto($id: ID!) {
    deletePhoto(id: $id) {
      id
    }
  }
`

export const addToUserOnPhoto = gql`
  mutation addToUserOnPhoto($photoId: ID!, $userId: ID!) {
    addToUserOnPhoto(likesPhotoId: $photoId, likedPhotosUserId: $userId) {
      likedPhotosUser {
        id
      }
      likesPhoto {
        id
      }
    }
  }
`

export const removeFromUserOnPhoto = gql`
mutation removeFromUserOnPhoto($photoId: ID!, $userId: ID!) {
  removeFromUserOnPhoto(likesPhotoId: $photoId, likedPhotosUserId: $userId) {
    likedPhotosUser {
      id
    }
    likesPhoto {
      id
    }
  }
}
`
