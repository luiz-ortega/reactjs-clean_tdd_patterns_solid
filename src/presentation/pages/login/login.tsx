import React, { useEffect, useState } from 'react'
import Styles from './login-styles.scss'
import { Header, Input, FormStatus, Footer } from '@/presentation/components'

import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'

type Props = {
    validation: Validation
    authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
    const history = useHistory()
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

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault()
        try {
            if (state.isLoading || state.emailError || state.passwordError) {
                return
            }
            setState({ ...state, isLoading: true })
            const account = await authentication.auth({
                email: state.email,
                password: state.password,
            })
            localStorage.setItem('accessToken', account.accessToken)
            history.replace('/')
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message,
            })
        }
    }

    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={{ state, setState }}>
                <form
                    className={Styles.form}
                    data-testid="form"
                    onSubmit={handleSubmit}
                >
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
                    <Link
                        to="/signup"
                        data-testid="signup"
                        className={Styles.link}
                    >
                        Criar Conta
                    </Link>
                    <FormStatus />
                </form>
            </Context.Provider>

            <Footer />
        </div>
    )
}

export default Login
