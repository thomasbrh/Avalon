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
            // Three.js remplace les espaces des noms dans Blender par des _
            'Graal': 'object-graal',
            'Baton_de_Merlin': 'object-baton-merlin',
            "Tas_d'or": 'object-tas-or',
            'Grimoire_de_Merlin': 'object-grimoire-merlin',
            'Potion_01': 'object-potion-1',
            'Potion_02': 'object-potion-2',
            'Couronne': 'object-couronne',
        }


        /**
         * Initialisation
         */
        this.itemHitboxes = []
        this.currentIntersection = null
        this.isSearching = false
        this.isPointerOverInterface = false
        this.interfaceSelector = 'button, a, .journal, .item-viewer, .mobile-controls, #choices-container'
        this.hitboxMaterial = new THREE.MeshBasicMaterial()


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

                // hitbox plus large pour les objets
                const box = new THREE.Box3().setFromObject(child)
                const size = box.getSize(new THREE.Vector3())
                const center = box.getCenter(new THREE.Vector3())

                size.x = Math.max(size.x, 1)
                size.y = Math.max(size.y, 1)
                size.z = Math.max(size.z, 1)

                const hitbox = new THREE.Mesh(
                    new THREE.BoxGeometry(size.x, size.y, size.z),
                    this.hitboxMaterial
                )

                hitbox.position.copy(center)
                hitbox.userData.item = child
                hitbox.updateMatrixWorld()

                // la box ne doit pas être affichée
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
        // position de la souris
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
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
        this.itemHitboxes.forEach((hitbox) => hitbox.geometry.dispose())
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
