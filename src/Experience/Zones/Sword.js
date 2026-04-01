// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'


export default class Sword
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
        this.swordModel = this.resources.items.swordModel
        this.swordTexture = this.resources.items.swordTexture
        this.model = this.swordModel.scene
        

        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()

    }


    setModel()
    {
        // add the sword to the scene
        this.scene.add(this.model)
    }


    setTexture()
    {

        // Réglages texture
        this.swordTexture.flipY = false
        this.swordTexture.colorSpace = THREE.SRGBColorSpace

        // Matériau
        this.swordMaterial = new THREE.MeshBasicMaterial(
        {
            map: this.swordTexture
        })

        // Applique le matériau à tous les meshes du modèle
        this.model.traverse((child) =>
        {

            if(child.isMesh)
            {
                child.material = this.swordMaterial
            }

        })

    }

}