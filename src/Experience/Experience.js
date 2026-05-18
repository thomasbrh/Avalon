// import des sources
import sources from './sources.js'

// import utils
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'

// import base
import Camera from './Camera.js'
import World from './World/World.js'
import Renderer from './Renderer.js'

// import Manager
import AudioManager from './Managers/AudioManager.js'
import StoryManager from './Managers/StoryManager.js'
import LoadingManager from './Managers/LoadingManager.js'

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


        /**
         * LoadingManager
         */
        this.loadingManager = new LoadingManager()
        this.loadingManager.setOverlay()

        // progrès du chargement
        this.resources.on('progress', (progress) =>
        {
            // calcul des assets chargé / total
            this.loadingManager.updateProgress(progress)
        })
        
        // fin du chargement
        this.resources.on('ready', () =>
        {

            // setup la première camera
            const cameraModel = this.resources.items.CameraModel
            if(cameraModel) 
            {
                this.camera.setupCamera(cameraModel.scene)
            }

            // environment map
            // récupére la texture chargée
            const envMap = this.resources.items.environmentMapTexture
            // map en fond d'écran
            this.scene.background = envMap
            // reflets de la lumière sur les modèles
            this.scene.environment = envMap

            // laodingProgress
            // force le pogresse à 100%
            this.loadingManager.updateProgress(1)
            // cache l'overlay
            this.loadingManager.hideOverlay()
            // ajoute le bouton pour commencer
            this.loadingManager.setStartExperience()
            // affiche le bouton pour commencer
            this.loadingManager.showStartExperience()

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
        this.loadingManager.update()

        this.renderer.update()
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