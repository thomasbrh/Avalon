// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'

// shaders
import oceanVertexShader from '../shaders/ocean/vertex.glsl'
import oceanFragmentShader from '../shaders/ocean/fragment.glsl'


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
        this.time = this.experience.time
        this.debug = this.experience.debug


        /**
         * Récupéré les ressources chargées
         */
        this.islandPack = this.resources.items.islandModel.scene
        this.oceanPack = this.resources.items.oceanModel.scene
        this.rocksPack = this.resources.items.rocksModel.scene
        this.bushesPack = this.resources.items.bushesModel.scene
        this.treesPack1 = this.resources.items.treesModelPack01.scene
        this.treesPack2 = this.resources.items.treesModelPack02.scene
        this.treesPack3 = this.resources.items.treesModelPack03.scene


        /**
         * Appel des instances
         */
        this.setTexture()
        this.setOcean()
        this.setTreesTexture()
        this.setModel()


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.setDebug()
        }

    }


    /**
     * Textures
     */
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
         * Bushes
         */
        this.bushesTextureLightmap = this.resources.items.bushesTextureLightmap
        this.bushesTextureLightmap.flipY = false
        this.bushesTextureLightmap.colorSpace = THREE.SRGBColorSpace

        this.bushesMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.bushesTextureLightmap,

            normalMap: this.resources.items.bushesTextureNormalmap,
        })

        this.bushesPack.traverse((child) =>
        {
            if (child.isMesh) child.material = this.bushesMaterial
        })
    }


    /**
     * Ocean
     * crée le material shader et l'applique
     */
    setOcean()
    {
        // paramètres
        this.oceanParameters =
        {
            depthColor: '#185677',
            surfaceColor: '#5799c1',
            oceanYOffset: 0.8
        }

        // materiel
        this.oceanMaterial = new THREE.ShaderMaterial(
        {
            vertexShader: oceanVertexShader,
            fragmentShader: oceanFragmentShader,
            uniforms:
            {
                uTime: { value: 0 },

                // big waves
                uBigWavesElevation: { value: 0.45 },
                uBigWavesFrequency: { value: new THREE.Vector2(2, 6.5) },
                uBigWavesSpeed: { value: 0.35 },

                // small waves
                uSmallWavesElevation: { value: 0.8 },
                uSmallWavesFrequency: { value: 21 },
                uSmallWavesSpeed: { value: 0.15 },
                uSmallIterations: { value: 3 },

                // colors
                uDepthColor: { value: new THREE.Color(this.oceanParameters.depthColor) },
                uSurfaceColor: { value: new THREE.Color(this.oceanParameters.surfaceColor) },
                uColorOffset: { value: 0.36 },
                uColorMultiplier: { value: 0.6 }
            }
        })

        // récupère le mesh glb de l'ocean
        this.oceanPack.traverse((child) =>
        {
            if(child.isMesh)
            {
                this.oceanMesh = child
                this.oceanBaseY = child.position.y
                child.material = this.oceanMaterial
                this.updateOceanPosition()
            }
        })
    }


    /**
     * Ocean position
     * ajoute un offset Y à la position récupérée dans Blender
     */
    updateOceanPosition()
    {
        this.oceanMesh.position.y = this.oceanBaseY + this.oceanParameters.oceanYOffset
    }


    /**
     * Debug
     */
    setDebug()
    {
        this.debugFolder = this.debug.gui.addFolder('ocean')

        this.debugFolder
            .addColor(this.oceanParameters, 'depthColor')
            .onChange(() =>
            {
                this.oceanMaterial.uniforms.uDepthColor.value.set(this.oceanParameters.depthColor)
            })

        this.debugFolder
            .addColor(this.oceanParameters, 'surfaceColor')
            .onChange(() =>
            {
                this.oceanMaterial.uniforms.uSurfaceColor.value.set(this.oceanParameters.surfaceColor)
            })


        this.debugFolder
            .add(this.oceanMaterial.uniforms.uBigWavesElevation, 'value')
            .min(0)
            .max(1)
            .step(0.001)
            .name('uBigWavesElevation')

        this.debugFolder
            .add(this.oceanMaterial.uniforms.uBigWavesFrequency.value, 'x')
            .min(0)
            .max(10)
            .step(0.001)
            .name('uBigWavesFrequencyX')

        this.debugFolder
            .add(this.oceanMaterial.uniforms.uBigWavesFrequency.value, 'y')
            .min(0)
            .max(10)
            .step(0.001)
            .name('uBigWavesFrequencyY')

        this.debugFolder
            .add(this.oceanMaterial.uniforms.uBigWavesSpeed, 'value')
            .min(0)
            .max(4)
            .step(0.001)
            .name('uBigWavesSpeed')


        this.debugFolder
            .add(this.oceanMaterial.uniforms.uSmallWavesElevation, 'value')
            .min(0)
            .max(1)
            .step(0.001)
            .name('uSmallWavesElevation')

        this.debugFolder
            .add(this.oceanMaterial.uniforms.uSmallWavesFrequency, 'value')
            .min(0)
            .max(30)
            .step(0.001)
            .name('uSmallWavesFrequency')

        this.debugFolder
            .add(this.oceanMaterial.uniforms.uSmallWavesSpeed, 'value')
            .min(0)
            .max(4)
            .step(0.001)
            .name('uSmallWavesSpeed')

        this.debugFolder
            .add(this.oceanMaterial.uniforms.uSmallIterations, 'value')
            .min(0)
            .max(5)
            .step(1)
            .name('uSmallIterations')


        this.debugFolder
            .add(this.oceanMaterial.uniforms.uColorOffset, 'value')
            .min(0)
            .max(1)
            .step(0.001)
            .name('uColorOffset')

        this.debugFolder
            .add(this.oceanMaterial.uniforms.uColorMultiplier, 'value')
            .min(0)
            .max(10)
            .step(0.001)
            .name('uColorMultiplier')


        this.debugFolder
            .add(this.oceanParameters, 'oceanYOffset')
            .min(-0.5)
            .max(0.8)
            .step(0.001)
            .onChange(() =>
            {
                this.updateOceanPosition()
            })
    }


    setModel()
    {
        // ajouter les groupes à la scène
        this.scene.add(
            this.islandPack,
            this.rocksPack,
            this.oceanPack,
            this.bushesPack,
            this.treesPack1,
            this.treesPack2,
            this.treesPack3)
    }


    setTreesTexture()
    {
        /**
         * Trees
         */
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


    /**
     * Update
     */
    update()
    {
        this.oceanMaterial.uniforms.uTime.value = this.time.elapsed * 0.001
    }

}
