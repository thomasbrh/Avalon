// import base
import Experience from '../../Experience.js'
import AudioManager from '../AudioManager.js'

// import librairies
import gsap from "gsap"


export default class ManorManager
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
        this.manorTimeline()
    }


    enter()
    {
        this.timeline.play();
        console.log('manor')
    }


    manorTimeline() 
    {
        /**
         * Data
         */
        this.targets = this.experience.world.manor.targets;
        this.morganne = this.experience.world.morganne.mesh;
        this.arthur = this.experience.world.arthur.mesh;
        
        
        this.timeline
            /**
             * Scene 4.1
             */
            // camera se déplace vers scène 1
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetManor_camera1'].x, 
                y: this.targets['TargetManor_camera1'].y, 
                z: this.targets['TargetManor_camera1'].z, 
                duration: 2.5, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 1
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetManor_target1'].x, 
                y: this.targets['TargetManor_target1'].y, 
                z: this.targets['TargetManor_target1'].z, 
                duration: 2.4,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetManor_morganne1'].x, 
                y: this.targets['TargetManor_morganne1'].y, 
                z: this.targets['TargetManor_morganne1'].z, 
                duration: 2.6, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetManor_arthur1'].x,
                y: this.targets['TargetManor_arthur1'].y,
                z: this.targets['TargetManor_arthur1'].z,
                duration: 2.8,
                ease: 'power2.inOut'
            }, "<")

            .addLabel('checkpoint-manor')

            .call(async () =>
            {
                this.timeline.pause();

                // dame du lac 4.1-1
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Ahh.. te voilà revenu. Je vois que la pierre t'a reconnu.",
                    'audio/dialogue-manor/damedulac_voices-4.1-1.ogg');



                // arthur 4.1-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Oui, j'ai vu le jour où tout a commencé.",
                    'audio/dialogue-manor/arthur_voices-4.1-1.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 4.2
             */
            // camera se déplace vers scène 2
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetManor_camera2'].x, 
                y: this.targets['TargetManor_camera2'].y, 
                z: this.targets['TargetManor_camera2'].z, 
                duration: 2.8, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 2
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetManor_target2'].x, 
                y: this.targets['TargetManor_target2'].y, 
                z: this.targets['TargetManor_target2'].z, 
                duration: 2.6,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetManor_morganne2'].x, 
                y: this.targets['TargetManor_morganne2'].y, 
                z: this.targets['TargetManor_morganne2'].z, 
                duration: 2.9, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetManor_arthur2'].x,
                y: this.targets['TargetManor_arthur2'].y,
                z: this.targets['TargetManor_arthur2'].z,
                duration: 3,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // dame du lac 4.2-1
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Excalibur t'a rappelé autre chose… Un roi n'est pas seulement celui qui règne.",
                    'audio/dialogue-manor/damedulac_voices-4.2-1.ogg');
                // dame du lac 4.2-2
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "C'est celui qui protège, sert et porte le poids des autres.",
                    'audio/dialogue-manor/damedulac_voices-4.2-2.ogg');


                // arthur 4.2-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Ce n'était donc pas une récompense ?",
                    'audio/dialogue-manor/arthur_voices-4.2-1.ogg');


                // dame du lac 4.2-3
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Non, c'était un serment.",
                    'audio/dialogue-manor/damedulac_voices-4.2-3.ogg');

                // info journal
                this.storyManager.journalManager.unlock('info-serment-roi')

                // dame du lac 4.2-4
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Maintenant que tu as compris, rejoins le sommet de la montagne. Là-bas, un château t'attend.",
                    'audio/dialogue-manor/damedulac_voices-4.2-4.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 4.3
             */
            .call(async () =>
            {
                this.timeline.pause();

                /**
                 * Question Manor
                 */
                // morgane 4.3-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Pour avancer, souviens-toi du nom de ton royaume.",
                    'audio/dialogue-manor/morgane_voices-4.3-1.ogg');

                /**
                 * Choix manor
                 */
                const choices = [
                    { text: "Tintagel", isCorrect: false },
                    { text: "Camelot", isCorrect: true },
                ];

                // affiche les choix
                this.storyManager.showChoices(choices, async (isCorrect) =>
                {
                    if (isCorrect)
                    {
                        await this.dialogueManager.playLine(
                            "Morgane",
                            "Oui, Camelot. C'était le cœur de ton royaume et le siège de la Table Ronde.",
                            'audio/dialogue-manor/morgane_voices-4.3-success-1.ogg');

                        // info journal
                        this.storyManager.journalManager.unlock('info-camelot')

                        this.dialogueManager.hide();
                        this.timeline.play();
                    }
                    else
                    {
                        await this.dialogueManager.playLine(
                            "Morgane",
                            "Non, Tintagel est ton lieu de naissance. Ton château se trouve plus au centre du royaume.",
                            'audio/dialogue-manor/morgane_voices-4.3-fail-1.ogg');
                    }
                });
            })
            
            // lance l'animation du pont
            .call(() => { this.experience.world.animationsClip.playClip(1); }, null, "+=0.1")
            .to({}, { duration: 4.7 })


            // intermédiaire camera scène 2 to 3
            // camera se déplace vers scène 21
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetManor_camera21'].x,
                y: this.targets['TargetManor_camera21'].y,
                z: this.targets['TargetManor_camera21'].z,
                duration: 1.9,
                ease: 'power2.inOut'
            })
            // camera regarde vers scène 21
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetManor_target21'].x,
                y: this.targets['TargetManor_target21'].y,
                z: this.targets['TargetManor_target21'].z,
                duration: 1.7,
                ease: 'power2.inOut'
            }, "<")


            // morganne psoition
            .to(this.morganne.position,
            {
                x: this.targets['TargetManor_morganne3'].x,
                y: this.targets['TargetManor_morganne3'].y,
                z: this.targets['TargetManor_morganne3'].z,
                duration: 3.2,
                ease: 'power2.inOut'
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetManor_arthur3'].x,
                y: this.targets['TargetManor_arthur3'].y,
                z: this.targets['TargetManor_arthur3'].z,
                duration: 3.5,
                ease: 'power2.inOut'
            }, "<")
            // camera se déplace vers scène 3
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetManor_camera3'].x,
                y: this.targets['TargetManor_camera3'].y,
                z: this.targets['TargetManor_camera3'].z,
                duration: 2.2,
                ease: 'power2.inOut'
            }, ">")
            // camera regarde vers scène 3
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetManor_target3'].x,
                y: this.targets['TargetManor_target3'].y,
                z: this.targets['TargetManor_target3'].z,
                duration: 2,
                ease: 'power2.inOut'
            }, "<")



            /**
             * Scene 4.4
             */
            // camera se déplace vers scène 4
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetManor_camera4'].x, 
                y: this.targets['TargetManor_camera4'].y, 
                z: this.targets['TargetManor_camera4'].z, 
                duration: 2, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 4
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetManor_target4'].x, 
                y: this.targets['TargetManor_target4'].y, 
                z: this.targets['TargetManor_target4'].z, 
                duration: 1.8,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetManor_morganne4'].x, 
                y: this.targets['TargetManor_morganne4'].y, 
                z: this.targets['TargetManor_morganne4'].z, 
                duration: 2.2, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetManor_arthur4'].x,
                y: this.targets['TargetManor_arthur4'].y,
                z: this.targets['TargetManor_arthur4'].z,
                duration: 2.5,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // arthur 4.4-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Mes souvenirs sont encore vagues. Les visages restent flous et les voix se mélangent.",
                    'audio/dialogue-manor/arthur_voices-4.4-1.ogg');
                // morgane 4.4-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Sois patient. Continuons notre ascension.",
                    'audio/dialogue-manor/morgane_voices-4.4-1.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 4.5
             */
            // camera se déplace vers scène 5
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetManor_camera5'].x, 
                y: this.targets['TargetManor_camera5'].y, 
                z: this.targets['TargetManor_camera5'].z, 
                duration: 2.5, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 5
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetManor_target5'].x, 
                y: this.targets['TargetManor_target5'].y, 
                z: this.targets['TargetManor_target5'].z, 
                duration: 2.3,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetManor_morganne5'].x, 
                y: this.targets['TargetManor_morganne5'].y, 
                z: this.targets['TargetManor_morganne5'].z, 
                duration: 2.2, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetManor_arthur5'].x,
                y: this.targets['TargetManor_arthur5'].y,
                z: this.targets['TargetManor_arthur5'].z,
                duration: 2.6,
                ease: 'power2.inOut'
            }, "<")

            
            .call(() =>
            {
                // hide all sauf manor
                if(this.experience.world.lake) this.experience.world.lake.model.visible = false
                if(this.experience.world.sword) this.experience.world.sword.model.visible = false
                if(this.experience.world.animationsClip) this.experience.world.animationsClip.model.visible = false

                // show manor
                this.experience.world.manor.model.visible = true 
            })
            
            .call(async () =>
            {
                this.timeline.pause();

                // arthur 4.5-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Je me souviens d'une table, d'un serment et d'hommes que j'appelais mes frères…",
                    'audio/dialogue-manor/arthur_voices-4.5-1.ogg');



                // morgane 4.5-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Alors, c'est que tu es prêt pour le dernier lieu.",
                    'audio/dialogue-manor/morgane_voices-4.5-1.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 4.6
             */
            // intermédiaire caméra scène 5 to 6
            // camera se déplace vers scène 51
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetManor_camera51'].x,
                y: this.targets['TargetManor_camera51'].y,
                z: this.targets['TargetManor_camera51'].z,
                duration: 1.8,
                ease: 'power2.inOut'
            })
            // camera regarde vers scène 51
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetManor_target51'].x,
                y: this.targets['TargetManor_target51'].y,
                z: this.targets['TargetManor_target51'].z,
                duration: 1.6,
                ease: 'power2.inOut'
            }, "<")


            // morganne psoition
            .to(this.morganne.position,
            {
                x: this.targets['TargetManor_morganne6'].x,
                y: this.targets['TargetManor_morganne6'].y,
                z: this.targets['TargetManor_morganne6'].z,
                duration: 2,
                ease: 'power2.inOut'
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetManor_arthur6'].x,
                y: this.targets['TargetManor_arthur6'].y,
                z: this.targets['TargetManor_arthur6'].z,
                duration: 2.1,
                ease: 'power2.inOut'
            }, "<")
            // camera se déplace vers scène 6
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetManor_camera6'].x,
                y: this.targets['TargetManor_camera6'].y,
                z: this.targets['TargetManor_camera6'].z,
                duration: 2.5,
                ease: 'power2.inOut'
            }, ">")
            // camera regarde vers scène 6
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetManor_target6'].x,
                y: this.targets['TargetManor_target6'].y,
                z: this.targets['TargetManor_target6'].z,
                duration: 2.3,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // arthur 4.6-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Mes frères d'armes… Lancelot. Gauvain. Perceval.",
                    'audio/dialogue-manor/arthur_voices-4.6-1.ogg');

                // info journal
                this.storyManager.journalManager.unlock('info-compagnons')

                // arthur 4.6-2
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Je vais enfin les revoir.",
                    'audio/dialogue-manor/arthur_voices-4.6-2.ogg');



                // morgane 4.6-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Mais rappelle-toi qu'Avalon ne montre jamais un souvenir sans raison.",
                    'audio/dialogue-manor/morgane_voices-4.6-1.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 4.7
             */
            // camera se déplace vers scène 7
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetManor_camera7'].x, 
                y: this.targets['TargetManor_camera7'].y, 
                z: this.targets['TargetManor_camera7'].z, 
                duration: 1.8, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 7
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetManor_target7'].x, 
                y: this.targets['TargetManor_target7'].y, 
                z: this.targets['TargetManor_target7'].z, 
                duration: 1.6,
                ease: 'power2.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetManor_morganne7'].x, 
                y: this.targets['TargetManor_morganne7'].y, 
                z: this.targets['TargetManor_morganne7'].z, 
                duration: 2.2, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetManor_arthur7'].x,
                y: this.targets['TargetManor_arthur7'].y,
                z: this.targets['TargetManor_arthur7'].z,
                duration: 2.4,
                ease: 'power2.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // arthur 4.7-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Je croyais avancer vers un festin.",
                    'audio/dialogue-manor/arthur_voices-4.7-1.ogg');
                // arthur 4.7-2
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Vers des rires, des chants, des coupes levées autour de la Table Ronde.",
                    'audio/dialogue-manor/arthur_voices-4.7-2.ogg');
                // arthur 4.7-3
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Mais plus nous nous approchons… plus mon cœur se serre.",
                    'audio/dialogue-manor/arthur_voices-4.7-3.ogg');



                // morgane 4.7-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Parce qu'une part de toi sait déjà.",
                    'audio/dialogue-manor/morgane_voices-4.7-1.ogg');



                // arthur 4.7-4
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Savoir quoi ?",
                    'audio/dialogue-manor/arthur_voices-4.7-4.ogg');



                // morgane 4.7-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Que les frères que l'on retrouve ne sont pas toujours ceux que l'on a perdus.",
                    'audio/dialogue-manor/morgane_voices-4.7-2.ogg');
                // morgane 4.7-3
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Et que le pardon est parfois une épreuve plus lourde que la guerre.",
                    'audio/dialogue-manor/morgane_voices-4.7-3.ogg');



                // arthur 4.7-5
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Alors qu'Avalon me montre la vérité.",
                    'audio/dialogue-manor/arthur_voices-4.7-5.ogg');
                // arthur 4.7-6
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Même si elle doit me briser une seconde fois.",
                    'audio/dialogue-manor/arthur_voices-4.7-6.ogg');


                    
                // morgane 4.7-4
                await this.dialogueManager.playLine(
                    "Morgane",
                    "C'est pour cela que tu es ici, mon frère.",
                    'audio/dialogue-manor/morgane_voices-4.7-4.ogg');
                // morgane 4.7-5
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Et non pour oublier ta vie.",
                    'audio/dialogue-manor/morgane_voices-4.7-5.ogg');
                // morgane 4.7-6
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Mais pour décider ce qu'elle signifie encore.",
                    'audio/dialogue-manor/morgane_voices-4.7-6.ogg');

                this.dialogueManager.hide();
                this.timeline.play();
            })


            .call(() =>
            {
                this.timeline.pause();
                this.storyManager.showNextIndicator(() =>
                {
                    this.experience.loadingManager.showEndExperience()
                });
            })
    }
    
}
