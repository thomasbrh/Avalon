// import base
import Experience from '../Experience.js'

// shaders
import towerAuraVertexShader from '../shaders/towerAura/vertex.glsl'
import towerAuraFragmentShader from '../shaders/towerAura/fragment.glsl'

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
        this.time = this.experience.time
        this.debug = this.experience.debug


        /**
         * DOM
         */
        this.dialogueBox = document.querySelector('.dialogue-box')


        /**
         * Récupéré les ressources chargées
         */
        this.lakeModel = this.resources.items.lakeModel
        this.lakeTextureLightmap = this.resources.items.lakeTextureLightmap
        this.lakeTextureNormalmap = this.resources.items.lakeTextureNormalmap
        this.model = this.lakeModel.scene


        /**
         * Paramètres de l'aura
         */
        this.auraTime = 0
        this.auraSpeech = 0
        this.auraSettings =
        {
            idleStrength: 0.45,
            speakingStrength: 0.25,
            idleSpeed: 0.25,
            speakingSpeed: 1.12,
            transitionSpeed: 4,
            colorA: '#62ffe3',
            colorB: '#9b72ff',
            towerX: 33,
            towerZ: -26.2,
            forceSpeaking: false
        }


        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()
        this.setAura()


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.setDebug()
        }

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
        this.model.visible = false
    }


    /**
     * Aura de la Dame du Lac
     */
    setAura()
    {
        // récupère la hauteur du modèle
        const box = new THREE.Box3().setFromObject(this.model)
        const size = box.getSize(new THREE.Vector3())
        const centerY = box.getCenter(new THREE.Vector3()).y

        // garde l'aura proche du corps principal de la tour
        const radius = Math.min(size.x, size.z) * 0.27
        const height = size.y * 1.15

        this.auraGeometry = new THREE.CylinderGeometry(
            radius,
            radius * 0.9,
            height,
            64,
            32,
            true
        )

        this.auraUniforms =
        {
            uTime: { value: this.auraTime },
            uSpeech: { value: 0 },
            uStrength: { value: this.auraSettings.idleStrength },
            uColorA: { value: new THREE.Color(this.auraSettings.colorA) },
            uColorB: { value: new THREE.Color(this.auraSettings.colorB) }
        }

        this.auraMaterial = new THREE.ShaderMaterial(
        {
            vertexShader: towerAuraVertexShader,
            fragmentShader: towerAuraFragmentShader,
            uniforms: this.auraUniforms,

            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        })

        this.auraMesh = new THREE.Mesh(this.auraGeometry, this.auraMaterial)

        // centre de la tour
        this.auraMesh.position.set(
            this.auraSettings.towerX,
            centerY,
            this.auraSettings.towerZ
        )

        // place un peu plus d'aurore au-dessus de la tour
        this.auraMesh.position.y += size.y * 0.05
        this.model.add(this.auraMesh)
    }


    /**
     * Dialogue
     */
    isDameSpeaking()
    {
        if(!this.dialogueBox.classList.contains('is-visible')) return false

        return this.dialogueBox.dataset.speaker === 'dame du lac'
    }


    /**
     * Debug
     */
    setDebug()
    {
        this.debugFolder = this.debug.gui.addFolder('Lake aura')

        this.debugFolder.add(this.auraSettings, 'idleStrength', 0, 2, 0.001)
        this.debugFolder.add(this.auraSettings, 'speakingStrength', 0, 2, 0.001)
        this.debugFolder.add(this.auraSettings, 'idleSpeed', 0, 3, 0.01)
        this.debugFolder.add(this.auraSettings, 'speakingSpeed', 0, 3, 0.01)
        this.debugFolder.add(this.auraSettings, 'transitionSpeed', 0.1, 20, 0.1)
        this.debugFolder
            .add(this.auraSettings, 'towerX', 25, 40, 0.01)
            .onChange((value) => this.auraMesh.position.x = value)
        this.debugFolder
            .add(this.auraSettings, 'towerZ', -36, -19, 0.01)
            .onChange((value) => this.auraMesh.position.z = value)
        this.debugFolder.add(this.auraSettings, 'forceSpeaking').name('force speaking')

        this.debugFolder
            .addColor(this.auraSettings, 'colorA')
            .onChange((value) => this.auraUniforms.uColorA.value.set(value))

        this.debugFolder
            .addColor(this.auraSettings, 'colorB')
            .onChange((value) => this.auraUniforms.uColorB.value.set(value))

        this.debugFolder.close()
    }


    /**
     * Update
     */
    update()
    {
        const deltaSeconds = this.time.delta * 0.001

        // cible de la transition entre l'aura calme et l'aura qui parle
        let speechTarget = 0
        if(this.auraSettings.forceSpeaking || this.isDameSpeaking())
            speechTarget = 1

        this.auraSpeech = THREE.MathUtils.damp(
            this.auraSpeech,
            speechTarget,
            this.auraSettings.transitionSpeed,
            deltaSeconds
        )

        // horloge locale pour accélérer sans faire sauter le noise
        const animationSpeed = THREE.MathUtils.lerp(
            this.auraSettings.idleSpeed,
            this.auraSettings.speakingSpeed,
            this.auraSpeech
        )
        this.auraTime += deltaSeconds * animationSpeed

        this.auraUniforms.uTime.value = this.auraTime
        this.auraUniforms.uSpeech.value = this.auraSpeech
        this.auraUniforms.uStrength.value = THREE.MathUtils.lerp(
            this.auraSettings.idleStrength,
            this.auraSettings.speakingStrength,
            this.auraSpeech
        )
    }


    setVisible(bool)
    {
        this.model.visible = bool
    }


    dispose()
    {
        this.lakeTextureLightmap.dispose()
        this.lakeTextureNormalmap.dispose()
        this.model.traverse((child) =>
        {
            if (child.isMesh)
            {
                child.geometry.dispose()
                child.material.dispose()
            }
        })
        this.scene.remove(this.model)
    }

}
