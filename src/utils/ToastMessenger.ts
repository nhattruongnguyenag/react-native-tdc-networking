import Toast from 'react-native-toast-message'

export const ToastMessenger = (
  status: number,
  flag: number,
  text1Success: string,
  text2Success: string,
  text1Error: string,
  text2Error: string
) => {
  if (status === flag) {
    Toast.show({
      type: 'success',
      text1: text1Success,
      text2: text2Success
    })
  } else {
    Toast.show({
      type: 'error',
      text1: text1Error,
      text2: text2Error
    })
  }
}
