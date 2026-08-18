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

        // prépare les clips
        this.mixer = new THREE.AnimationMixer(this.animationsModel.scene)
        this.clips = this.animationsModel.animations

        this.clipActions = {}
        this.currentClipAction = null
        this.currentClipIndex = null
        this.clipTween = null
        
        console.log(this.clips) 


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


    // bloc pour jouer une animation
    playClip(index)
    {
        if (!this.mixer || !this.clips[index]) return

        this.stopCurrentClip()

        const action = this.mixer.clipAction(this.clips[index])
        action.reset()
        action.setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true
        action.play()

        this.currentClipAction = action
        this.currentClipIndex = index
    }


    // clip d'animations pour les ponts
    setClipProgress(index, progress)
    {
        if (!this.mixer || !this.clips[index]) return false

        const clip = this.clips[index]

        if(!this.clipActions[index])
        {
            this.clipActions[index] = this.mixer.clipAction(clip)
            this.clipActions[index].reset()
            this.clipActions[index].setLoop(THREE.LoopOnce, 1)
            this.clipActions[index].clampWhenFinished = true
            this.clipActions[index].play()
        }

        const action = this.clipActions[index]
        const safeProgress = Math.min(Math.max(progress, 0), 1)

        action.enabled = true
        action.paused = true
        action.time = clip.duration * safeProgress

        this.currentClipAction = action
        this.currentClipIndex = index

        this.mixer.update(0)

        return true
    }


    playClipPart(index, startProgress, endProgress, onComplete)
    {
        if (!this.mixer || !this.clips[index]) return false

        const clipReady = this.setClipProgress(index, startProgress)
        if(!clipReady) return false

        if(this.clipTween)
        {
            this.clipTween.kill()
            this.clipTween = null
        }

        const clip = this.clips[index]
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
                this.currentClipAction.time = animation.time
                this.mixer.update(0)
            },
            onComplete: () =>
            {
                this.clipTween = null
                this.setClipProgress(index, endProgress)

                if(onComplete)
                {
                    onComplete()
                }
            }
        })

        return true
    }


    stopCurrentClip()
    {
        if(!this.mixer) return

        if(this.clipTween)
        {
            this.clipTween.kill()
            this.clipTween = null
        }

        this.currentClipAction = null
        this.currentClipIndex = null
    }

}
