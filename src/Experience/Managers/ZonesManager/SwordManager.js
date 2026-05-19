// import base
import Experience from '../../Experience.js'
import AudioManager from '../AudioManager.js'

// import librairies
import gsap from "gsap"

export default class SwordManager
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
            this.swordTimeline();   
        });

    }


    enter() 
    {
        this.timeline.play();
        console.log('sword')
    }


    swordTimeline() 
    {    
        /**
         * Data
         */
        this.targets = this.experience.world.sword.targets;
        this.morganne = this.experience.world.morganne.mesh;
        this.arthur = this.experience.world.arthur.mesh;


        this.timeline
            /**
             * Scene 3.1
             */
            // camera se déplace vers scène 1
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera1'].x, 
                y: this.targets['TargetSword_camera1'].y, 
                z: this.targets['TargetSword_camera1'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 1
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_arthur1'].x, 
                y: this.targets['TargetSword_arthur1'].y, 
                z: this.targets['TargetSword_arthur1'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne1'].x, 
                y: this.targets['TargetSword_morganne1'].y, 
                z: this.targets['TargetSword_morganne1'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur1'].x, 
                y: this.targets['TargetSword_arthur1'].y, 
                z: this.targets['TargetSword_arthur1'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scene 3.2
             */
            // camera se déplace vers scène 2
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera2'].x, 
                y: this.targets['TargetSword_camera2'].y, 
                z: this.targets['TargetSword_camera2'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 2
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_arthur2'].x, 
                y: this.targets['TargetSword_arthur2'].y, 
                z: this.targets['TargetSword_arthur2'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne2'].x, 
                y: this.targets['TargetSword_morganne2'].y, 
                z: this.targets['TargetSword_morganne2'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur2'].x, 
                y: this.targets['TargetSword_arthur2'].y, 
                z: this.targets['TargetSword_arthur2'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scene 3.3
             */
            // camera se déplace vers scène 3
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera3'].x, 
                y: this.targets['TargetSword_camera3'].y, 
                z: this.targets['TargetSword_camera3'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 3
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_arthur3'].x, 
                y: this.targets['TargetSword_arthur3'].y, 
                z: this.targets['TargetSword_arthur3'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne3'].x, 
                y: this.targets['TargetSword_morganne3'].y, 
                z: this.targets['TargetSword_morganne3'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur3'].x, 
                y: this.targets['TargetSword_arthur3'].y, 
                z: this.targets['TargetSword_arthur3'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scene 3.4
             */
            // camera se déplace vers scène 4
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera4'].x, 
                y: this.targets['TargetSword_camera4'].y, 
                z: this.targets['TargetSword_camera4'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 4
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_arthur4'].x, 
                y: this.targets['TargetSword_arthur4'].y, 
                z: this.targets['TargetSword_arthur4'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne4'].x, 
                y: this.targets['TargetSword_morganne4'].y, 
                z: this.targets['TargetSword_morganne4'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur4'].x, 
                y: this.targets['TargetSword_arthur4'].y, 
                z: this.targets['TargetSword_arthur4'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scene 3.5
             */
            // camera se déplace vers scène 5
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera5'].x, 
                y: this.targets['TargetSword_camera5'].y, 
                z: this.targets['TargetSword_camera5'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 5
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_arthur5'].x, 
                y: this.targets['TargetSword_arthur5'].y, 
                z: this.targets['TargetSword_arthur5'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur5'].x, 
                y: this.targets['TargetSword_arthur5'].y, 
                z: this.targets['TargetSword_arthur5'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scene 3.6
             */
            // camera se déplace vers scène 6
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera6'].x, 
                y: this.targets['TargetSword_camera6'].y, 
                z: this.targets['TargetSword_camera6'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 6
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_arthur6'].x, 
                y: this.targets['TargetSword_arthur6'].y, 
                z: this.targets['TargetSword_arthur6'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne6'].x, 
                y: this.targets['TargetSword_morganne6'].y, 
                z: this.targets['TargetSword_morganne6'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur6'].x, 
                y: this.targets['TargetSword_arthur6'].y, 
                z: this.targets['TargetSword_arthur6'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scene 3.7
             */
            // camera se déplace vers scène 7
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera7'].x, 
                y: this.targets['TargetSword_camera7'].y, 
                z: this.targets['TargetSword_camera7'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 7
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_arthur7'].x, 
                y: this.targets['TargetSword_arthur7'].y, 
                z: this.targets['TargetSword_arthur7'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne7'].x, 
                y: this.targets['TargetSword_morganne7'].y, 
                z: this.targets['TargetSword_morganne7'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur7'].x, 
                y: this.targets['TargetSword_arthur7'].y, 
                z: this.targets['TargetSword_arthur7'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")
            

            .call(() => 
            {
                this.storyManager.showNextIndicator();
            })
            .addPause()


        .call(() => 
        {
            this.storyManager.goTo('manor');
        });
    }
    
}