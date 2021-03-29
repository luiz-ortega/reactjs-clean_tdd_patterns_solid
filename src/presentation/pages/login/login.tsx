import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Header, Input, FormStatus, Footer } from '@/presentation/components'

import Context from '@/presentation/form/form-context'

type StateProps = {
    isLoading: boolean
    erroMessage: string
}

const Login: React.FC = () => {
    const [state] = useState<StateProps>({
        isLoading: false,
        erroMessage: '',
    })

    return (
        <div className={Styles.login}>
            <Header />

            <Context.Provider value={state}>
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

                    <button className={Styles.submit} type="submit">
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
