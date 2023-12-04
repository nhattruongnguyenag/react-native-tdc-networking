import { Base } from "../types/Base"
import { InputTextValidate, isBlank } from "./ValidateUtils"

export interface ErrorMessage {
    blank: string
}

export const validateField = (error: ErrorMessage, validate: InputTextValidate, value: string) => {
    if (isBlank(value)) {
        validate.textError = error.blank
        validate.isError = true
        validate.isVisible = true
        return false
    }

    validate.textError = ''
    validate.isError = false
    validate.isVisible = false
    return true
}

export const isExistFieldInvalid = <D, V, E>(data: D, validates: V, error: E) => {
    let countFieldInValid = 0
    let key: keyof V | keyof D | keyof E
    if (data) {
        for (key in validates) {
            if (!validateField(error[key as keyof E] as ErrorMessage, validates[key as keyof V] as InputTextValidate, data[key as keyof D] as string)) {
                countFieldInValid++
            }
        }
    }
    return countFieldInValid > 0
}