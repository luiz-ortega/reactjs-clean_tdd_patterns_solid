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
    })
})
