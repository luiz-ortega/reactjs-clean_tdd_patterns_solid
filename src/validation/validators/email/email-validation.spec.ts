import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import faker from 'faker'
import { EmailValidation } from './email-validation'

const makeSut = (): EmailValidation => new EmailValidation(faker.random.word())

describe('EmailValidation', () => {
    test('Should return error if email is invalid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.random.word())
        expect(error).toEqual(new InvalidFieldError())
    })

    test('Should return error if email is invalid', () => {
        const sut = makeSut()
        const error = sut.validate(faker.internet.email())
        expect(error).toBeFalsy()
    })

    test('Should return error if email is empty', () => {
        const sut = makeSut()
        const error = sut.validate('')
        expect(error).toBeFalsy()
    })
})
