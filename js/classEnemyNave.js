import { d, app } from './global.js'
import classAbstract from './classAbstract.js'

class EnemyNave extends classAbstract {
    constructor(opts){
        super()
        this.w = opts.w
        this.h = opts.h
        this.posX = null
        this.posY = null

        this.moverBala()
        this.colisionBala()
    }
    colisionBala(){
        let fire1 = d.querySelectorAll('._fire_enemy_')
        let ene = d.querySelectorAll('.nave')[0]   
        
        fire1.forEach((e) => {
            if(e && ene && e.offsetLeft>=ene.offsetLeft - e.offsetWidth&&e.offsetLeft<=ene.offsetLeft+ene.offsetHeight 
                && e.offsetTop>=ene.offsetTop-6&&e.offsetTop<=ene.offsetTop+ene.offsetHeight){
                 
                    let s = new Audio('./sound/explosion.mp3')
                    s.volume = 0.6
                    s.play()
                        
                    let x = d.createElement('div')
                    x.classList.add('explosion')
                    x.style.top = ene.offsetTop + 'px'
                    x.style.left = ( ene.offsetLeft - 4) + 'px'
                    app.appendChild(x)

                    app.removeChild(ene)
                    if( !e.classList.contains('circle-fire') ){
                        app.removeChild(e)
                    }

                setTimeout(() => app.removeChild(x), 700)
            }
        })
        setTimeout(() => { this.colisionBala() }, 10)
    }
    moverBala(){
        let fire1 = d.querySelectorAll('._fire_enemy_')

        fire1.forEach(e => {
            let y = e.offsetTop
            let x = e.offsetLeft
            let h = e.offsetHeight + 30
            if( y >= innerHeight ){
                app.removeChild(e)
            }
            e.style.top = (++y+h) + 'px'
        })
        if( d.querySelectorAll('.enemy').length == 1){
            this.enemy1(5, 7)       
        }
        setTimeout(() => { this.moverBala() }, 100)
    }
    enemy1(min, max){
        let cantidad = this.random(min, max)
        for( let i=0;i<cantidad;i++ ){
            this.nave = d.createElement('div')
            app.appendChild(this.nave)
            this.nave.style.top = this.YAuto() + 'px' 
            this.nave.style.left = this.XAuto() + 'px' 
            this.nave.style.width = this.w + 'px' 
            this.nave.style.height = this.h + 'px'
            // this.nave.classList.add('_typenave_'+ parseInt(this.random(1, 2)) ) 
            this.nave.classList.add('enemy')
            this.nave.classList.add('solid')
            this.nave.setAttribute('d', this.random(700, 10000))

            const myevento = new Event('disparo')
            this.nave.addEventListener('disparo', (event)=>{
                let delay = parseInt(event.target.getAttribute('d'))
                setInterval((e) => {
                    if(e && e.offsetLeft != 0){
                        let fire = d.createElement('div')
                        fire.classList.add('_fire_enemy_')
                        fire.style.top = e.offsetTop + 'px'
                        fire.style.left = e.offsetLeft + 15 + 'px'
                        app.appendChild(fire)
                    }
                }, delay, event.target);
            })
            this.nave.dispatchEvent(myevento)
        }
    }

    /* 
    var event = new Event('D');
					ovni.addEventListener('D', function(){
						setTimeout(D, 100, ovni)
					})
					ovni.dispatchEvent(event);
    */

    random(min, max){
        return Math.random() * ( max - min) + min
    }
    XAuto(){
        return Math.random() * ( (innerWidth - this.w)  - this.w) + this.w
    }
    YAuto(){
        return Math.random() * ( (innerHeight/2 - 100) - this.w ) + this.w
    }
}

let enemy = new EnemyNave({
    w: 40,
    h: 50
})

export {
    enemy
}