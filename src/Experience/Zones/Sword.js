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

        // mesh de l'épée et sa hauteur de départ
        this.swordMesh = null
        this.swordStartY = 0
        

        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()
        this.setTargets()
        this.setSwordMesh()

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
        
    }


    /**
     * Récupère le mesh qui doit bouger
     */
    setSwordMesh()
    {
        this.model.traverse((child) =>
        {
            if(child.name === 'Sword_object')
            {
                this.swordMesh = child
            }
        })

        this.swordStartY = this.swordMesh.position.y
    }


    /**
     * Replace l'épée avant ou après son interaction
     */
    setSwordPulled(isPulled)
    {
        const height = isPulled ? 0.65 : 0

        this.swordMesh.position.y = this.swordStartY + height
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
