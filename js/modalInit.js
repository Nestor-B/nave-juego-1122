import { d, app } from './global.js'

class Modal {
    constructor(){
        this.modal = d.createElement('div')
        this.modal.classList.add('Modal')
        app.appendChild(this.modal)
    }
    hidden(){
        this.modal.style.display = 'none'
        this.modal.hidden = true
    }
    startGame(){
        let container = d.createElement('div')
        this.modal.appendChild(container)
        container.classList.add('container-modal')
        container.innerHTML = `
            <div style='padding: 1em;'>
                <h3>Iniciar Juego</h3>
            </div>
            <div style='height: ${container.offsetHeight}px;background: #ccc;display: flex;justify-content: center;align-items: center;'>
                <button onclick="window.hiddenModal()"> Iniciar </button>
            </div>
        `
    }
}

let M = new Modal()

window.hiddenModal = () => M.hidden()

let startGame = () => M.startGame()

export {
    startGame
}