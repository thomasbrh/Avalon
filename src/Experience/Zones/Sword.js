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
        this.swordTextureDiffuse = this.resources.items.swordTextureDiffuse
        this.swordTextureNormal = this.resources.items.swordTextureNormal
        this.swordTextureRoughness = this.resources.items.swordTextureRoughness
        this.model = this.swordModel.scene
        

        /**
         * Appel des instances
         */
        // this.setTexture()
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
        this.swordTextureDiffuse.flipY = false
        this.swordTextureDiffuse.colorSpace = THREE.SRGBColorSpace

        // Matériau
        this.swordMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.swordTextureDiffuse,
            
            normalMap: this.swordTextureNormal,
            roughnessMap: this.swordTextureRoughness,
            roughness: 1,
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