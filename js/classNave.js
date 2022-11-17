import { d, app } from './global.js'
import classAbstract from './classAbstract.js'

var active = false
class Nave extends classAbstract {
    constructor(opts){
        super()
        this.nave = d.createElement('div')
        this.w = opts.w
        this.h = opts.h
        this.posX = null
        this.posY = null
        app.appendChild(this.nave)
        this.nave.setAttribute('escudo', 0)
        this.nave.classList.add('nave')
        this.nave.classList.add('solid')
        this.nave.style.width = opts.w + 'px' 
        this.nave.style.height = opts.h + 'px' 

        this.moveFire()
        this.colisionBala('.enemy.solid')
    }
    moveFire(){
        let fire1 = d.querySelectorAll('._fire_')

        fire1.forEach(e => {
            let y = e.offsetTop
            let x = e.offsetLeft
            
            let h = e.offsetHeight + 30
            if( y <= -e.offsetHeight - 100 ){
                app.removeChild(e)
            }

            if( e.classList.contains('_fire_0') ){
                e.style.left = (--x-10) + 'px'
                e.style.top = (--y-h) + 'px'
            }
            if( e.classList.contains('_fire_2') ){
                e.style.left = (++x+10) + 'px'
                e.style.top = (--y-h+1) + 'px'
            }
            if( e.classList.contains('_fire_1') ){
                e.style.top = (--y-h) + 'px'
            }
        })
        setTimeout(() => { this.moveFire() }, 80)
    }
    firing(t){
        if( d.querySelectorAll('.nave')[0] ){
            if( t === 'd' ){
                if( active === false ){
                    active = true
                    
                    let s = new Audio('./sound/disparo1.mp3')
                    s.volume = 0.6
                    s.play()
    
                    for (let i = 0; i < 3; i++) {
                        let fire = d.createElement('div')
                        fire.classList.add('_fire_' + i)
                        fire.classList.add('_fire_')
                        fire.style.top = this.nave.offsetTop + 'px'
                        fire.style.left = this.nave.offsetLeft + 15 + 'px'
                        app.appendChild(fire)
                    }
                    setTimeout(() => { active = false }, 1100)
                }
            }
            if( t === 'f' ){
                if( active === false ){
                    active = true
                    
                    let s = new Audio('./sound/disparo2.mp3')
                    s.volume = 0.6
                    s.play()
    
                    let fire = d.createElement('div')
                    fire.classList.add('_fire_1')
                    fire.classList.add('_fire_')
                    fire.style.top = this.nave.offsetTop + 'px'
                    fire.style.left = this.nave.offsetLeft + 15 + 'px'
                    app.appendChild(fire)
                    setTimeout(() => { active = false }, 500)
                }
            }
            if( t === 'e' ){
                if( active === false ){
                    active = true
    
                    let s = new Audio('./sound/cargalaser.mp3')
                    s.volume = 0.6
                    s.play()
    
                    let fire = d.createElement('div')
                    fire.classList.add('_fire_1')
                    fire.classList.add('circle-fire')
                    fire.style.height = '100px'
                    fire.style.width = '100px'
                    // fire.style.border = '1px solid gold'
                    fire.style.backgroundColor = 'transparent'
                    fire.style.boxShadow = '0 0 30px 10px transparent'
                    fire.style.top = ( this.nave.offsetTop - 25 ) + 'px'
                    fire.style.left = ( this.nave.offsetLeft - 30 ) + 'px'
                    app.appendChild(fire)
                    setTimeout(() => {  
                        fire.style.backgroundColor = 'gold'
                        fire.style.boxShadow = '0 0 30px 10px gold'
                        fire.classList.add('_fire_')
                        let s = new Audio('./sound/laser.mp3')
                        s.volume = 0.8
                        s.play()
                    }, 2000)
                    setTimeout(() => { active = false }, 2000)
                }
            }
        }
    }
    moveX(e){
        this.posX = this.nave.offsetLeft
        if( e === 'left' ){
            if( this.posX <= this.w ) return
            this.nave.style.left = (--this.posX - this.h) + 'px'
        }
        if( e === 'right' ){
            if( this.posX >= app.offsetWidth - ( this.w + 50) ) return
            this.nave.style.left = (++this.posX + this.h) + 'px'
        }
    }
    moveY(e){
        this.posY = this.nave.offsetTop
        if( e === 'top' ){
            this.nave.style.top = (--this.posY - this.h) + 'px'
        }
        if( e === 'bottom' ){
            this.nave.style.top = (++this.posY + this.h) + 'px'
        }
    }
}

var nave = null
let OnNave = () => {
    nave = new Nave({
        w: 40,
        h: 50
    })
}

export { OnNave, nave }