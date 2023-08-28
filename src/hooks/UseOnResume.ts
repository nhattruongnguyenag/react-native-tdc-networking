import { useIsFocused } from '@react-navigation/native'
import { useEffect } from 'react'

export default function useOnResume(callback: () => void) {
  let focused = useIsFocused()

  useEffect(() => {
    if (focused) {
      callback()
    }
  }, [focused])
}
