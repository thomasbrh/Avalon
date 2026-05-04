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
        this.resources.on('ready', () => 
        {
            this.LakeTimeline();
        });

    }


    enter() 
    {
        this.timeline.play();
    }


    LakeTimeline() 
    {
        this.targets = this.experience.world.lake.targets;
        
        this.timeline
            // camera se déplace sur le pont du portal
            .to(this.camera.instance.position, 
                { 
                    x: this.targets['TargetLake_portalTowerDown'].x,
                    y: this.targets['TargetLake_portalTowerDown'].y,
                    z: this.targets['TargetLake_portalTowerDown'].z,
                    duration: 6,    
                    ease: 'power2.inOut' 
                }, ">")

            // camera regarde vers le lac
            .to(this.camera.cameraTarget, 
                { 
                    x: this.targets['TargetLake_portalTowerDown'].x, 
                    y: this.targets['TargetLake_portalTowerDown'].y, 
                    z: this.targets['TargetLake_portalTowerDown'].z, 
                    duration: 3,
                    ease: 'power2.inOut' 
                }, ">")

            .call(() => { this.experience.world.animationsClip.playClip(0); })
            .to({}, { duration: 5 })

            // camera se déplace sur le pont de la sword
            .to(this.camera.instance.position, 
                { 
                    x: this.targets['TargetLake_portalTowerDown'].x,
                    y: this.targets['TargetLake_portalTowerDown'].y,
                    z: this.targets['TargetLake_portalTowerDown'].z,
                    duration: 6,    
                    ease: 'power2.inOut' 
                }, ">")
        
            .to(this.camera.cameraTarget, { x: -80, y: 20, z: 100, duration: 4, ease: 'power2.inOut' }, "<=+1")
            
            .call(() => 
            {
                this.storyManager.showNextIndicator();
            })
            .addPause()
        
            
            .call(() => 
            {
                this.storyManager.showNextIndicator();
            })
            .addPause()


            .call(() => 
            {
                /* this.storyManager.goTo('sword'); */
            });
        }
        

        exit()
        {

        }
    
}