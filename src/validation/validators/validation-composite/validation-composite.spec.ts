import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { FieldValidationSpy } from '@/validation/test'
import faker from 'faker'

type SubTypes = {
    sut: ValidationComposite
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SubTypes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy(fieldName),
        new FieldValidationSpy(fieldName),
    ]
    const sut = ValidationComposite.build(fieldValidationsSpy)
    return {
        sut,
        fieldValidationsSpy,
    }
}

describe('ValidationComposite', () => {
    test('Should return error if any validation fails', () => {
        const fieldName = faker.database.column()
        const { sut, fieldValidationsSpy } = makeSut(fieldName)
        const error1 = faker.random.words()
        fieldValidationsSpy[0].error = new Error(error1)
        fieldValidationsSpy[1].error = new Error(faker.random.words())
        const error = sut.validate(fieldName, faker.random.words())
        expect(error).toBe(error1)
    })

    test('Should return falsy if all validations succed', () => {
        const fieldName = faker.database.column()
        const { sut } = makeSut(fieldName)
        const error = sut.validate(fieldName, faker.random.words())
        expect(error).toBeFalsy()
    })
})
