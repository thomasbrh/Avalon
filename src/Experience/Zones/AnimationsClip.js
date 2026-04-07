// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'


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
        
        console.log(this.clips) 


        /**
         * Appel des instances
         */
        this.setTexture()
        this.setModel()

    }


    setTexture()
    {

        // Matériau
        this.animationsMaterial = new THREE.MeshBasicMaterial(
        {
            color: '#fff',
        })

        // Applique le matériau à tous les meshes du modèle
        this.model.traverse((child) =>
        {

            if(child.isMesh)
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


    // bloc pour jouer une animation
    playClip(index) 
    {

        if (!this.mixer || !this.clips[index]) return

        const action = this.mixer.clipAction(this.clips[index])
        action.reset()
        action.setLoop(THREE.LoopOnce, 1)
        action.clampWhenFinished = true
        action.play()

    }

}