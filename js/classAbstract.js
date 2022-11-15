import { d, app } from './global.js'

class classAbstract {
    constructor(){
        
    }
    colisionBala(e){
        let fire1 = d.querySelectorAll('._fire_')
        let enemy1 = d.querySelectorAll(e)   
        
        fire1.forEach((e) => {
            enemy1.forEach((ene) => {
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
        })
        setTimeout(() => { this.colisionBala(e) }, 10)
    }
}

export default classAbstract