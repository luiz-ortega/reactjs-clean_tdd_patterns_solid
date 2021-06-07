import React from 'react'
import {
    cleanup,
    fireEvent,
    render,
    RenderResult,
    waitFor,
} from '@testing-library/react'
import 'jest-localstorage-mock'
import faker from 'faker'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { Login } from '@/presentation/pages'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
    sut: RenderResult
    authenticationSpy: AuthenticationSpy
}

type SutParams = {
    validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    validationStub.errorMessage = params?.validationError
    const sut = render(
        <Router history={history}>
            <Login
                validation={validationStub}
                authentication={authenticationSpy}
            />
        </Router>,
    )
    return {
        sut,
        authenticationSpy,
    }
}

const simulateValidSubmit = async (
    sut: RenderResult,
    email = faker.internet.email(),
    password = faker.internet.password(),
): Promise<void> => {
    populateEmailField(sut, email)
    populatePasswordField(sut, password)
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
    await waitFor(() => form)
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

const testStatusForFied = (
    sut: RenderResult,
    fiedlName: string,
    validationError?: string,
): void => {
    const status = sut.getByTestId(`${fiedlName}-status`)
    expect(status.title).toBe(validationError || 'Tudo certo')
    expect(status.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const element = sut.getByTestId(fieldName)
    expect(element).toBeTruthy()
}

const testElementText = (
    sut: RenderResult,
    fieldName: string,
    text: string,
): void => {
    const element = sut.getByTestId(fieldName)
    expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (
    sut: RenderResult,
    fieldName: string,
    isDisabled: boolean,
): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

describe('Login Component', () => {
    afterEach(cleanup)
    beforeEach(() => {
        localStorage.clear()
    })

    test('Should start with initial state', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        testErrorWrapChildCount(sut, 0)
        testButtonIsDisabled(sut, 'submitButtom', true)
        testStatusForFied(sut, 'email', validationError)
        testStatusForFied(sut, 'password', validationError)
    })

    test('Should show email error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populateEmailField(sut)
        testStatusForFied(sut, 'email', validationError)
    })

    test('Should show password error if Validation fails', () => {
        const validationError = faker.random.words()
        const { sut } = makeSut({ validationError })
        populatePasswordField(sut)
        testStatusForFied(sut, 'password', validationError)
    })

    test('Should show valid password state if Validation succeeds', () => {
        const { sut } = makeSut()
        populatePasswordField(sut)
        testStatusForFied(sut, 'password')
    })

    test('Should show valid email state if Validation succeeds', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        testStatusForFied(sut, 'email')
    })

    test('Should enable submit button if form is valid', () => {
        const { sut } = makeSut()
        populateEmailField(sut)
        populatePasswordField(sut)
        testButtonIsDisabled(sut, 'submitButtom', false)
    })

    test('Should show spinner on submit', async () => {
        const { sut } = makeSut()
        await simulateValidSubmit(sut)
        testElementExists(sut, 'spinner')
    })

    test('Should call Authentication with correct values', async () => {
        const { sut, authenticationSpy } = makeSut()
        const email = faker.internet.email()
        const password = faker.internet.email()
        await simulateValidSubmit(sut, email, password)
        expect(authenticationSpy.params).toEqual({
            email,
            password,
        })
    })

    test('Should call Authentication only once', async () => {
        const { sut, authenticationSpy } = makeSut()
        await simulateValidSubmit(sut)
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(1)
    })

    test('Should not call Authentication if field is invalid', async () => {
        const validationError = faker.random.words()
        const { sut, authenticationSpy } = makeSut({ validationError })
        await simulateValidSubmit(sut)
        expect(authenticationSpy.callsCount).toBe(0)
    })

    test('Should show error if Athentication fails', async () => {
        const { sut, authenticationSpy } = makeSut()
        const error = new InvalidCredentialsError()
        jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(
            Promise.reject(error),
        )
        await simulateValidSubmit(sut)
        testElementText(sut, 'main-error', error.message)
        testErrorWrapChildCount(sut, 1)
    })

    test('Should add accessToken to localstorage on success', async () => {
        const { sut, authenticationSpy } = makeSut()
        await simulateValidSubmit(sut)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            'accessToken',
            authenticationSpy.account.accessToken,
        )
        expect(history.length).toBe(1)
        expect(history.location.pathname).toBe('/')
    })

    test('Should go to signup', () => {
        const { sut } = makeSut()
        const register = sut.getByTestId('signup')
        fireEvent.click(register)
        expect(history.length).toBe(2)
        expect(history.location.pathname).toBe('/signup')
    })
})
