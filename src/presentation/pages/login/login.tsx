import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Header, Input, FormStatus, Footer } from '@/presentation/components'

import Context from '@/presentation/form/form-context'

const Login: React.FC = () => {
    const [state] = useState({
        isLoading: false,
    })

    const [errorState] = useState({
        email: 'Campo obrigatório',
        password: 'Campo obrigatório',
        mainError: '',
    })

    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={{ state, errorState }}>
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
