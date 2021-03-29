import login from '@/presentation/pages/login/login'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={login} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router
