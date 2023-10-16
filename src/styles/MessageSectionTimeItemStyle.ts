import { StyleSheet } from 'react-native'

export const AVATAR_HEIGHT = 30
export const MESSAGE_DATE_MARGIN_LEFT_OR_RIGHT = AVATAR_HEIGHT + 25

export default StyleSheet.create({
  body: {
    display: 'flex',
    marginTop: 10
  },
  wrapperContentGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  messageContentGroup: {
    flex: 1,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 7,
    marginVertical: 1
  },
  messageTextContent: {
    fontSize: 16
  },
  messageDate: {
    fontSize: 10,
    marginTop: 5,
    marginEnd: 'auto'
  },
  messageContentWrapper: {
    flexShrink: 1,
    marginTop: 10
  },
  imagesGroup: {
    borderRadius: 5
  },
  imageItem: {
    borderRadius: 3,
    margin: 1
  },
  statusMessage: {
    fontSize: 13
  }
})
