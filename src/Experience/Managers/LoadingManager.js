// import base
import Experience from '../Experience.js'
import AudioManager from './AudioManager.js'
import { deferredGroups } from '../sources.js'

// import shaders
import overlayVertexShader from '../shaders/overlay/vertex.glsl'
import overlayFragmentShader from '../shaders/overlay/fragment.glsl'
import startExperienceVertexShader from '../shaders/startExperience/vertex.glsl'
import startExperienceFragmentShader from '../shaders/startExperience/fragment.glsl'

// import librairies
import * as THREE from 'three'


export default class LoadingManager
{

    constructor()
    {

        /**
         * Base 
         */
        this.experience = new Experience()
        this.audioManager = new AudioManager()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.time = this.experience.time
        this.debug = this.experience.debug


        /**
         * inisialisations 
         */
        // état expérience
        this.experienceStarted = false
        // état hover
        this.isHovered = false
        this.hoverValue = 0
        // état entrée
        this.isEntering = false
        this.enterProgress = 0
        // état fin
        this.isEnding = false
        this.endProgress = 1
        this.endExperienceActive = false
        // couleurs shaders
        this.portalColorStart = new THREE.Color('#3D2A47')
        this.portalColorEnd = new THREE.Color('#3D2A47')    
        

        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('loading')
        }


        /**
         * DOM 
         */
        this.overlay = document.querySelector('.loading-overlay')
        this.loadingText = document.querySelector('.loading-text')
        this.loadingBarContainer = document.querySelector('.loading-bar__container')
        this.loadingBar = document.querySelector('.loading-bar')
        this.startExperience = document.querySelector('.start-experience')
        this.endExperience = document.querySelector('.end-experience')


