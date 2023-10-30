export interface InputTextValidate {
  textError: string
  isError: boolean
  isVisible: boolean
}

export function isContainSpecialCharacter(text: string): boolean {
  const pattern = /[@#$%^&*()+=\[\]{}\\|<>\/]+/
  return pattern.test(text)
}

export function isNotContainSpecialCharacter(text: string): boolean {
  return !isContainSpecialCharacter(text)
}

export function isBlank(text: string): boolean {
  const pattern = /^[\s]*$/g
  return pattern.test(text)
}

export function isNotBlank(text: string): boolean {
  const pattern = /^.+$/g
  return pattern.test(text)
}

export function isLengthInRange(text: string, min: number, max: number): boolean {
  console.log(`/^.{${min},${max}}$/g`)
  const pattern = new RegExp(`^.{${min},${max}}$`)
  return pattern.test(text)
}

export function isEmail(text: string): boolean {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  return pattern.test(text)
}

export function isPassword(text: string): boolean {
  const pattern = /^[0-9a-zA-Z]{1,8}$/
  return pattern.test(text)
}

export function isType(text: string): boolean {
  const pattern = /^[0-9]{0,253}$/
  return pattern.test(text)
}

export function isPhone(text: string): boolean {
  const pattern = /^\+\d{10}$/
  return pattern.test(text)
}
