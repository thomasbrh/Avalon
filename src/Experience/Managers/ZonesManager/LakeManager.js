// import base
import Experience from '../../Experience.js'
import AudioManager from '../AudioManager.js'

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
        this.resources.on('ready', () => 
        {
            this.lakeTimeline();
        });

    }


    enter() 
    {
        this.timeline.play();
        console.log('lake')
    }


    lakeTimeline() 
    {
        /**
         * Data
         */
        this.targets = this.experience.world.lake.targets;
        this.morganne = this.experience.world.morganne.mesh;
        this.arthur = this.experience.world.arthur.mesh;
        
        this.timeline

            /**
             * Scene 2.1
             */


        .call(() => 
        {
            this.storyManager.goTo('sword');
        });
    }
    
}