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
        this.treesGroup = this.resources.items.treesModel.scene
        this.rocksGroup = this.resources.items.rocksModel.scene
        /* this.fogGroup = this.resources.items.fogModel.scene */


        /**
         * Appel des instances
         */
        // this.setTexture()
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
            
            /* normalMap: this.resources.items.islandTextureNormal, */
            /* roughnessMap: this.resources.items.islandTextureRoughness,
            roughness: 0.8, */
        })

        this.islandGroup.traverse((child) => 
        {
            if (child.isMesh) 
                child.material = this.islandMaterial
        })



        /**
         * Trees
         */
        this.treesTextureDiffuse = this.resources.items.treesTextureDiffuse
        this.treesTextureDiffuse.flipY = false
        this.treesTextureDiffuse.colorSpace = THREE.SRGBColorSpace

        this.treesMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.treesTextureDiffuse,

            normalMap: this.resources.items.treesTextureNormal,
            roughnessMap : this.resources.items.treesTextureRoughness,
            roughness: 1,
        })

        this.treesGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.treesMaterial
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
            roughnessMap : this.resources.items.rocksTextureRoughness,
            roughness: 1,
        })

        this.rocksGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.rocksMaterial
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

            /* normalMap: this.resources.items.oceanTextureNormal,
            roughness: 1, */
        })

        this.oceanGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.oceanMaterial
        })



        /**
         * fog
         */
        /* this.fogTextureDiffuse = this.resources.items.fogTextureDiffuse
        this.fogTextureDiffuse.flipY = false
        this.fogTextureDiffuse.colorSpace = THREE.SRGBColorSpace

        this.fogTextureAlpha = this.resources.items.fogTextureAlpha

        this.fogMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.fogTextureDiffuse,
            alphaMap : this.fogTextureAlpha,
            transparent: true,
            depthWrite: false,
            normalMap: this.resources.items.fogTextureNormal,
            roughness: 1,
        })

        this.fogGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.fogMaterial
        }) */
    }

        
    setModel()
    {
        // ajouter les groupes à la scène
        this.scene.add(this.islandGroup, this.treesGroup, this.rocksGroup, this.oceanGroup, /* this.fogGroup */)
    }

}