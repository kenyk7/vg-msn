import gql from 'graphql-tag'

const fieldsPhotos = gql`
  fragment fieldsPhotos on Photo {
    id
    title
    description
    active
    file{
      url
    }
    sendBy{
      id
      username
    }
    _likedPhotosMeta{
      count
    }
  }
`

export const photosHome = gql`
  query allPhotos ($userAuth: ID!) {
    allPhotos(orderBy: createdAt_DESC, filter: {active: true}) {
      ...fieldsPhotos
      likedPhotos(filter: {id: $userAuth}){
        id
      }
    }
  }
  ${fieldsPhotos}
`
export const photosHomeSus = gql`
  subscription ($userAuth: ID!) {
    Photo {
      mutation
      node {
        ...fieldsPhotos
        likedPhotos(filter: {id: $userAuth}){
          id
        }
      }
      previousValues {
        id
      }
    }
  }
  ${fieldsPhotos}
`

export const profileInfo = gql`
  query User ($userId: ID!) {
    User(id: $userId){
      id
      username
      email
      photos (last: 21){
        ...fieldsPhotos
      }
      likes (last: 21) {
        ...fieldsPhotos
      }
      _photosMeta{
        count
      }
      _likesMeta{
        count
      }
    }
  }
  ${fieldsPhotos}
`
