// @flow

import 'babel-polyfill'
import Game from './game'
import { APP_NAME, APP_CONTAINER_SELECTOR } from '../shared/config'

const app: any = document.querySelector(APP_CONTAINER_SELECTOR)
app.innerHTML = `
<h1>${APP_NAME}</h1>
`

const game = new Game()
