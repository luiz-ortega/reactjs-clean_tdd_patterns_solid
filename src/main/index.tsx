import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factories/login/login-factory'
import { Router } from '@/presentation/components'

ReactDOM.render(
    <Router makeLogin={makeLogin} />,
    document.getElementById('main'),
)
