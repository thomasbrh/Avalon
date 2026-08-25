// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

// import shaders
import personnagesVertexShader from '../shaders/personnages/vertex.glsl'
import personnagesFragmentShader from '../shaders/personnages/fragment.glsl'


export default class Personnages
{
    constructor({ name, colorA, colorB, speakerNames, phase })
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug


        /**
         * DOM
         */
        this.dialogueBox = document.querySelector('.dialogue-box')


        /**
         * Initialisation
         */
        // valeur qui peut activer l'animation speaking
        this.speakerNames = speakerNames

        // phase évite que les deux persos bougent pareil
        this.animationTime = phase

        // état speaking entre 0 et 1
        this.speech = 0


        /**
         * Paramètres
         */
        this.settings =
        {
            // noise principal
            positionFrequency: 0.5,
            timeFrequency: 0.4,
            idleStrength: 0.5,
            speakingStrength: 1.2,

            // noise qui warp le noise principal
            warpPositionFrequency: 0.38,
            warpTimeFrequency: 0.12,
            warpStrength: 1.7,

            // animation idle et speaking
            idleSpeed: 1.2,
            speakingSpeed: 3.5,
            transitionSpeed: 6,

            // apparence
            scale: 0.18,
            colorA,
            colorB,

            // force l'animation speaking pour le debug
            forceSpeaking: false
        }


        /**
         * Appel des instances
         */
        this.setSphere()


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.setDebug(name)
        }
    }


    /**
     * Sphere
     * crée le mesh du personnage + les shaders
     */
    setSphere()
    {
        // uniforms des shaders
        this.uniforms =
        {
            uTime: { value: this.animationTime },
            uPositionFrequency: { value: this.settings.positionFrequency },
            uTimeFrequency: { value: this.settings.timeFrequency },

            uStrength: { value: this.settings.idleStrength },
            uWarpPositionFrequency: { value: this.settings.warpPositionFrequency },
            uWarpTimeFrequency: { value: this.settings.warpTimeFrequency },
            uWarpStrength: { value: this.settings.warpStrength },

            uColorA: { value: new THREE.Color(this.settings.colorA) },
            uColorB: { value: new THREE.Color(this.settings.colorB) },
            uSpeech: { value: 0 }
        }

        // material qui garde les lights du MeshPhysicalMaterial
        this.material = new CustomShaderMaterial(
        {
            baseMaterial: THREE.MeshPhysicalMaterial,
            vertexShader: personnagesVertexShader,
            fragmentShader: personnagesFragmentShader,

            uniforms: this.uniforms,
            metalness: 0,
            roughness: 0.5
        })

        // depth material pour que les shadows suivent la déformation
        this.depthMaterial = new CustomShaderMaterial(
        {
            baseMaterial: THREE.MeshDepthMaterial,
            vertexShader: personnagesVertexShader,
            uniforms: this.uniforms,
            depthPacking: THREE.RGBADepthPacking
        })

        // sphere avec assez de vertex pour avoir une bonne déformation
        const geometry = new THREE.SphereGeometry(2.5, 128, 128)

        // tangentes utilisées pour recalculer les normals du sahder
        geometry.computeTangents()

        // crée le mesh
        this.mesh = new THREE.Mesh(geometry, this.material)
        this.mesh.scale.setScalar(this.settings.scale)
        // + les shadows
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        this.mesh.customDepthMaterial = this.depthMaterial

        // ajoute le perso à la scène
        this.scene.add(this.mesh)
    }


    /**
     * Debug
     */
    setDebug(name)
    {

        if(!this.debug.personnagesFolder)
        {
            this.debug.personnagesFolder = this.debug.gui.addFolder('Personnages')
        }

        // sous folder par perso
        this.debugFolder = this.debug.personnagesFolder.addFolder(name)

        // noise principal
        this.debugFolder
            .add(this.settings, 'positionFrequency', 0, 2, 0.001)
            .onChange((value) => this.uniforms.uPositionFrequency.value = value)

        this.debugFolder
            .add(this.settings, 'timeFrequency', 0, 2, 0.001)
            .onChange((value) => this.uniforms.uTimeFrequency.value = value)

        // noise warp
        this.debugFolder
            .add(this.settings, 'warpPositionFrequency', 0, 2, 0.001)
            .onChange((value) => this.uniforms.uWarpPositionFrequency.value = value)

        this.debugFolder
            .add(this.settings, 'warpTimeFrequency', 0, 2, 0.001)
            .onChange((value) => this.uniforms.uWarpTimeFrequency.value = value)

        this.debugFolder
            .add(this.settings, 'warpStrength', 0, 5, 0.001)
            .onChange((value) => this.uniforms.uWarpStrength.value = value)

        // animation speaking
        this.debugFolder.add(this.settings, 'idleStrength', 0, 2, 0.001)
        this.debugFolder.add(this.settings, 'speakingStrength', 0, 2, 0.001)
        this.debugFolder.add(this.settings, 'idleSpeed', 0, 5, 0.01)
        this.debugFolder.add(this.settings, 'speakingSpeed', 0, 5, 0.01)
        this.debugFolder.add(this.settings, 'transitionSpeed', 0.1, 20, 0.1)
        this.debugFolder.add(this.settings, 'forceSpeaking').name('force speaking')

        this.debugFolder
            .add(this.settings, 'scale', 0.02, 0.3, 0.001)
            .onChange((value) => this.mesh.scale.setScalar(value))

        this.debugFolder
            .addColor(this.settings, 'colorA')
            .onChange((value) => this.uniforms.uColorA.value.set(value))

        this.debugFolder
            .addColor(this.settings, 'colorB')
            .onChange((value) => this.uniforms.uColorB.value.set(value))

        this.debugFolder.add(this.material, 'metalness', 0, 1, 0.001)

        this.debugFolder.close()
    }


    /**
     * Dialogue
     */
    isSpeaking()
    {
        if(!this.dialogueBox.classList.contains('is-visible')) return false

        // compare le speaker avec le nom du perso
        return this.speakerNames.includes(this.dialogueBox.dataset.speaker)
    }


    /**
     * Update
     */
    update()
    {
        const deltaSeconds = this.time.delta * 0.001

        // cible de la transition
        let speechTarget = 0
        if(this.settings.forceSpeaking || this.isSpeaking())
            speechTarget = 1

        // transition smooth entre idle et speaking
        this.speech = THREE.MathUtils.damp(
            this.speech,
            speechTarget,
            this.settings.transitionSpeed,
            deltaSeconds
        )

        // change la speed du noise quand le perso parle
        const animationSpeed = THREE.MathUtils.lerp(
            this.settings.idleSpeed,
            this.settings.speakingSpeed,
            this.speech
        )
        this.animationTime += deltaSeconds * animationSpeed

        // update des uniforms du shader
        this.uniforms.uTime.value = this.animationTime
        this.uniforms.uStrength.value = THREE.MathUtils.lerp(
            this.settings.idleStrength,
            this.settings.speakingStrength,
            this.speech
        )
        this.uniforms.uSpeech.value = this.speech
    }
}
