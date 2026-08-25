// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'


export default class Items
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.canvas = this.experience.canvas


        /**
         * Récupération des ressources
         */
        this.itemsTextureLightmap = this.resources.items.itemsTextureLightmap
        this.itemsTextureNormalmap = this.resources.items.itemsTextureNormalmap
        this.model = this.resources.items.itemsModel.scene


        /**
         * Objets à trouver
         */
        this.itemJournalIds =
        {
            'Graal': 'object-graal',
            'Stick': 'object-baton-merlin',
            'Coin': 'object-tas-or',
            'Book': 'object-grimoire-merlin',
            'Potion01': 'object-potion-1',
            'Potion02': 'object-potion-2',
            'Crown': 'object-couronne',
        }


        /**
         * Initialisation
         */
        this.itemHitboxes = []
        this.currentIntersection = null
        this.isSearching = false
        this.isPointerOverInterface = false
        this.minimumHitboxRadius = 0.75
        // hitbox
        this.showHitboxes = false
        this.interfaceSelector = 'button, a, .journal, .item-viewer, .mobile-controls, #choices-container'
        this.hitboxMaterial = new THREE.MeshBasicMaterial(
        {
            color: 0xff00ff,
            wireframe: true,
            transparent: true,
            opacity: 0.65,
            depthTest: false,
            visible: this.showHitboxes,
        })


        /**
         * Raycaster
        */
        this.raycaster = new THREE.Raycaster()
        this.raycaster.far = 55
        this.mouse = new THREE.Vector2()
        this.crosshair = document.querySelector('.crosshair')
        this.onItemClick = this.onItemClick.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)


        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()
        this.setHitboxes()
        window.addEventListener('click', this.onItemClick, true)
        window.addEventListener('mousemove', this.onMouseMove)

    }


    /**
     * Textures
     */
    setTexture()
    {

        // Réglages texture
        this.itemsTextureLightmap.flipY = false
        this.itemsTextureLightmap.colorSpace = THREE.SRGBColorSpace

        // Matériau
        this.itemsMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.itemsTextureLightmap,

            normalMap: this.itemsTextureNormalmap,
        })

        // Applique le matériau à tous les meshes du modèle
        this.model.traverse((child) =>
        {

            if(child.isMesh)
            {
                child.material = this.itemsMaterial
            }

        })

    }


    /**
     * Ajoute le GLB des objets dans la scène
     */
    setModel()
    {
        this.scene.add(this.model)
        this.model.updateMatrixWorld(true)
    }


    /**
     * Hitbox invisible
     */
    setHitboxes()
    {
        this.model.traverse((child) =>
        {
            const journalId = this.itemJournalIds[child.name]

            if(child.isMesh && journalId)
            {
                child.userData.journalId = journalId

                // sphère hitbox
                const box = new THREE.Box3().setFromObject(child)
                const boundingSphere = box.getBoundingSphere(new THREE.Sphere())
                const radius = Math.max(boundingSphere.radius, this.minimumHitboxRadius)

                const hitbox = new THREE.Mesh(
                    new THREE.SphereGeometry(radius, 12, 8),
                    this.hitboxMaterial
                )

                hitbox.position.copy(boundingSphere.center)
                hitbox.name = `${child.name}_hitbox`
                hitbox.userData.item = child
                hitbox.updateMatrixWorld()
                this.scene.add(hitbox)

                this.itemHitboxes.push(hitbox)
            }
        })

    }


    /**
     * Récupère l'objet visé
     */
    onItemClick(event)
    {
        if(!this.isSearching || !this.currentIntersection) return
        if(event.target.closest(this.interfaceSelector)) return

        event.preventDefault()
        event.stopImmediatePropagation()
        this.collectItem(this.currentIntersection.object)
    }


    /**
     * Crossair
     */
    // garde la position du viseur à la même place que la souris
    onMouseMove(event)
    {
        // position de la souris par rapport à la zone rendue par le canvas
        const canvasBounds = this.canvas.getBoundingClientRect()
        const canvasX = event.clientX - canvasBounds.left
        const canvasY = event.clientY - canvasBounds.top

        this.mouse.x = (canvasX / canvasBounds.width) * 2 - 1
        this.mouse.y = - (canvasY / canvasBounds.height) * 2 + 1
        this.isPointerOverInterface = Boolean(
            event.target.closest(this.interfaceSelector)
        )

        this.crosshair.style.left = `${event.clientX}px`
        this.crosshair.style.top = `${event.clientY}px`
    }


    /**
     * Update
     */
    // check à chaque frame si le viseur touche une des hitbox
    update()
    {
        if(!this.isSearching || this.crosshair.classList.contains('is-found')) return

        // recalcul du hover à chaque frame
        this.camera.updateMatrixWorld()
        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersections = this.raycaster.intersectObjects(this.itemHitboxes)
        this.currentIntersection = intersections[0] || null
        const isOverItem = !this.isPointerOverInterface && Boolean(this.currentIntersection)

        document.body.classList.toggle('is-targeting-item', isOverItem)
        this.crosshair.classList.toggle('hidden', !isOverItem)
    }


    /**
     * Cache l'objet
     */
    collectItem(hitbox)
    {
        const item = hitbox.userData.item

        // hide l'objet et l'enlève des prochains tests du raycaster
        item.visible = false
        this.itemHitboxes = this.itemHitboxes.filter((itemHitbox) => itemHitbox !== hitbox)
        this.scene.remove(hitbox)
        hitbox.geometry.dispose()
        this.currentIntersection = null

        // débloque l'objet dans le journal
        this.experience.storyManager.journalManager.unlock(item.userData.journalId)

        // feedback du viseur
        this.crosshair.classList.add('is-found')
        window.clearTimeout(this.crosshairTimeout)
        this.crosshairTimeout = window.setTimeout(() =>
        {
            this.crosshair.classList.remove('is-found')
            this.crosshair.classList.add('hidden')
            document.body.classList.remove('is-targeting-item')
        }, 250)
    }



    startSearch()
    {
        this.isSearching = true
    }


    stopSearch()
    {
        this.isSearching = false
        this.currentIntersection = null
        document.body.classList.remove('is-targeting-item')
        this.crosshair.classList.add('hidden')
    }


    /**
     * Nettoyage du modèle et des events
     */
    dispose()
    {
        window.removeEventListener('click', this.onItemClick, true)
        window.removeEventListener('mousemove', this.onMouseMove)
        window.clearTimeout(this.crosshairTimeout)
        this.itemHitboxes.forEach((hitbox) =>
        {
            this.scene.remove(hitbox)
            hitbox.geometry.dispose()
        })
        this.hitboxMaterial.dispose()
        this.itemsMaterial.dispose()
        this.itemsTextureLightmap.dispose()
        this.itemsTextureNormalmap.dispose()
        this.model.traverse((child) =>
        {
            if (child.isMesh)
            {
                child.geometry.dispose()
            }
        })
        this.scene.remove(this.model)
    }

}
