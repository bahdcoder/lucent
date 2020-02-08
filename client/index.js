import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Main } from './Main'
import Lucent from './Lucent'

window.Lucent = Lucent

const app = document.getElementById('app')

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
    app
)