        /**
         * Appel des instances
         */
        this.overlayEvent()
    }


    setOverlay()
    {

        // plane
        this.overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        // material
        this.overlayMaterial = new THREE.ShaderMaterial(
        {

            transparent: true,
            depthWrite: false,
            uniforms:
            {
                uAlpha: { value: 1 },
                uColorStart: { value: this.portalColorStart.clone() },
                uColorEnd: { value: this.portalColorEnd.clone() },
            },
            vertexShader: overlayVertexShader,
            fragmentShader: overlayFragmentShader

        })

        // crée le mesh
        this.overlayMesh = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        // ajoute le mesh à la scène
        this.scene.add(this.overlayMesh)

    }


    // update progress
    updateProgress(progress)
    {
        // calcul pour mettre en %
        const percent = Math.round(progress * 100)

        // mets à jour la bar et le texte
        this.loadingBar.style.transform = `scaleX(${progress})`
        this.loadingText.textContent = `${percent}%`
    }


    // cache et détruit l'overlay
    hideOverlay()
    {
        this.overlay.classList.add('hidden')

        if(this.overlayMesh)
        {
            this.scene.remove(this.overlayMesh)
            this.overlayMesh.geometry.dispose()
            this.overlayMaterial.dispose()
            this.overlayMesh = null
            this.overlayMaterial = null
        }
    }


    /**
     * OverlayEvent
     * écoute le .start-experience pour l'état hover et entrée
     */
    overlayEvent()
    {

        this.startExperience.addEventListener('mouseenter', () =>
        {
            this.isHovered = true
        })

        this.startExperience.addEventListener('mouseleave', () =>
        {
            this.isHovered = false
        })

        this.startExperience.addEventListener('click', () =>
        {

            if(!this.experienceStarted && !this.isEntering)
            {
                // animation shader
                this.isEntering = true
                // protection db click
                this.startExperience.disabled = true
                // lance l'audio
                this.audioManager.startAmbiantMusic()


                /**
                 * Deferred
                 */
                // charge les sources d'arrière-plan
                this.startDeferredLoading()

                // redirection direct vers portal
                if(this.experience.storyManager.currentScene)
                {
                    this.experience.storyManager.currentScene.enter()
                }
            }

        })

        this.endExperience.addEventListener('mouseenter', () =>
        {
            this.isHovered = true
        })

        this.endExperience.addEventListener('mouseleave', () =>
        {
            this.isHovered = false
        })

        this.endExperience.addEventListener('click', () =>
        {
            window.location.reload()
        })

    }


    startDeferredLoading()
    {
        if(this.resources.deferredLoading) return

        this.resources.deferredLoading = this.resources.loadGroupsInOrder(deferredGroups)
    }


    setStartExperience(initialProgress = 0)
    {
        if(this.startMesh && this.startMaterial)
        {
            this.startMaterial.uniforms.uEnterProgress.value = initialProgress
            return
        }

        this.startGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
        this.startMaterial = new THREE.ShaderMaterial(
        {
            transparent: true,
            depthWrite: false,
            depthTest: false,

            uniforms: {
                uTime: { value: 0 },
                uHover: { value: 0 },
                uEnterProgress: { value: initialProgress },
                uAspect: { value: window.innerWidth / window.innerHeight },
                uColorStart: { value: this.portalColorStart.clone() },
                uColorEnd: { value: this.portalColorEnd.clone() },
            },

            vertexShader: startExperienceVertexShader,
            fragmentShader: startExperienceFragmentShader

        })

        // crée le mesh de start
        this.startMesh = new THREE.Mesh(this.startGeometry, this.startMaterial)
        this.startMesh.frustumCulled = false

        // ajoute le mesh de start à la scène
        this.scene.add(this.startMesh)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .addColor(this.debug.debugObject, 'portalColorStart')
                .onChange(() =>
                {
                    this.startMaterial.uniforms.uColorStart.value.set(
                        this.debug.debugObject.portalColorStart
                    )
                })

            this.debugFolder
                .addColor(this.debug.debugObject, 'portalColorEnd')
                .onChange(() =>
                {
                    this.startMaterial.uniforms.uColorEnd.value.set(
                        this.debug.debugObject.portalColorEnd
                    )
                })
        }
    }
    

    // affiche le startExperience
    showStartExperience()
    {
        this.startExperience.classList.remove('hidden')
    }


    // cache le startExperience
    hideStartExperience()
    {
        this.startExperience.classList.add('hidden')
        this.startExperience.disabled = true
        // hide le header 
        document.querySelector('.header').classList.add('header--playing')
        this.experience.storyManager.goTo('portal');

        if(this.startMesh)
        {
            this.scene.remove(this.startMesh)
            this.startMesh.geometry.dispose()
            this.startMaterial.dispose()
            this.startMesh = null
            this.startMaterial = null
        }
    }


    showEndExperience()
    {
        if(this.isEnding) return

        this.isEnding = true
        this.endExperienceActive = true
        this.endProgress = 1
        this.hoverValue = 0
        this.isHovered = false

        this.setStartExperience(this.endProgress)

        this.startExperience.classList.add('hidden')
        this.endExperience.classList.add('hidden')
        this.endExperience.disabled = true

        document.querySelector('.header')?.classList.remove('hidden', 'header--playing')
        document.querySelector('.audio-btn')?.classList.remove('hidden')
        document.querySelector('.dialogue-box')?.classList.remove('is-visible')
        document.querySelector('#choices-container').style.display = 'none'
    }


    showEndExperienceButton()
    {
        this.endExperience.disabled = false
        this.endExperience.classList.remove('hidden')
    }


   update()
    {
        if(!this.startMaterial || !this.startMesh) 
            return

            this.startMaterial.uniforms.uTime.value = this.time.elapsed * 0.001
            this.startMaterial.uniforms.uAspect.value = window.innerWidth / window.innerHeight

            const hoverTarget = this.isHovered && !this.isEntering ? 1.0 : 0.0
            this.hoverValue += (hoverTarget - this.hoverValue) * 0.08
            this.startMaterial.uniforms.uHover.value = this.hoverValue

        if(this.isEntering)
        {
            this.enterProgress += 0.018
            this.startMaterial.uniforms.uEnterProgress.value = this.enterProgress

            if(this.enterProgress >= 1.0)
            {
                this.enterProgress = 1.0
                this.isEntering = false
                this.experienceStarted = true
                this.hideStartExperience()
            }
        }

        if(this.isEnding)
        {
            this.endProgress -= 0.018
            this.startMaterial.uniforms.uEnterProgress.value = this.endProgress

            if(this.endProgress <= 0)
            {
                this.endProgress = 0
                this.startMaterial.uniforms.uEnterProgress.value = this.endProgress
                this.isEnding = false
                this.showEndExperienceButton()
            }
        }
    }

}
