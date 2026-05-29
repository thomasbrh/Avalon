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


        /**
         * Récupéré les ressources chargées
         */
        this.swordModel = this.resources.items.swordModel
        this.swordTextureLightmap = this.resources.items.swordTextureLightmap
        this.swordTextureNormalmap = this.resources.items.swordTextureNormalmap
        this.model = this.swordModel.scene
        

        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()
        this.setTargets()

    }

    
    setTargets()
    {
        this.targets = {}

        this.model.traverse((child) =>
        {
            if(child.name.includes('TargetSword_'))
            {
                // On sauvegarde sa position en utilisant son nom
                this.targets[child.name] = new THREE.Vector3()
                child.getWorldPosition(this.targets[child.name])
            }
        })
        
        console.log("targets :", this.targets)
    }


    setModel()
    {
        // add the sword to the scene
        this.scene.add(this.model)
    }


    setTexture()
    {

        // Réglages texture
        this.swordTextureLightmap.flipY = false
        this.swordTextureLightmap.colorSpace = THREE.SRGBColorSpace

        // Matériau
        this.swordMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.swordTextureLightmap,
            
            normalMap: this.swordTextureNormalmap,
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