import React from 'react'
import {
    cleanup,
    fireEvent,
    render,
    RenderResult,
} from '@testing-library/react'
import faker from 'faker'
import Login from './login'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(
        <Login
            validation={validationStub}
            authentication={authenticationSpy}
        />,
    )
    return {
        sut,
        authenticationSpy,
    }
}

const simulateValidSubmit = (
    sut: RenderResult,
    email = faker.internet.email(),
    password = faker.internet.password(),
): void => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const submitButton = sut.getByTestId('submitButtom')
    fireEvent.click(submitButton)
}

const populateEmailField = (
    sut: RenderResult,
    email = faker.internet.email(),
): void => {
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, {
        target: { value: email },
    })
}

const populatePasswordField = (
    sut: RenderResult,
    password = faker.internet.password(),
): void => {
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
        target: { value: password },
    })
}

const simulateStatusForFied = (
    sut: RenderResult,
    fiedlName: string,
    validationError?: string,
): void => {
    const status = sut.getByTestId(`${fiedlName}-status`)
    expect(status.title).toBe(validationError || 'Tudo certo')
    expect(status.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
    afterEach(cleanup)

    test('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        const errorWrap = sut.getByTestId('errorWrap')

        expect(errorWrap.childElementCount).toBe(0)

        const submitButtom = sut.getByTestId(
            'submitButtom',
        ) as HTMLButtonElement
        expect(submitButtom.disabled).toBe(true)

        simulateStatusForFied(sut, 'email', validationError)

        simulateStatusForFied(sut, 'password', validationError)
    })

    test('Should show email error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populateEmailField(sut)

        simulateStatusForFied(sut, 'email', validationError)
    })

    test('Should show password error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })

        populatePasswordField(sut)

        simulateStatusForFied(sut, 'password', validationError)
    })

    test('Should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()

        populatePasswordField(sut)

        simulateStatusForFied(sut, 'password')
    })

    test('Should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()

        populateEmailField(sut)

        simulateStatusForFied(sut, 'email')
    })

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()

        populateEmailField(sut)
        populatePasswordField(sut)

        const submitButton = sut.getByTestId(
            'submitButtom',
        ) as HTMLButtonElement
        expect(submitButton.disabled).toBe(false)
    })

    test('Should show spinner on submit', () => {
        const { sut } = makeSut()
        simulateValidSubmit(sut)
        const spinner = sut.getByTestId('spinner')
        expect(spinner).toBeTruthy()
    })

    test('Should call Authentication with correct values', () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.email()
        simulateValidSubmit(sut, email, password)

        expect(authenticationSpy.params).toEqual({
            email,
            password,
        })
    })
})
