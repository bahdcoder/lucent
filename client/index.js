import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Main } from './Main'
import Pangaso from './Pangaso'

window.Pangaso = Pangaso

const app = document.getElementById('app')

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
    app
)
