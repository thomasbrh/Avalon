// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default class ItemViewerManager
{
    constructor()
    {
        /**
         * Base
         */
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.isOpen = false
        this.model = null
        this.material = null


        /**
         * DOM
         */
        this.overlay = document.querySelector('.item-viewer')
        this.stage = document.querySelector('.item-viewer__stage')
        this.canvas = document.querySelector('.item-viewer__canvas')
        this.title = document.querySelector('.item-viewer__title')
        this.closeButton = document.querySelector('.item-viewer__close')


        /**
         * Appel des instances
         */
        this.update = this.update.bind(this)
        this.resize = this.resize.bind(this)
        this.setScene()
        this.setEvents()
    }


    setScene()
    {
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
        this.camera.position.set(0, 0, 4)

        this.renderer = new THREE.WebGLRenderer(
        {
            canvas: this.canvas,
            antialias: true
        })
        this.renderer.setClearColor('#2d1e35')
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.toneMapping = THREE.CineonToneMapping
        this.renderer.toneMappingExposure = 1.75

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enabled = false
        this.controls.enableDamping = true
        this.controls.enablePan = false

        // lumières pour les futurs GLB avec matériaux standards.
        this.scene.add(new THREE.HemisphereLight('#E8E0D4', '#3D2A47', 2))

        this.directionalLight = new THREE.DirectionalLight('#FAB56F', 3)
        this.directionalLight.position.set(3, 4, 5)
        this.scene.add(this.directionalLight)
    }


    setEvents()
    {
        this.closeButton.addEventListener('click', (event) =>
        {
            event.stopPropagation()
            this.close()
        })

        // bloque les rotations et les clics du viewer d'agir sur l'histoire.
        this.overlay.addEventListener('click', (event) => event.stopPropagation())
        this.overlay.addEventListener('pointerdown', (event) => event.stopPropagation())
        window.addEventListener('resize', this.resize)
    }


    open(journalElement)
    {
        this.clearModel()
        this.isOpen = true
        this.title.textContent = journalElement.title
        this.overlay.classList.remove('hidden')
        this.overlay.setAttribute('aria-hidden', 'false')
        this.controls.enabled = false
        this.resize()
        this.update()

        const model = this.loadModel(journalElement)

        if(!model) return

        this.model = model
        this.model.traverse((child) => child.visible = true)
        this.scene.add(this.model)
        this.controls.enabled = true
    }


    loadModel(journalElement)
    {
        // récupère uniquement l'objet demandé dans le GLB du viewer
        const sourceModel = this.resources.items.itemsViewModel.scene.getObjectByName(journalElement.modelName)

        if(!sourceModel)
        {
            console.error(`Objet ${journalElement.modelName} introuvable dans ItemsView.glb`)
            return null
        }

        const model = sourceModel.clone(true)
        this.setModelMaterial(model)

        return model
    }


    setModelMaterial(model)
    {
        // crée une seule fois le matériau partagé par les objets du viewer
        if(!this.material)
        {
            const lightmap = this.resources.items.itemsViewTextureLightmap
            const normalmap = this.resources.items.itemsViewTextureNormalmap

            lightmap.flipY = false
            lightmap.colorSpace = THREE.SRGBColorSpace
            normalmap.flipY = false
            lightmap.needsUpdate = true
            normalmap.needsUpdate = true

            this.material = new THREE.MeshStandardMaterial(
            {
                map: lightmap,
                normalMap: normalmap,
            })
        }

        model.traverse((child) =>
        {
            if(child.isMesh)
            {
                child.material = this.material
            }
        })
    }



    resize()
    {
        if(!this.isOpen) return

        const width = this.stage.clientWidth
        const height = this.stage.clientHeight

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height, false)
    }


    update()
    {
        if(!this.isOpen) return

        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        this.animationFrame = window.requestAnimationFrame(this.update)
    }


    close()
    {
        if(!this.isOpen) return

        this.isOpen = false
        this.controls.enabled = false
        this.overlay.classList.add('hidden')
        this.overlay.setAttribute('aria-hidden', 'true')
        window.cancelAnimationFrame(this.animationFrame)
        this.clearModel()
    }


    clearModel()
    {
        if(!this.model) return

        this.scene.remove(this.model)
        this.model = null
    }
}
