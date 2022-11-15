import { d } from './global.js'
import { OnNave, nave } from './classNave.js'
import { enemy } from './classEnemyNave.js'

window.stop = null
let t = {}

let keepFiring = (prop, value) => {
    clearInterval(window.stop, 1)
    if( prop && value ){
        t[prop] = value
    }else{
        let s = JSON.stringify(t).slice(2, 3)
        window.stop = setInterval(() => {
            nave.firing(s)
        }, 100)
    }
}

let stopFiring = (e) => {
    setTimeout(() => {
        if(e == 'd') clearInterval(window.stop, 1)
        if(e == 'f') clearInterval(window.stop, 1)
        if(e == 'e') clearInterval(window.stop, 1)
    }, 2000)
}

let initControl = () => {
    OnNave()
    enemy.enemy1(1, 5)
    d.addEventListener('keydown', (event) => {
        if(event.keyCode == 38) { nave.moveY('top'); keepFiring() }
        if(event.keyCode == 40) { nave.moveY('bottom'); keepFiring() }
        if(event.keyCode == 37) { nave.moveX('left'); keepFiring() }
        if(event.keyCode == 39) { nave.moveX('right'); keepFiring() }
        if(event.keyCode == 68) { nave.firing('d'); keepFiring('d', 68) }
        if(event.keyCode == 70) { nave.firing('f'); keepFiring('f', 70) }
        if(event.keyCode == 69) { nave.firing('e'); keepFiring('e', 69) }
        // console.log(t)
    })
    d.addEventListener('keyup', (event) => {
        delete t[event.key]
        stopFiring(event.key)
    })
    d.addEventListener('touchstart', (event) => {
        console.log(event)
    })
}

export default initControl