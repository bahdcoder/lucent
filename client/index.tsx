import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Main } from './Main'
import Pangaso from './Pangaso'
;(window as any).Pangaso = Pangaso

const app: HTMLElement | null = document.getElementById('app')

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
    app
)
