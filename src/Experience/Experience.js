// import des sources
import sources from './sources.js'

// import base
import StoryManager from './Managers/StoryManager.js'
import Resources from './Utils/Resources.js'
import LoadingOverlay from './Utils/LoadingOverlay.js'
import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import World from './World/World.js'
import Renderer from './Renderer.js'

// import des librairies
import * as THREE from 'three'

// initialise l'instance
let instance = null


export default class Experience
{

    constructor(_canvas)
    {

        // Singleton // permets de pas recréer d'instance a chaque appel new ...()
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access // accès console
        window.experience = this

        // Options
        this.canvas = _canvas

        /**
         * Setup / Base 
         */
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.storyManager = new StoryManager()
        this.audioContext = new AudioContext();
        this.audioListener = new THREE.AudioListener()

        /**
         * inisialisations 
         */
        this.isMuted = false


        /**
         * DOM
         */
        this.audioBtn = document.querySelector('.audio-btn')
        // écoute du btn
        this.audioBtn.addEventListener('click', () => {
            this.toggleGlobalAudio()
        })


        /**
         * Loading overlay
         */
        this.loadingOverlay = new LoadingOverlay()
        this.loadingOverlay.setOverlay()

        // progrès du chargement
        this.resources.on('progress', (progress) =>
        {
            // calcul des assets chargé / total
            this.loadingOverlay.updateProgress(progress)
        })
        
        // fin du chargement
        this.resources.on('ready', () =>
        {

            // environment map
            // récupére la texture chargée
            const envMap = this.resources.items.environmentMapTexture
            // map en fond d'écran
            this.scene.background = envMap
            // source de lumière (reflets sur les modèles)
            this.scene.environment = envMap

            // laodingProgress
            // force le pogresse à 100%
            this.loadingOverlay.updateProgress(1)
            // cache l'overlay
            this.loadingOverlay.hideOverlay()
            // ajoute le bouton pour commencer
            this.loadingOverlay.setStartExperience()
            // affiche le bouton pour commencer
            this.loadingOverlay.showStartExperience()

        })
        

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })


        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })


        /**
         * Appel des instances
         */
        this.setAudio()

    }


    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }


    // tick fonction pour mettre à jour
    update()
    {
        this.camera.update()
        this.world.update()

        // portal shaders
        this.loadingOverlay.update()

        this.renderer.update()
    }


    /**
     * Audio
     */
    setAudio()
    {
        this.camera.instance.add(this.audioListener)
        // chargé le son
        this.backgroundMusic = new THREE.Audio(this.audioListener)
    }


    startAudio()
    {
        // récupère le path chargé dans Resources
        this.buffer = this.resources.items.ambiantMusic
        
        if(this.buffer) 
        {
            this.backgroundMusic.setBuffer(this.buffer)
            this.backgroundMusic.setLoop(true)
            this.backgroundMusic.setVolume(0.1)
            this.backgroundMusic.play()
        }
    }


    /**
     * Gestion du son
     */
    toggleGlobalAudio()
    {
        this.isMuted = !this.isMuted

        // change le volume de l'AudioListener
        this.audioListener.setMasterVolume(this.isMuted ? 0 : 1)
        // maj bouton
        this.audioBtn.classList.toggle('is-muted', this.isMuted)
    }


    destroy()
    {

        this.sizes.off('resize')
        this.time.off('tick')


        // Traverse the whole scene
        this.scene.traverse((child) =>
        {

            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }

        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
        {
            this.debug.gui.destroy()
        }
            
    }
    
}