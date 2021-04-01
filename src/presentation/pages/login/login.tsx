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
        emailError: 'Campo obrigatório',
        passwordError: 'Campo obrigatório',
        mainError: '',
    })

    useEffect(() => {
        validation.validate('email', state.email)
    }, [state.email])

    useEffect(() => {
        validation.validate('password', state.password)
    }, [state.password])

    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={{ state, setState }}>
                <form className={Styles.form}>
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
                        disabled
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
