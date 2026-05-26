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
        this.lakeTextureLightmap = this.resources.items.lakeTextureLightmap
        this.lakeTextureNormalmap = this.resources.items.lakeTextureNormalmap
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
        this.lakeTextureLightmap.flipY = false
        this.lakeTextureLightmap.colorSpace = THREE.SRGBColorSpace

        // Matériau
        this.lakeMaterial = new THREE.MeshStandardMaterial
        ({
            map: this.lakeTextureLightmap,

            normalMap: this.lakeTextureNormalmap,
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