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
        this.islandTextureLightmap = this.resources.items.islandTextureLightmap
        this.islandTextureLightmap.flipY = false
        this.islandTextureLightmap.colorSpace = THREE.SRGBColorSpace

        this.islandMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.islandTextureLightmap,
            
            normalMap: this.resources.items.islandTextureNormal,
        })

        this.islandGroup.traverse((child) => 
        {
            if (child.isMesh) 
                child.material = this.islandMaterial
        })



        /**
         * Trees
         */
        this.treesTextureLightmap = this.resources.items.treesTextureLightmap
        this.treesTextureLightmap.flipY = false
        this.treesTextureLightmap.colorSpace = THREE.SRGBColorSpace

        this.treesMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.treesTextureLightmap,

            /* normalMap: this.resources.items.treesTextureNormalmap, */
        })

        this.treesGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.treesMaterial
        })



        /**
         * Rocks
         */
        /* this.rocksTextureLightmap = this.resources.items.rocksTextureLightmap
        this.rocksTextureLightmap.flipY = false
        this.rocksTextureLightmap.colorSpace = THREE.SRGBColorSpace

        this.rocksMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.rocksTextureLightmap,

            normalMap: this.resources.items.rocksTextureNormalmap,
        })

        this.rocksGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.rocksMaterial
        }) */



        /**
         * Ocean
         */
        /* this.oceanTextureLightmap = this.resources.items.oceanTextureLightmap
        this.oceanTextureLightmap.flipY = false
        this.oceanTextureLightmap.colorSpace = THREE.SRGBColorSpace

        this.oceanMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.oceanTextureLightmap,

            normalMap: this.resources.items.oceanTextureNormalmap,
        })

        this.oceanGroup.traverse((child) => 
        {
            if (child.isMesh) child.material = this.oceanMaterial
        }) */
    }

        
    setModel()
    {
        // ajouter les groupes à la scène
        this.scene.add(this.islandGroup, this.treesGroup, this.rocksGroup, this.oceanGroup)
    }

}