import { d, app } from './global.js'
import classAbstract from './classAbstract.js'

class EnemyNave extends classAbstract {
    constructor(opts){
        super()
        this.w = opts.w
        this.h = opts.h
        this.posX = null
        this.posY = null
        this.etapa = 0

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

                    e&&ene?app.removeChild(ene):null
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
            console.log( this.etapa )
            if ( this.etapa > 15 ) {
                this.enemy1(1, 2) 
            }else{
                this.enemy1(3, 4)
            }       
        }
        setTimeout(() => { this.moverBala() }, 100)
    }
    enemy1(min, max){
        this.etapa += 1
        let cantidad = this.random(min, max)
        for( let i=0;i<cantidad;i++ ){
            this.nave = d.createElement('div')
            app.appendChild(this.nave)
            this.nave.style.top = this.YAuto() + 'px' 
            this.nave.style.left = this.XAuto() + 'px' 
            this.nave.style.width = this.w + 'px' 
            this.nave.style.height = this.h + 'px'
            
            if( this.etapa >=0 && this.etapa <= 3 ){
                this.nave.classList.add('enemy1')
                this.nave.setAttribute('escudo', parseInt(this.random(3, 6)))
            }
            else if( this.etapa >=4 && this.etapa <= 8 ){
                this.nave.classList.add('enemy2')
                this.nave.setAttribute('escudo', parseInt(this.random(6, 9)))
            }
            else if( this.etapa > 8 && this.etapa <= 15 ){
                if(cantidad % 2 == 0){
                    this.nave.classList.add('enemy2')
                }else{
                    this.nave.classList.add('enemy1')
                }
                this.nave.setAttribute('escudo', parseInt(this.random(10, 15)))
            }
            else if( this.etapa > 15 && this.etapa <= 25 ){
                this.nave.classList.add('enemy2')
                this.nave.setAttribute('escudo', parseInt(this.random(6, 9)))
            }
            else if( this.etapa > 26 && this.etapa <= 35 ){
                this.nave.classList.add('enemy1')
            }
            else if( this.etapa > 35 && this.etapa <= 45 ){
                this.nave.classList.add('enemy2')
            }

            // this.nave.classList.add('_typenave_'+ parseInt(this.random(1, 2)) ) 
            this.nave.classList.add('enemy')
            this.nave.classList.add('v-enemy')
            this.nave.classList.add('solid')
            this.nave.setAttribute('d', this.random(1000, 10000))
            this.nave.setAttribute('m', [ this.nave.offsetLeft - 100, this.nave.offsetLeft - 50, this.nave.offsetLeft,  this.nave.offsetLeft + 50, this.nave.offsetLeft + 100 ] )

            const myevento = new Event('disparo')
            this.nave.addEventListener('disparo', (event)=>{
                let delay = parseInt(event.target.getAttribute('d'))
                setInterval((e) => {
                    if(e && e.offsetLeft != 0){
                        let arrPosX = e.getAttribute('m').split(',')
                        let num = parseInt(Math.random() * 2)
                        e.style.left = arrPosX[num] + 'px'
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