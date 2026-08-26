// import base
import EventEmitter from './EventEmitter.js'


export default class Sizes extends EventEmitter
{
    
    constructor()
    {

        // extends EventEmitter
        super()


        /**
         * Setup
         */
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.isMobile = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
        this.pixelRatio = this.getPixelRatio()

        // Resize event
        window.addEventListener('resize', () =>
        {

            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = this.getPixelRatio()

            this.trigger('resize')

        })

    }


    getPixelRatio()
    {
        // Le post-processing multiplie les render targets sur les écrans Retina.
        const maxPixelRatio = this.isMobile ? 1.5 : 2
        return Math.min(window.devicePixelRatio, maxPixelRatio)
    }

}
