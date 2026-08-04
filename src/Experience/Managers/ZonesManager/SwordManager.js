// import base
import Experience from '../../Experience.js'
import AudioManager from '../AudioManager.js'
import { deferredGroups } from '../../sources.js'

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

        
        /**
         * inisialisations 
         */
        this.timeline = gsap.timeline({ paused: true });


    }


    init()
    {
        this.swordTimeline()
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
            .call(() => 
            { 
                // show sword
                this.experience.world.sword.model.visible = true 
            })

            /**
             * Scene 3.1
             */
            // camera se déplace vers scène 1
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera1'].x, 
                y: this.targets['TargetSword_camera1'].y, 
                z: this.targets['TargetSword_camera1'].z, 
                duration: 2.2, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 1
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_target1'].x, 
                y: this.targets['TargetSword_target1'].y, 
                z: this.targets['TargetSword_target1'].z, 
                duration: 2,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne1'].x, 
                y: this.targets['TargetSword_morganne1'].y, 
                z: this.targets['TargetSword_morganne1'].z, 
                duration: 2.5, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetSword_arthur1'].x,
                y: this.targets['TargetSword_arthur1'].y,
                z: this.targets['TargetSword_arthur1'].z,
                duration: 2.8,
                ease: 'power2.inOut'
            }, "<")

            .addLabel('checkpoint-sword')

            .call(async () =>
            {
                this.timeline.pause();
                /**
                 * Choix sword
                 */
                const choices = [
                    { text: "Le roc", isCorrect: true },
                    { text: "Un tronc", isCorrect: false },
                ];

                this.storyManager.showChoices(choices, async (isCorrect) =>
                {
                    if (isCorrect)
                    {
                        // dame du lac 2.1-success-1
                        await this.dialogueManager.playLine(
                            "Dame du Lac",
                            "Oui. Le roc. La pierre de ton destin.",
                            'audio/dialogue-lake/damedulac_voices-2.1-success-1.ogg');
                        this.dialogueManager.hide();
                        this.timeline.play();
                    }
                    else
                    {
                        // dame du lac 2.1-fail-1
                        await this.dialogueManager.playLine(
                            "Dame du Lac",
                            "Non. Ce n'est pas le bois, creuse encore.",
                            'audio/dialogue-lake/damedulac_voices-2.1-fail-1.ogg');
                    }
                });
            })

            // lance l'animation du pont
            .call(() => { this.experience.world.animationsClip.playClip(0); }, null, "+=0.1")
            .to({}, { duration: 4.7 })


            .call(async () =>
            {
                this.timeline.pause();

                // dame du lac 2.2-1
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Va jusqu'à la grotte. Puis reviens à moi.",
                    'audio/dialogue-lake/damedulac_voices-2.2-1.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })


            .call(async () =>
            {
                this.timeline.pause();

                // arthur 3.1-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Là bas, dans la grotte… Il y a quelque chose qui m'appelle. Je ne le vois pas mais je le sens.",
                    'audio/dialogue-sword/arthur_voices-3.1-1.ogg');


                    
                // morgane 3.1-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Alors suis ton instinct. Ce qui t'attend dans cette grotte t'appartient déjà.",
                    'audio/dialogue-sword/morgane_voices-3.1-1.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 3.2
             */
            // camera se déplace vers scène 2
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera2'].x, 
                y: this.targets['TargetSword_camera2'].y, 
                z: this.targets['TargetSword_camera2'].z, 
                duration: 2.1, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 2
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_target2'].x, 
                y: this.targets['TargetSword_target2'].y, 
                z: this.targets['TargetSword_target2'].z, 
                duration: 1.9,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne2'].x, 
                y: this.targets['TargetSword_morganne2'].y, 
                z: this.targets['TargetSword_morganne2'].z, 
                duration: 2.3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur2'].x, 
                y: this.targets['TargetSword_arthur2'].y, 
                z: this.targets['TargetSword_arthur2'].z, 
                duration: 2.6, 
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
                duration: 2.8, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 3
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_target3'].x, 
                y: this.targets['TargetSword_target3'].y, 
                z: this.targets['TargetSword_target3'].z, 
                duration: 2.5,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne3'].x, 
                y: this.targets['TargetSword_morganne3'].y, 
                z: this.targets['TargetSword_morganne3'].z, 
                duration: 2.8, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetSword_arthur3'].x,
                y: this.targets['TargetSword_arthur3'].y,
                z: this.targets['TargetSword_arthur3'].z,
                duration: 2.8,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // arthur 3.3-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Des souvenirs me reviennent…",
                    'audio/dialogue-sword/arthur_voices-3.3-1.ogg');
                // arthur 3.3-2
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Une pierre, des regards, une foule à genoux…",
                    'audio/dialogue-sword/arthur_voices-3.3-2.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 3.4
             */
            .call(() =>
            {
                // hide lake + anim
                this.experience.world.lake.model.visible = false
                this.experience.world.animationsClip.model.visible = false
            })


            // camera se déplace vers scène 4
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera4'].x, 
                y: this.targets['TargetSword_camera4'].y, 
                z: this.targets['TargetSword_camera4'].z, 
                duration: 2.3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 4
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_target4'].x, 
                y: this.targets['TargetSword_target4'].y, 
                z: this.targets['TargetSword_target4'].z, 
                duration: 2.4,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne4'].x, 
                y: this.targets['TargetSword_morganne4'].y, 
                z: this.targets['TargetSword_morganne4'].z, 
                duration: 2.7, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetSword_arthur4'].x,
                y: this.targets['TargetSword_arthur4'].y,
                z: this.targets['TargetSword_arthur4'].z,
                duration: 2.9,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // morgane 3.4-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "N'avance pas trop vite.",
                    'audio/dialogue-sword/morgane_voices-3.4-1.ogg');
                // morgane 3.4-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Laisse les souvenirs traverser la brume.",
                    'audio/dialogue-sword/morgane_voices-3.4-2.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 3.5
             */
            // camera se déplace vers scène 5
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera5'].x, 
                y: this.targets['TargetSword_camera5'].y, 
                z: this.targets['TargetSword_camera5'].z, 
                duration: 2.2, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 5
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_target5'].x, 
                y: this.targets['TargetSword_target5'].y, 
                z: this.targets['TargetSword_target5'].z, 
                duration: 2,
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetSword_arthur5'].x,
                y: this.targets['TargetSword_arthur5'].y,
                z: this.targets['TargetSword_arthur5'].z,
                duration: 2.6,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // arthur 3.5-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "J'ai tiré cette épée. Personne n'y croyait. Pas même moi.",
                    'audio/dialogue-sword/arthur_voices-3.5-1.ogg');
                // arthur 3.5-2
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Et lorsqu'elle est sortie du roc… tout a changé.",
                    'audio/dialogue-sword/arthur_voices-3.5-2.ogg');



                // morgane 3.5-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Ce jour-là, quelque chose s'est éveillé en toi.",
                    'audio/dialogue-sword/morgane_voices-3.5-1.ogg');


                    
                // arthur 3.5-3
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Qu'est-ce que cela signifiait ?",
                    'audio/dialogue-sword/arthur_voices-3.5-3.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 3.6
             */
            .call(() =>
            {
                // show lake + anim
                this.experience.world.lake.model.visible = true
                this.experience.world.animationsClip.model.visible = true
            })


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
                x: this.targets['TargetSword_target6'].x,
                y: this.targets['TargetSword_target6'].y,
                z: this.targets['TargetSword_target6'].z,
                duration: 2.2,
                ease: 'power2.inOut'
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetSword_arthur6'].x,
                y: this.targets['TargetSword_arthur6'].y,
                z: this.targets['TargetSword_arthur6'].z,
                duration: 2.6,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // morgane 3.6-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Cette lame ne pouvait être tirée que par celui qui portait le sang royal. Ce jour-là, Arthur, le royaume a reconnu son roi.",
                    'audio/dialogue-sword/morgane_voices-3.6-1.ogg');



                // arthur 3.6-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "J'étais donc roi ?",
                    'audio/dialogue-sword/arthur_voices-3.6-1.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 3.7
             */
            // intermédiaire all scène 6 to 7
            //intermédiaire caméra 61
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetSword_camera61'].x,
                y: this.targets['TargetSword_camera61'].y,
                z: this.targets['TargetSword_camera61'].z,
                duration: 2.4,
                ease: 'power2.inOut'
            })
            // intermédiaire target 61
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetSword_target61'].x,
                y: this.targets['TargetSword_target61'].y,
                z: this.targets['TargetSword_target61'].z,
                duration: 2.1,
                ease: 'power2.inOut'
            }, "<")
            // intermédiaire morganne position 61
            .to(this.morganne.position,
            {
                x: this.targets['TargetSword_morganne61'].x,
                y: this.targets['TargetSword_morganne61'].y,
                z: this.targets['TargetSword_morganne61'].z,
                duration: 2.4,
                ease: 'power2.inOut'
            }, "<")
            // intermédiaire arthur position 61
            .to(this.arthur.position,
            {
                x: this.targets['TargetSword_arthur61'].x,
                y: this.targets['TargetSword_arthur61'].y,
                z: this.targets['TargetSword_arthur61'].z,
                duration: 2.6,
                ease: 'power2.inOut'
            }, "<")


            // position caméra finale 7
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetSword_camera7'].x,
                y: this.targets['TargetSword_camera7'].y,
                z: this.targets['TargetSword_camera7'].z,
                duration: 2.6,
                ease: 'power2.inOut'
            }, ">")
            // position target finale 7
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetSword_target7'].x,
                y: this.targets['TargetSword_target7'].y,
                z: this.targets['TargetSword_target7'].z,
                duration: 2.2,
                ease: 'power2.inOut'
            }, "<")
            // position morganne finale 7
            .to(this.morganne.position,
            {
                x: this.targets['TargetSword_morganne7'].x,
                y: this.targets['TargetSword_morganne7'].y,
                z: this.targets['TargetSword_morganne7'].z,
                duration: 2.1,
                ease: 'power2.inOut'
            }, "<")
            // position arthur finale 7
            .to(this.arthur.position,
            {
                x: this.targets['TargetSword_arthur7'].x,
                y: this.targets['TargetSword_arthur7'].y,
                z: this.targets['TargetSword_arthur7'].z,
                duration: 2.2,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // morgane 3.7-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "La Dame du Lac t'attend.",
                    'audio/dialogue-sword/morgane_voices-3.7-1.ogg');
                // morgane 3.7-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Maintenant que la pierre a parlé, l'eau peut te rendre le reste.",
                    'audio/dialogue-sword/morgane_voices-3.7-2.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 3.8
             */
            // camera se déplace vers scène 8
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetSword_camera8'].x, 
                y: this.targets['TargetSword_camera8'].y, 
                z: this.targets['TargetSword_camera8'].z, 
                duration: 2.5, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 8
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetSword_target8'].x, 
                y: this.targets['TargetSword_target8'].y, 
                z: this.targets['TargetSword_target8'].z, 
                duration: 2.2,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetSword_morganne8'].x, 
                y: this.targets['TargetSword_morganne8'].y, 
                z: this.targets['TargetSword_morganne8'].z, 
                duration: 2.7, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetSword_arthur8'].x, 
                y: this.targets['TargetSword_arthur8'].y, 
                z: this.targets['TargetSword_arthur8'].z, 
                duration: 2.9, 
                ease: 'power2.inOut' 
            }, "<")


        .call(async () =>
        {
            await this.resources.loadGroup('manor', deferredGroups.manor)
            this.experience.world.createManorZone()
            await this.experience.uploadGroupTextures('manor')

            this.storyManager.goTo('manor');
        });
    }
    
}
