import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'

type SubTypes = {
    sut: ValidationComposite
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SubTypes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy('any_field'),
        new FieldValidationSpy('any_field'),
    ]
    const sut = new ValidationComposite(fieldValidationsSpy)
    return {
        sut,
        fieldValidationsSpy,
    }
}

describe('ValidationComposite', () => {
    test('Should return error if anu validation fails', () => {
        const { sut, fieldValidationsSpy } = makeSut()
        fieldValidationsSpy[0].error = new Error('first_error_message')
        fieldValidationsSpy[1].error = new Error('second_error_message')
        const error = sut.validate('any_field', 'any_value')
        expect(error).toBe('first_error_message')
    })
})
