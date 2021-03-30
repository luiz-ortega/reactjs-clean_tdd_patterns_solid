import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
    test('Should start with initial state', () => {
        const { getByTestId } = render(<Login />)

        const errorWrap = getByTestId('errorWrap')

        expect(errorWrap.childElementCount).toBe(0)

        const submitButtom = getByTestId('submitButtom') as HTMLButtonElement
        expect(submitButtom.disabled).toBe(true)

        const emailStatus = getByTestId('email-status')
        expect(emailStatus.title).toBe('Campo obrigatório')
        expect(emailStatus.textContent).toBe('🔴')

        const passwordStatus = getByTestId('password-status')
        expect(passwordStatus.title).toBe('Campo obrigatório')
        expect(passwordStatus.textContent).toBe('🔴')
    })
})
