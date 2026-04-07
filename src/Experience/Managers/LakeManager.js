// import base
import Experience from '../Experience.js'
import AudioManager from './AudioManager.js'

// import librairies
import gsap from "gsap"

export default class LakeManager
{

    constructor(storyManager)
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.audioManager = new AudioManager()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.storyManager = storyManager 
        this.dialogueManager = storyManager.dialogueManager

        this.animationsClip = this.experience.world.animationsClip

        
        /**
         * inisialisations 
         */
        this.timeline = gsap.timeline({ paused: true });


        /**
         * Appel des instances
         */
        this.LakeTimeline();

    }


    enter() 
    {
        this.timeline.play();
    }


LakeTimeline() 
{
    this.timeline
        .to(this.camera.cameraTarget, { x: 7.5, y: 30, z: -35.5, duration: 3, ease: 'power2.inOut' })
        .to(this.camera.instance.position, { x: 29.5, y: 14, z: -17.5, duration: 5, ease: 'power2.inOut' })


        .to(this.camera.cameraTarget, { x: -21.1, y: 23, z: 92, duration: 2, ease: 'power2.inOut' }, ">")
        .to(this.camera.instance.position, { x: 27, y: 14, z: -18.8, duration: 2, ease: 'power2.inOut' }, ">")
        .to({}, { duration: 1 })


        .call(() => { this.experience.world.animationsClip.playClip(5); })
        .to({}, { duration: 0.2 })
        
        .call(() => { this.experience.world.animationsClip.playClip(4); })
        .to({}, { duration: 0.8 }) 
        
        .call(() => { this.experience.world.animationsClip.playClip(3); })
        .to({}, { duration: 3 }) 

        .call(() => {
            this.storyManager.showNextIndicator();
        })
        .addPause()


        .to(this.camera.instance.position, { x: 9.5, y: 14.5, z: 7.5, duration: 4, ease: 'power2.inOut' })
        .to(this.camera.cameraTarget, { x: -80, y: 20, z: 100, duration: 4, ease: 'power2.inOut' })
        

        .to({}, { duration: 1 }) 
        
        .call(() => {
            this.storyManager.showNextIndicator();
        })
        .addPause()


        .call(() => {
            /* this.storyManager.goTo('sword'); */
        });
    }
    

    exit()
    {

    }
    
}