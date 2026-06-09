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
        this.loadPromises = {}
        this.groupPromises = {}
        this.groupSources = {}
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


    /**
     * Start
     */
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


    /**
     * Deferred
     */
    loadSources(sources)
    {
        return Promise.all(sources.map((source) => this.loadSource(source)))
    }


    loadGroup(name, sources)
    {
        this.groupSources[name] = sources

        if(!this.groupPromises[name])
        {
            this.groupPromises[name] = this.loadSources(sources)
        }

        return this.groupPromises[name]
    }


    loadGroupsInOrder(groups)
    {
        let queue = Promise.resolve()

        for(const [name, sources] of Object.entries(groups))
        {
            queue = queue.then(() => this.loadGroup(name, sources))
        }

        return queue
    }


    loadSource(source)
    {
        if(this.items[source.name])
            return Promise.resolve(this.items[source.name])

        if(this.loadPromises[source.name])
            return this.loadPromises[source.name]

        this.loadPromises[source.name] = new Promise((resolve, reject) =>
        {
            const onLoad = (file) =>
            {
                this.items[source.name] = file
                resolve(file)
            }

            const onError = (error) =>
            {
                console.error(`crash : ${source.path}`)
                console.error(error)
                reject(error)
            }

            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(source.path, onLoad, undefined, onError)
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(source.path, onLoad, undefined, onError)
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(source.path, onLoad, undefined, onError)
            }
            else if(source.type === 'audio')
            {
                this.loaders.audioLoader.load(source.path, onLoad, undefined, onError)
            }
        })

        return this.loadPromises[source.name]
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
