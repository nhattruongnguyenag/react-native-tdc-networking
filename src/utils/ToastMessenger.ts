import Toast from 'react-native-toast-message'

export const ToastMessenger = (status: number, flag: number, text1Error: string, text2Error: string) => {
  if (status != flag) {
    Toast.show({
      type: 'error',
      text1: text1Error,
      text2: text2Error
    })
  }
}
