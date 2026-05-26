// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'


export default class Manor
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
        this.manorModel = this.resources.items.manorModel
        this.manorTextureLightmap = this.resources.items.manorTextureLightmap
        this.manorTextureNormalmap = this.resources.items.manorTextureNormalmap
        this.model = this.manorModel.scene
        

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
            if(child.name.includes('TargetManor_'))
            {
                // On sauvegarde sa position en utilisant son nom
                this.targets[child.name] = new THREE.Vector3()
                child.getWorldPosition(this.targets[child.name])
            }
        })
        
        console.log("targets :", this.targets)
    }


    setTexture()
    {

        // Réglages texture
        this.manorTextureLightmap.flipY = false
        this.manorTextureLightmap.colorSpace = THREE.SRGBColorSpace

        // Matériau
        this.manorMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.manorTextureLightmap,

            normalMap: this.manorTextureNormalmap,
        })

        // Applique le matériau à tous les meshes du modèle
        this.model.traverse((child) =>
        {

            if(child.isMesh)
            {
                child.material = this.manorMaterial
            }

        })

    }


    setModel()
    {
        // add the manor to the scene
        this.scene.add(this.model)
    }
}