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

        // mesh de l'épée seule pour pouvoir la bouger sans bouger tout le décor
        this.swordObject = null
        // position de base, utilisée pour calculer jusqu'où l'épée monte
        this.swordStartY = 0
        

        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()
        this.setTargets()
        this.setSwordObject()

    }

    
    setTargets()
    {
        this.targets = {}

        this.model.traverse((child) =>
        {
            if(child.name.includes('TargetSword_'))
            {
                // on sauvegarde sa position en utilisant son nom
                this.targets[child.name] = new THREE.Vector3()
                child.getWorldPosition(this.targets[child.name])
            }
        })
        
        console.log("targets :", this.targets)
    }


    setSwordObject()
    {
        // on cherche le mesh
        this.model.traverse((child) =>
        {
            if(child.name.includes('Sword_object'))
            {
                this.swordObject = child
            }
        })

        /* if(!this.swordObject)
        {
            // si jamais le nom du mesh change
            this.swordObject = this.model
        } */

        // la hauteur de départ
        this.swordStartY = this.swordObject.position.y
    }


    setModel()
    {
        // add the sword to the scene
        this.scene.add(this.model)
    }


    setVisible(bool)
    {
        this.model.visible = bool
    }


    dispose()
    {
        this.swordTextureLightmap.dispose()
        this.swordTextureNormalmap.dispose()
        this.model.traverse((child) =>
        {
            if (child.isMesh)
            {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.scene.remove(this.model)
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
