import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import { Header, Input, FormStatus, Footer } from '@/presentation/components'

import Context from '@/presentation/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
    validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: '',
    })

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('password', state.password),
        })
    }, [state.email, state.password])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        setState({ ...state, isLoading: true })
    }

    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={{ state, setState }}>
                <form className={Styles.form} onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                    />

                    <button
                        data-testid="submitButtom"
                        className={Styles.submit}
                        type="submit"
                        disabled={!!state.emailError || !!state.passwordError}
                    >
                        Entrar
                    </button>
                    <span className={Styles.link}>Criar Conta</span>
                    <FormStatus />
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Login
