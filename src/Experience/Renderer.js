// import base
import Experience from './Experience.js'

// import librairies
import * as THREE from 'three'


export default class Renderer
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera


        /**
         * Appel des instances
         */
        this.setInstance()

    }


    setInstance()
    {

        // crée un renderer
        this.instance = new THREE.WebGLRenderer(
        {
            canvas: this.canvas,
            antialias: true
        })
        // filtre color
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75

        // shadow setup
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap

        // backgroundColor
        /* this.instance.setClearColor('#161616') */

        // calcul sizes + pixelRatio
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

    }


    resize()
    {
        // maj de la size et du PixelRatio (changement de screen)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }


    update()
    {
        // maj du rendu
        this.instance.render(this.scene, this.camera.instance)
    }
    
}