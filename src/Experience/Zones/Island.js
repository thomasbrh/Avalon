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
        this.islandPack = this.resources.items.islandModel.scene
        this.oceanPack = this.resources.items.oceanModel.scene

        this.rocksPack = this.resources.items.rocksModel.scene


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

            normalMap: this.resources.items.islandTextureNormalmap,
        })

        this.islandPack.traverse((child) =>
        {
            if (child.isMesh)
                child.material = this.islandMaterial
        })



        /**
         * Rocks
         */
        this.rocksTextureLightmap = this.resources.items.rocksTextureLightmap
        this.rocksTextureLightmap.flipY = false
        this.rocksTextureLightmap.colorSpace = THREE.SRGBColorSpace

        this.rocksMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.rocksTextureLightmap,

            normalMap: this.resources.items.rocksTextureNormalmap,
        })

        this.rocksPack.traverse((child) =>
        {
            if (child.isMesh) child.material = this.rocksMaterial
        })



        /**
         * Ocean
         */
        this.oceanTextureLightmap = this.resources.items.oceanTextureLightmap
        this.oceanTextureLightmap.flipY = false
        this.oceanTextureLightmap.colorSpace = THREE.SRGBColorSpace

        this.oceanMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.oceanTextureLightmap,

            normalMap: this.resources.items.oceanTextureNormalmap,
        })

        this.oceanPack.traverse((child) =>
        {
            if (child.isMesh) child.material = this.oceanMaterial
        })
    }


    setModel()
    {
        // ajouter les groupes à la scène
        this.scene.add(
            this.islandPack,
            this.rocksPack,
            this.oceanPack)
    }


    setDeferredTrees()
    {

        /**
         * Trees
         */
        this.treesPack1 = this.resources.items.treesModelPack01.scene
        this.treesPack2 = this.resources.items.treesModelPack02.scene
        this.treesPack3 = this.resources.items.treesModelPack03.scene

        // Pack01
        this.treesTextureLightmapPack01 = this.resources.items.treesTextureLightmapPack01
        this.treesTextureLightmapPack01.flipY = false
        this.treesTextureLightmapPack01.colorSpace = THREE.SRGBColorSpace

        this.treesMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.treesTextureLightmapPack01,

            normalMap: this.resources.items.treesTextureNormalmapPack01,
        })

        this.treesPack1.traverse((child) =>
        {
            if (child.isMesh) child.material = this.treesMaterial
        })

        // Pack02
        this.treesTextureLightmapPack02 = this.resources.items.treesTextureLightmapPack02
        this.treesTextureLightmapPack02.flipY = false
        this.treesTextureLightmapPack02.colorSpace = THREE.SRGBColorSpace

        this.treesMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.treesTextureLightmapPack02,

            normalMap: this.resources.items.treesTextureNormalmapPack02,
        })

        this.treesPack2.traverse((child) =>
        {
            if (child.isMesh) child.material = this.treesMaterial
        })

        // Pack03
        this.treesTextureLightmapPack03 = this.resources.items.treesTextureLightmapPack03
        this.treesTextureLightmapPack03.flipY = false
        this.treesTextureLightmapPack03.colorSpace = THREE.SRGBColorSpace

        this.treesMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.treesTextureLightmapPack03,

            normalMap: this.resources.items.treesTextureNormalmapPack03,
        })

        this.treesPack3.traverse((child) =>
        {
            if (child.isMesh) child.material = this.treesMaterial
        })

        this.scene.add(this.treesPack1, this.treesPack2, this.treesPack3)
    }


    disposeTreesPack1()
    {
        this.treesTextureLightmapPack01?.dispose()
        this.resources.items.treesTextureNormalmapPack01?.dispose()
        this.treesPack1?.traverse((child) =>
        {
            if (child.isMesh)
            {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.scene.remove(this.treesPack1)
    }


    disposeTreesPack2()
    {
        this.treesTextureLightmapPack02?.dispose()
        this.resources.items.treesTextureNormalmapPack02?.dispose()
        this.treesPack2?.traverse((child) =>
        {
            if (child.isMesh)
            {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.scene.remove(this.treesPack2)
    }

}
