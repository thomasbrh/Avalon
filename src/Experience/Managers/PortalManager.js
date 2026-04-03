// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'
import gsap from "gsap"

export default class PortalManager
{

    constructor(storyManager)
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.storyManager = storyManager 
        this.dialogueManager = storyManager.dialogueManager

        
        /**
         * inisialisations 
         */
        this.timeline = gsap.timeline({ paused: true });


        /**
         * Appel des instances
         */
        this.buildTimeline();

    }


    buildTimeline() {
        this.timeline

            .to(this.camera.instance.position, { x: 59, y: 15.5, z: 59.5, duration: 2, ease: 'power2.inOut' },)
            .to(this.camera.cameraTarget, { x: -112.5, y: 16.5, z: 360, duration: 2, ease: 'power2.inOut' }, "-=1.25")
            
            .addPause(">", () => 
            {
                this.experience.world.portal.playSound()
                this.storyManager.showNextIndicator()
            })
            
            
            .to(this.camera.cameraTarget, { x: 30.2, y: 16.5, z: -52, duration: 2, ease: 'power2.inOut' }, "<")
            .to(this.camera.instance.position, { x: 40.2, y: 15.5, z: 40, duration: 2, ease: 'power2.inOut' }, "-=1.2<")
            
            .addPause("+=0.25", () => 
            {
                this.dialogueManager.show('Ou est-ce que je suis ?')
                this.storyManager.showNextIndicator()
            })
            
            
            .addPause("+=0.25", () => 
            {
                this.dialogueManager.show('Tu es sur Avalon !')
                this.storyManager.showNextIndicator()
            })

        // exit
        .call(() => 
        {
            this.dialogueManager.hide()
            this.exit()
        })
    }


    enter() 
    {
        this.timeline.play();
    }
    

    exit()
    {
        /* goTo(lake) */
    }


    update()
    {

        // vérifier conditions de progression

    }
    
}