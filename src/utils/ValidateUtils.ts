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
