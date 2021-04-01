import React from 'react'
import {
    cleanup,
    fireEvent,
    render,
    RenderResult,
} from '@testing-library/react'
import faker from 'faker'

import Login from './login'

import { ValidationSpy } from '@/presentation/test'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = render(<Login validation={validationSpy} />)
    return {
        sut,
        validationSpy,
    }
}

describe('Login Component', () => {
    afterEach(cleanup)

    test('Should start with initial state', () => {
        const { sut } = makeSut()

        const errorWrap = sut.getByTestId('errorWrap')

        expect(errorWrap.childElementCount).toBe(0)

        const submitButtom = sut.getByTestId(
            'submitButtom',
        ) as HTMLButtonElement
        expect(submitButtom.disabled).toBe(true)

        const emailStatus = sut.getByTestId('email-status')
        expect(emailStatus.title).toBe('Campo obrigatório')
        expect(emailStatus.textContent).toBe('🔴')

        const passwordStatus = sut.getByTestId('password-status')
        expect(passwordStatus.title).toBe('Campo obrigatório')
        expect(passwordStatus.textContent).toBe('🔴')
    })

    test('Should call Validation with correct email', () => {
        const { sut, validationSpy } = makeSut()

        const input = sut.getByTestId('email')
        const email = faker.internet.email()

        fireEvent.change(input, { target: { value: email } })
        expect(validationSpy.fieldName).toBe('email')
        expect(validationSpy.fieldValue).toBe(email)
    })

    test('Should call Validation with correct password', () => {
        const { sut, validationSpy } = makeSut()

        const input = sut.getByTestId('password')
        const password = faker.internet.password()

        fireEvent.change(input, { target: { value: password } })
        expect(validationSpy.fieldName).toBe('password')
        expect(validationSpy.fieldValue).toBe(password)
    })
})
