import { render, RenderResult } from '@testing-library/react'
import React from 'react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
    return render(
        <Context.Provider value={{ state: {} }}>
            <Input name="field" />
        </Context.Provider>,
    )
}

describe('InputComponent', () => {
    test('Should begin with readOnly', () => {
        const sut = makeSut()
        const input = sut.getByTestId('field') as HTMLInputElement
        expect(input.readOnly).toBe(true)
    })
})
