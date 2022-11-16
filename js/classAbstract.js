import { d, app, puntos } from './global.js'

class classAbstract {
    constructor(){
        this.puntos = 0
    }
    colisionBala(e){
        let fire1 = d.querySelectorAll('._fire_')
        let enemy1 = d.querySelectorAll(e)   
        
        fire1.forEach((e) => {
            enemy1.forEach((ene) => {
                if(e && ene && e.offsetLeft>=ene.offsetLeft - e.offsetWidth&&e.offsetLeft<=ene.offsetLeft+ene.offsetHeight 
                    && e.offsetTop>=ene.offsetTop-6&&e.offsetTop<=ene.offsetTop+ene.offsetHeight){
                        let nivelEscudo = parseInt(ene.getAttribute('escudo'))
                        let s = new Audio('./sound/explosion.mp3')
                        s.volume = 0.6
                        s.play()

                        document.querySelector('#puntos').innerText = ++this.puntos
                            
                        let x = d.createElement('div')
                        x.classList.add('explosion')
                        x.style.top = ene.offsetTop + 'px'
                        x.style.left = ( ene.offsetLeft - 4) + 'px'
                        app.appendChild(x)

                        if( nivelEscudo > 0 ){
                            let n = nivelEscudo -= 1
                            ene.setAttribute('escudo', n)
                            ene.classList.add('protection')
                        }else{
                            if(nivelEscudo == 0){
                                ene?app.removeChild(ene):null
                                if( !e.classList.contains('circle-fire') ){
                                    app.removeChild(e)
                                }
                                if(x.offsetTop == 0){
                                    app.removeChild(x)
                                }
                            }
                        }

                    setTimeout(() => app.removeChild(x), 700)
                }
            })
        })
        setTimeout(() => { this.colisionBala(e) }, 10)
    }
}

export default classAbstract