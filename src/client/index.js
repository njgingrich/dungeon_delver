// @flow

import 'babel-polyfill'
import Game from './game'
import { APP_CONTAINER_SELECTOR } from '../shared/config'

const app: any = document.querySelector(APP_CONTAINER_SELECTOR)
app.innerHTML = `
<div class="container">
  <canvas id="canvas" tabindex=1></canvas>
</div>
`

const game = new Game()
game.run()
