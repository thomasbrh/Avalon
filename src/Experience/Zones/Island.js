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


        /**
         * Récupéré les ressources chargées
         */
        this.islandGroup = this.resources.items.islandModel.scene
        this.oceanGroup = this.resources.items.oceanModel.scene
        this.rocksGroup = this.resources.items.rocksModel.scene


        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()

    }


    setTexture()
    {

        /**
         * Island
         */
        this.islandTextureDiffuse = this.resources.items.islandTextureDiffuse
        this.islandTextureDiffuse.flipY = false
        this.islandTextureDiffuse.colorSpace = THREE.SRGBColorSpace

        this.islandMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.islandTextureDiffuse,
            normalMap: this.resources.items.islandTextureNormal,
            roughnessMap: this.resources.items.islandTextureRoughness,
            roughness: 0.8,
        })

        this.islandGroup.traverse((child) => 
        {
            if (child.isMesh) 
                child.material = this.islandMaterial
        })


        /**
         * Ocean
         */
        this.oceanTextureDiffuse = this.resources.items.oceanTextureDiffuse
        this.oceanTextureDiffuse.flipY = false
        this.oceanTextureDiffuse.colorSpace = THREE.SRGBColorSpace

        this.oceanMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.oceanTextureDiffuse,
            normalMap: this.resources.items.oceanTextureNormal,
            roughnessMap: this.resources.items.oceanTextureRoughness,
            roughness: 1,
            /* side: THREE.DoubleSide */
        })

        this.oceanGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.oceanMaterial
        })

        
        /**
         * Rocks
         */
        this.rocksTextureDiffuse = this.resources.items.rocksTextureDiffuse
        this.rocksTextureDiffuse.flipY = false
        this.rocksTextureDiffuse.colorSpace = THREE.SRGBColorSpace

        this.rocksMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.rocksTextureDiffuse,
            normalMap: this.resources.items.rocksTextureNormal,
            roughnessMap: this.resources.items.rocksTextureRoughness,
            roughness: 0.8,
        })

        this.rocksGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.rocksMaterial
        })

    }

        
    setModel()
    {
        // ajouter les groupes à la scène
        this.scene.add(this.islandGroup, this.oceanGroup, this.rocksGroup)
    }

}