import { w } from './global.js'
import { startGame } from './modalInit.js'
import ObservarMutacion from './Mutations.js'

const loaded = () => {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        document.querySelector('#buttonsDevices').style.display = 'flex'
    }

    startGame()
    ObservarMutacion
}

w.addEventListener('load', loaded)