// import base
import Experience from '../Experience.js'
 
// import shaders
import portalVertexShader from '../shaders/portal/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'

// import librairies
import * as THREE from 'three'


export default class Portal
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.time = this.experience.time

        this.audioContext = new AudioContext();
        this.audioListener = new THREE.AudioListener()


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('portal')
        }


        /**
         * Récupéré les ressources chargées
         */
        this.portalModel = this.resources.items.portalModel
        this.portalTextureDiffuse = this.resources.items.portalTextureDiffuse
        this.portalTextureNormal = this.resources.items.portalTextureNormal
        this.portalTextureRoughness = this.resources.items.portalTextureRoughness
        this.model = this.portalModel.scene

        console.log(this.model)


        /**
         * Appel des instances
         */
        this.setModel()
        // this.setTexture()
        this.applyShader() 
        this.setTargets()

    }


    setTargets()
    {
        this.targets = {}

        this.model.traverse((child) =>
        {
            if(child.name.includes('TargetPortal_'))
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
        // ajoute le portal à la scène
        this.scene.add(this.model)
    }


    setTexture()
    {

        // Réglages texture
        this.portalTextureDiffuse.flipY = false
        this.portalTextureDiffuse.colorSpace = THREE.SRGBColorSpace

        // changer les matériaux
        this.portalMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.portalTextureDiffuse,
            normalMap: this.portalTextureNormal,
            roughnessMap: this.portalTextureRoughness,
            roughness: 1,
        })

        // Applique le matériau à tous les meshes du modèle
        this.model.traverse((child) =>
        {

            if(child.isMesh)
            {
                child.material = this.portalMaterial
            }

        })

    }


    applyShader()
    {

        // debug
        /* this.model.traverse((child) => {
            console.log(child.name)
        }) */

        // Material du portal
        const portalShaderMaterial = new THREE.ShaderMaterial(
        {

            side: THREE.DoubleSide,

            uniforms:
            {
                uTime: { value: 0 },
                uColorStart: { value: new THREE.Color('#8aaee5') },
                uColorEnd: { value: new THREE.Color('#36507A') }
            },

            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader

        })

        // récupére le mesh du portal via son nom
        const portalShaderMesh = this.model.getObjectByName('portalShaderMesh')

        // remplace le material du mesh par le shader
        portalShaderMesh.material = portalShaderMaterial
        this.portalShaderMaterial = portalShaderMaterial
        this.portalShaderMesh = portalShaderMesh


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder
                .addColor(this.debug.debugObject, 'portalColorStart')
                .onChange(() =>
                {
                    this.portalShaderMaterial.uniforms.uColorStart.value.set(
                        this.debug.debugObject.portalColorStart
                    )
                })

            this.debugFolder
                .addColor(this.debug.debugObject, 'portalColorEnd')
                .onChange(() =>
                {
                    this.portalShaderMaterial.uniforms.uColorEnd.value.set(
                        this.debug.debugObject.portalColorEnd
                    )
                })
        }

    }


    update()
    {
        this.portalShaderMaterial.uniforms.uTime.value = this.time.elapsed * 0.001
    }

}