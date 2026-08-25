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
        this.oceanFrequencyScale = 1
        this.oceanMesh = null
        this.oceanBaseY = 0


        /**
         * Récupéré les ressources chargées
         */
        this.islandPack = this.resources.items.islandModel.scene
        this.oceanPack = this.resources.items.oceanModel.scene
        this.rocksPack = this.resources.items.rocksModel.scene
        this.bushesPack = this.resources.items.bushesModel.scene
        this.grassPack = this.resources.items.grassModel.scene
        this.treesPack1 = this.resources.items.treesModelPack01.scene
        this.treesPack2 = this.resources.items.treesModelPack02.scene
        this.treesPack3 = this.resources.items.treesModelPack03.scene


        /**
         * Appel des instances
         */
        this.setTexture()
        this.setGrass()
        this.setTreesTexture()
        this.setModel()
        this.setDebug()

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
        this.oceanMaterial = new THREE.ShaderMaterial(
        {
            vertexShader: oceanVertexShader,
            fragmentShader: oceanFragmentShader,
            uniforms:
            {
                uTime: { value: 0 },

                uBigWavesElevation: { value: 0.45 },
                uBigWavesFrequency: { value: new THREE.Vector2(2, 6.5) },
                uBigWavesSpeed: { value: 0.35 },

                uSmallWavesElevation: { value: 0.8 },
                uSmallWavesFrequency: { value: 21 },
                uSmallWavesSpeed: { value: 0.15 },
                uSmallIterations: { value: 3 },

                uDepthColor: { value: new THREE.Color('#185677') },
                uSurfaceColor: { value: new THREE.Color('#5799c1') },
                uColorOffset: { value: 0.36 },
                uColorMultiplier: { value: 0.6 }
            }
        })
        this.oceanDebugObject =
        {
            depthColor: '#186691',
            surfaceColor: '#9bd8ff',
            bigWavesFrequencyX: 2,
            bigWavesFrequencyY: 6.5,
            smallWavesFrequency: 21,
            oceanYOffset: 0.8,
        }

        this.oceanPack.traverse((child) =>
        {
            if (child.isMesh)
            {
                this.setOceanGeometry(child)
                child.material = this.oceanMaterial
            }
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
     * Grass
     */
    setGrass()
    {
        // texture
        this.grassTextureLightmap = this.resources.items.grassTextureLightmap
        this.grassTextureLightmap.flipY = false
        this.grassTextureLightmap.colorSpace = THREE.SRGBColorSpace

        // utilise le deuxième set UV du glb
        this.grassTextureLightmap.channel = 1

        // material avec transparence
        this.grassMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.grassTextureLightmap,
            alphaTest: 0.35, // découpe les pixels transparents
            side: THREE.DoubleSide
        })

        // récupère tous les planes du glb
        this.grassMeshes = []

        this.grassPack.traverse((child) =>
        {
            if(!child.isMesh) return

            child.material = this.grassMaterial

            // Les rota des planes sont apply direct dans leur géométrie.
            const normalAttribute = child.geometry.getAttribute('normal')
            const grassNormal = new THREE.Vector3()

            if(normalAttribute)
            {
                grassNormal.fromBufferAttribute(normalAttribute, 0)
                grassNormal.y = 0

                if(grassNormal.lengthSq() > 0)
                {
                    grassNormal.normalize()
                    child.userData.lookAtOffset = Math.atan2(grassNormal.x, grassNormal.z)
                }
            }

            child.userData.lookAtOffset ??= 0
            this.grassMeshes.push(child)
        })
    }


    setOceanGeometry(child)
    {
        this.oceanMesh = child
        this.oceanBaseY = child.position.y

        child.geometry.computeBoundingBox()

        const size = new THREE.Vector3()
        child.geometry.boundingBox.getSize(size)

        const oceanSize = Math.max(size.x, size.z)
        const oceanGeometry = new THREE.PlaneGeometry(oceanSize, oceanSize, 512, 512)
        oceanGeometry.rotateX(- Math.PI * 0.5)

        this.oceanFrequencyScale = 2 / oceanSize
        this.updateOceanFrequencyUniforms()
        this.updateOceanPosition()

        child.geometry.dispose()
        child.geometry = oceanGeometry
    }


    update()
    {
        if(this.oceanMaterial)
        {
            this.oceanMaterial.uniforms.uTime.value = this.time.elapsed * 0.001
        }

        this.updateGrassOrientation()
    }


    /**
     * Grass orientation
     */
    // tourne l'herbe vers la camera
    updateGrassOrientation()
    {
        const cameraPosition = this.experience.camera.instance.position

        this.grassMeshes.forEach((grassMesh) =>
        {
            grassMesh.lookAt(
                cameraPosition.x,
                grassMesh.position.y,
                cameraPosition.z
            )

            grassMesh.rotateY(- grassMesh.userData.lookAtOffset)
        })
    }


    updateOceanFrequencyUniforms()
    {
        this.oceanMaterial.uniforms.uBigWavesFrequency.value.set(
            this.oceanDebugObject.bigWavesFrequencyX * this.oceanFrequencyScale,
            this.oceanDebugObject.bigWavesFrequencyY * this.oceanFrequencyScale
        )
        this.oceanMaterial.uniforms.uSmallWavesFrequency.value = this.oceanDebugObject.smallWavesFrequency * this.oceanFrequencyScale
    }


    updateOceanPosition()
    {
        if(this.oceanMesh)
        {
            this.oceanMesh.position.y = this.oceanBaseY + this.oceanDebugObject.oceanYOffset
        }
    }


    setDebug()
    {
        if(!this.debug.active) return

        this.debugFolder = this.debug.gui.addFolder('ocean')

        this.debugFolder
            .addColor(this.oceanDebugObject, 'depthColor')
            .name('depthColor')
            .onChange(() =>
            {
                this.oceanMaterial.uniforms.uDepthColor.value.set(this.oceanDebugObject.depthColor)
            })

        this.debugFolder
            .addColor(this.oceanDebugObject, 'surfaceColor')
            .name('surfaceColor')
            .onChange(() =>
            {
                this.oceanMaterial.uniforms.uSurfaceColor.value.set(this.oceanDebugObject.surfaceColor)
            })

        this.debugFolder
            .add(this.oceanMaterial.uniforms.uBigWavesElevation, 'value')
            .min(0)
            .max(1)
            .step(0.001)
            .name('uBigWavesElevation')

        this.debugFolder
            .add(this.oceanDebugObject, 'bigWavesFrequencyX')
            .min(0)
            .max(10)
            .step(0.001)
            .name('uBigWavesFrequencyX')
            .onChange(() =>
            {
                this.updateOceanFrequencyUniforms()
            })

        this.debugFolder
            .add(this.oceanDebugObject, 'bigWavesFrequencyY')
            .min(0)
            .max(10)
            .step(0.001)
            .name('uBigWavesFrequencyY')
            .onChange(() =>
            {
                this.updateOceanFrequencyUniforms()
            })

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
            .add(this.oceanDebugObject, 'smallWavesFrequency')
            .min(0)
            .max(30)
            .step(0.001)
            .name('uSmallWavesFrequency')
            .onChange(() =>
            {
                this.updateOceanFrequencyUniforms()
            })

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
            .add(this.oceanDebugObject, 'oceanYOffset')
            .min(-0.5)
            .max(0.8)
            .step(0.001)
            .name('oceanYOffset')
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
            this.grassPack,
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

}
