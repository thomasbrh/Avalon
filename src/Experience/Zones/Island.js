// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'


export default class Island
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // récupère les ressources chargées
        this.islandModel = this.resources.items.islandModel
        this.islandTexture = this.resources.items.islandTexture
        this.model = this.islandModel.scene
        

        /**
         * Appel des instances
         */
        /* this.setTexture() */
        this.setModel()

    }


    /* setTexture()
    {

        // Réglages texture
        this.islandTexture.flipY = false
        this.islandTexture.colorSpace = THREE.SRGBColorSpace

        // Matériau
        this.islandMaterial = new THREE.MeshBasicMaterial(
        {
            map: this.islandTexture
        })

        // Applique le matériau à tous les meshes du modèle
        this.model.traverse((child) =>
        {

            if(child.isMesh)
            {
                child.material = this.islandMaterial
            }

        })

    } */

        
    setModel()
    {
        // add the island to the scene
        this.scene.add(this.model)
    }

}