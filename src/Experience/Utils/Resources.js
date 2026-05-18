// import base
import EventEmitter from './EventEmitter.js'

// import librairies
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


export default class Resources extends EventEmitter
{

    constructor(sources)
    {

        // extends EventEmitter
        super()


        /**
         * Setup
         */
        this.sources = sources
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0


        /**
         * Appel des instances
         */
        this.setLoaders()
        this.startLoading()

    }


    setLoaders()
    {

        // on crée tous nos loaders
        this.loaders = {}

        // draco loader pour compression
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco/')

        // gltf loader
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
 
        // texture laoder
        this.loaders.textureLoader = new THREE.TextureLoader()

        // environment map loader
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

        // audio loader
        this.loaders.audioLoader = new THREE.AudioLoader()
    }


    startLoading()
    {

        // Load each source
        for(const source of this.sources)
        {

            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                    ,
                    (progress) => 
                    {
                    },
                    (error) => 
                    {
                        console.error(`crash : ${source.path}`)
                        console.error(error)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if (source.type === 'audio')
            {
                this.loaders.audioLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }

        }

    }


    // LoadingManager
    sourceLoaded(source, file)
    {

        this.items[source.name] = file
        this.loaded++

        const progress = this.loaded / this.toLoad
        this.trigger('progress', [progress])

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
        
    }
    
}