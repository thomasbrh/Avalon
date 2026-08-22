// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'
import gsap from "gsap"


export default class AnimationsClip
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
        this.animationsModel = this.resources.items.animationsModel
        this.model = this.animationsModel.scene

        /**
         * Initialisation des animations
         */
        this.mixer = new THREE.AnimationMixer(this.animationsModel.scene)
        this.clips = this.animationsModel.animations
        this.clipActions = []
        this.clipTween = null


        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()

    }


    setTexture()
    {

        /**
         * Bridges animations
         */
        this.animationsTextureLightmap = this.resources.items.animationsTextureLightmap
        this.animationsTextureLightmap.flipY = false
        this.animationsTextureLightmap.colorSpace = THREE.SRGBColorSpace

        this.animationsMaterial = new THREE.MeshStandardMaterial(
        {
            map: this.animationsTextureLightmap,

            normalMap: this.resources.items.animationsTextureNormalmap,
        })

        this.model .traverse((child) => 
        {
            if (child.isMesh)
            {
                child.material = this.animationsMaterial
            }
        })

    }


    setModel()
    {
        // add the animations to the scene
        this.scene.add(this.model)
    }


    setVisible(bool)
    {
        this.model.visible = bool
    }


    dispose()
    {
        this.stopClipTween()
        this.model.visible = false
        this.mixer.stopAllAction()
        this.mixer = null
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


    /**
     * Place un pont à un moment précis de son animation
     */
    setClipProgress(index, progress)
    {
        const clip = this.clips[index]
        let action = this.clipActions[index]

        if(!action)
        {
            action = this.mixer.clipAction(clip)
            action.setLoop(THREE.LoopOnce, 1)
            action.clampWhenFinished = true
            action.play()
            this.clipActions[index] = action
        }

        // l'action reste en pause car GSAP change son temps manuellement
        action.enabled = true
        action.paused = true
        action.time = clip.duration * progress

        // force la mise à jour visuelle du modèle
        this.mixer.update(0)

        return action
    }


    /**
     * Anime seulement une partie du pont entre deux progressions
     */
    playClipPart(index, startProgress, endProgress, onComplete)
    {
        this.stopClipTween()
        const clip = this.clips[index]
        const action = this.setClipProgress(index, startProgress)
        const startTime = clip.duration * startProgress
        const endTime = clip.duration * endProgress
        const partDuration = endTime - startTime

        const animation = { time: startTime }

        this.clipTween = gsap.to(animation,
        {
            time: endTime,
            duration: partDuration,
            ease: 'power1.inOut',
            onUpdate: () =>
            {
                action.time = animation.time
                this.mixer.update(0)
            },
            onComplete: () =>
            {
                this.clipTween = null
                this.setClipProgress(index, endProgress)
                onComplete()
            }
        })
    }


    /**
     * Stop le clip en cours
     */
    stopClipTween()
    {
        if(this.clipTween)
        {
            this.clipTween.kill()
            this.clipTween = null
        }
    }

}
