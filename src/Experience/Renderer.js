// import base
import Experience from './Experience.js'

// import librairies
import * as THREE from 'three'

// import composer
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'


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


        // post-processing
        this.composer = new EffectComposer(this.instance)
        this.composer.setSize(this.sizes.width, this.sizes.height)
        this.composer.setPixelRatio(this.sizes.pixelRatio)

        this.composer.addPass(new RenderPass(this.scene, this.camera.instance))

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.sizes.width, this.sizes.height),
            0.4, // strength
            0.3, // radius
            0.98 // threshold a fond pour target les orbes only
        )
        this.composer.addPass(this.bloomPass)

        this.composer.addPass(new OutputPass())

    }


    resize()
    {
        // maj de la size et du PixelRatio (changement de screen)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)

        // maj du composer
        this.composer.setSize(this.sizes.width, this.sizes.height)
        this.composer.setPixelRatio(this.sizes.pixelRatio)
        this.bloomPass.resolution.set(this.sizes.width, this.sizes.height)
    }


    update()
    {
        // s'applique au start
        if(this.experience.loadingManager.experienceStarted)
        {
            this.composer.render()
        }
        else
        {
            this.instance.render(this.scene, this.camera.instance)
        }
    }
    
}