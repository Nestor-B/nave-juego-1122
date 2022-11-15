import { w } from './global.js'
import { startGame } from './modalInit.js'
import ObservarMutacion from './Mutations.js'

const loaded = () => {
    startGame()
    ObservarMutacion
}

w.addEventListener('load', loaded)