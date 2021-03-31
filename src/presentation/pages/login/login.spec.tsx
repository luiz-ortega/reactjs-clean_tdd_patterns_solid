import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react'
import {
    cleanup,
    fireEvent,
    render,
    RenderResult,
} from '@testing-library/react'
import Login from './login'

import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
    sut: RenderResult
    validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
    errorMessage: string
    input: object

    validate(input: object): string {
        this.input = input
        return this.errorMessage
    }
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

    test('Should call Validation with correct value', () => {
        const { sut, validationSpy } = makeSut()

        const input = sut.getByTestId('email')
        fireEvent.change(input, { target: { value: 'any_email' } })
        expect(validationSpy.input).toEqual({
            email: 'any_email',
        })
    })
})
