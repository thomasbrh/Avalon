// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'


export default class Lake
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
        this.lakeModel = this.resources.items.lakeModel
        this.lakeTextureDiffuse = this.resources.items.lakeTextureDiffuse
        this.lakeTextureNormal = this.resources.items.lakeTextureNormal
        this.lakeTextureRoughness = this.resources.items.lakeTextureRoughness
        this.model = this.lakeModel.scene


        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()

    }


    setTexture()
    {

        // Réglages texture
        this.lakeTextureDiffuse.flipY = false
        this.lakeTextureDiffuse.colorSpace = THREE.SRGBColorSpace

        // Matériau
        this.lakeMaterial = new THREE.MeshStandardMaterial
        ({
            map: this.lakeTextureDiffuse,
            normalMap: this.lakeTextureNormal,
            roughnessMap: this.lakeTextureRoughness,
            roughness: 1,
        })

        // Applique le matériau à tous les meshes du modèle
        this.model.traverse((child) =>
        {

            if(child.isMesh)
            {
                child.material = this.lakeMaterial
            }

        })

    }


    setModel()
    {
        // add the lake to the scene
        this.scene.add(this.model)
        this.model.position.set(0, 0 ,0 )
    }

}