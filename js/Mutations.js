import initControl from './control.js'

function ObservarMutacion(elem, func){
    var m=new MutationObserver((e)=>{
        if( e[0].target.hidden ) {
            let s = new Audio('./sound/music.mp3')
            s.volume = 0.6
            s.loop = true
            s.play()
        }
        initControl()
    })
    document.querySelectorAll(elem).forEach((e)=>{
        m.observe(e, {
            attributes: true
        })
    })
}
ObservarMutacion(".Modal")

export default ObservarMutacion