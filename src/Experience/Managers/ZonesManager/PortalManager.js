// import base
import Experience from '../../Experience.js'
import AudioManager from '../AudioManager.js'
import { deferredGroups } from '../../sources.js'

// import librairies
import gsap from "gsap"


export default class PortalManager
{

    constructor(storyManager)
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.world = this.experience.world
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

        this.resources.on('ready', () =>
        {
            /**
             * Data
             */
            this.targets = this.experience.world.portal.targets;
            this.morganne = this.experience.world.morganne.mesh;
            this.arthur = this.experience.world.arthur.mesh;


            /**
             * Etat initial
             */
            this.arthur.position.set(
                this.targets['TargetPortal_arthur1'].x,
                this.targets['TargetPortal_arthur1'].y,
                this.targets['TargetPortal_arthur1'].z
            );

            this.morganne.position.set(
                this.targets['TargetPortal_morganne1'].x,
                this.targets['TargetPortal_morganne1'].y,
                this.targets['TargetPortal_morganne1'].z
            );

            this.camera.cameraTarget.set(
                this.targets['TargetPortal_target1'].x,
                this.targets['TargetPortal_target1'].y,
                this.targets['TargetPortal_target1'].z
            );


            /**
             * Appel des instances
             */
            this.portalTimeline();
        });

    }


    enter()
    {
        this.timeline.play();
    }


    portalTimeline()
    {
        this.timeline
            .call( () =>
                // lance l'audio d'ambiance
                this.audioManager.startAmbiantForest()
            )
            /**
             * Scene 1.1
             */
            // camera se déplace vers scène 1
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetPortal_camera1'].x,
                y: this.targets['TargetPortal_camera1'].y,
                z: this.targets['TargetPortal_camera1'].z,
                duration: 2.2,
                ease: 'power2.inOut'
            })
            // camera regarde vers scène 1
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetPortal_target1'].x,
                y: this.targets['TargetPortal_target1'].y,
                z: this.targets['TargetPortal_target1'].z,
                duration: 2.8,
                ease: 'power2.inOut'
            }, "<-=1")


            .call(async () =>
            {
                this.timeline.pause();

                // arthur 1.1-1
                await this.dialogueManager.playLine(
                    "???",
                    "Où suis-je…? Il fait trop calme…",
                    'audio/dialogue-portal/arthur_voices-1.1-1.ogg');
                // arthur 1.1-2
                await this.dialogueManager.playLine(
                    "???",
                    "Où sont passé les cris et le fracas de l'acier ?",
                    'audio/dialogue-portal/arthur_voices-1.1-2.ogg');
                // arthur 1.1-3
                await this.dialogueManager.playLine(
                    "???",
                    "Pourquoi je sens encore ces vibrations.",
                    'audio/dialogue-portal/arthur_voices-1.1-3.ogg');
                // arthur 1.1-4
                await this.dialogueManager.playLine(
                    "???",
                    "Est-ce que je suis en train de rêver ?",
                    'audio/dialogue-portal/arthur_voices-1.1-4.ogg');



                // morgane 1.1-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Tu es arrivé sur des rives dont les fracas du monde sont fort fort lointains.",
                    'audio/dialogue-portal/morgane_voices-1.1-1.ogg');
                // morgane 1.1-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Avalon t'a recueilli entre deux mondes.",
                    'audio/dialogue-portal/morgane_voices-1.1-2.ogg');
                // morgane 1.1-3
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Je m'appelle Morgane. Les brumes d'Avalon ont brouillé ta mémoire, mais tu es mon frère.",
                    'audio/dialogue-portal/morgane_voices-1.1-3.ogg');



                // arthur 1.1-5
                await this.dialogueManager.playLine(
                    "???",
                    "Ton frère ?",
                    'audio/dialogue-portal/arthur_voices-1.1-5.ogg');
                // arthur 1.1-6
                await this.dialogueManager.playLine(
                    "???",
                    "Je ne reconnais pas ton visage.",
                    'audio/dialogue-portal/arthur_voices-1.1-6.ogg');
                // arthur 1.1-7
                await this.dialogueManager.playLine(
                    "???",
                    "Peux-tu me dire ce que je fais ici ?",
                    'audio/dialogue-portal/arthur_voices-1.1-7.ogg');



                // morgane 1.1-4
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Tu es ici dans le but de guérir de tes blessures.",
                    'audio/dialogue-portal/morgane_voices-1.1-4.ogg');
                // morgane 1.1-5
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Mais je peux t'aider à te rappeler… Souvenir après souvenir.",
                    'audio/dialogue-portal/morgane_voices-1.1-5.ogg');
                // morgane 1.1-6
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Fais-moi confiance, et Avalon te rendra ce que la guerre t'a arraché.",
                    'audio/dialogue-portal/morgane_voices-1.1-6.ogg');

                this.dialogueManager.hide()


                /**
                 * Deferred
                 */
                // attend seulement le lac, deja lance en arriere-plan au Start
                await this.resources.loadGroup('lake', deferredGroups.lake)
                this.experience.world.createLakeZone()
                await this.experience.uploadGroupTextures('lake')
                this.storyManager.showNextIndicator()
            })



            /**
             * Scene 1.2
             */
            .call(() => 
            { 
                // show lake
                this.experience.world.lake.model.visible = true 
            })
            // camera se déplace vers scène 2
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetPortal_camera2'].x,
                y: this.targets['TargetPortal_camera2'].y,
                z: this.targets['TargetPortal_camera2'].z,
                duration: 2.2,
                ease: 'power2.inOut'
            })
            // camera regarde vers scène 2
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetPortal_target2'].x,
                y: this.targets['TargetPortal_target2'].y,
                z: this.targets['TargetPortal_target2'].z,
                duration: 2.5,
                ease: 'power2.inOut'
            }, "<")
            // morganne psoition
            .to(this.morganne.position,
            {
                x: this.targets['TargetPortal_morganne2'].x,
                y: this.targets['TargetPortal_morganne2'].y,
                z: this.targets['TargetPortal_morganne2'].z,
                duration: 2.8,
                ease: 'sine.inOut'
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetPortal_arthur2'].x,
                y: this.targets['TargetPortal_arthur2'].y,
                z: this.targets['TargetPortal_arthur2'].z,
                duration: 3,
                ease: 'sine.inOut'
            }, "<")

            .call(async () =>
            {
                this.timeline.pause();

                // morgane 1.2-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Je ne suis pas la seule à veiller sur toi.",
                    'audio/dialogue-portal/morgane_voices-1.2-1.ogg'
                );



                // arthur 1.2-1
                await this.dialogueManager.playLine(
                    "???",
                    "Il y a quelqu'un d'autre sur cette île ?",
                    'audio/dialogue-portal/arthur_voices-1.2-1.ogg'
                );



                // morgane 1.2-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Oui. Quelqu'un qui se souvient de toi avec une clarté que toi-même tu as perdue.",
                    'audio/dialogue-portal/morgane_voices-1.2-2.ogg'
                );



                // arthur 1.2-2
                await this.dialogueManager.playLine(
                    "???",
                    "Quelqu'un… qui me connaît ?",
                    'audio/dialogue-portal/arthur_voices-1.2-2.ogg'
                );



                // morgane 1.2-3
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Mieux que tu ne te connais toi-même, à présent.",
                    'audio/dialogue-portal/morgane_voices-1.2-3.ogg'
                );

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 1.3
             */
            .call(() => 
            { 
                // dispose shader portal
                this.experience.world.portal.disposeShaderMesh() 
            })


            // camera se déplace vers scène 3
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetPortal_camera3'].x,
                y: this.targets['TargetPortal_camera3'].y,
                z: this.targets['TargetPortal_camera3'].z,
                duration: 3,
                ease: 'power2.inOut'
            })
            // camera regarde vers scène 3
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetPortal_target3'].x,
                y: this.targets['TargetPortal_target3'].y,
                z: this.targets['TargetPortal_target3'].z,
                duration: 3.2,
                ease: 'power2.inOut'
            }, "<")


            // intermédiaire persos scène 2 to 3
            // morganne position
            .to(this.morganne.position,
            {
                x: this.targets['TargetPortal_morganne21'].x,
                y: this.targets['TargetPortal_morganne21'].y,
                z: this.targets['TargetPortal_morganne21'].z,
                duration: 2.8,
                ease: 'sine.inOut'
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetPortal_arthur21'].x,
                y: this.targets['TargetPortal_arthur21'].y,
                z: this.targets['TargetPortal_arthur21'].z,
                duration: 2.8,
                ease: 'sine.inOut'
            }, "<")


            // morganne position finale
            .to(this.morganne.position,
            {
                x: this.targets['TargetPortal_morganne3'].x,
                y: this.targets['TargetPortal_morganne3'].y,
                z: this.targets['TargetPortal_morganne3'].z,
                duration: 3,
                ease: 'sine.inOut'
            }, ">")
            // arthur position finale
            .to(this.arthur.position,
            {
                x: this.targets['TargetPortal_arthur3'].x,
                y: this.targets['TargetPortal_arthur3'].y,
                z: this.targets['TargetPortal_arthur3'].z,
                duration: 3.2,
                ease: 'sine.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // arthur 1.3-1
                await this.dialogueManager.playLine(
                    "???",
                    "Et bien, qui est-elle ?",
                    'audio/dialogue-portal/arthur_voices-1.3-1.ogg'
                );



                // morgane 1.3-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "La Dame du Lac.",
                    'audio/dialogue-portal/morgane_voices-1.3-1.ogg'
                );
                // morgane 1.3-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Elle était là avant les couronnes, avant les serments, avant les batailles… et elle a posé une lame entre tes mains.",
                    'audio/dialogue-portal/morgane_voices-1.3-2.ogg'
                );



                // arthur 1.3-2
                await this.dialogueManager.playLine(
                    "???",
                    "Une lame… ?",
                    'audio/dialogue-portal/arthur_voices-1.3-2.ogg'
                );



                // morgane 1.3-3
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Plus que ça, une promesse, une responsabilité.",
                    'audio/dialogue-portal/morgane_voices-1.3-3.ogg'
                );



                // arthur 1.3-3
                await this.dialogueManager.playLine(
                    "???",
                    "Pourtant, je ne me souviens d'aucune lame.",
                    'audio/dialogue-portal/arthur_voices-1.3-3.ogg'
                );

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 1.4
             */
            .call(() =>
            {
                // dispose portal
                this.experience.world.portal.dispose()
            })
            // camera se déplace vers scène 4
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetPortal_camera4'].x,
                y: this.targets['TargetPortal_camera4'].y,
                z: this.targets['TargetPortal_camera4'].z,
                duration: 2.8,
                ease: 'power2.inOut'
            })
            // camera regarde vers scène 4
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetPortal_target4'].x,
                y: this.targets['TargetPortal_target4'].y,
                z: this.targets['TargetPortal_target4'].z,
                duration: 2.8,
                ease: 'power2.inOut'
            }, "<")


            // intermédiaire persos scène 3 to 4
            // morganne psoition
            .to(this.morganne.position,
            {
                x: this.targets['TargetPortal_morganne31'].x,
                y: this.targets['TargetPortal_morganne31'].y,
                z: this.targets['TargetPortal_morganne31'].z,
                duration: 2.8,
                ease: 'sine.inOut'
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetPortal_arthur31'].x,
                y: this.targets['TargetPortal_arthur31'].y,
                z: this.targets['TargetPortal_arthur31'].z,
                duration: 2.8,
                ease: 'sine.inOut'
            }, "<")


            // morganne position finale
            .to(this.morganne.position,
            {
                x: this.targets['TargetPortal_morganne4'].x,
                y: this.targets['TargetPortal_morganne4'].y,
                z: this.targets['TargetPortal_morganne4'].z,
                duration: 1.2 ,
                ease: 'sine.inOut'
            }, ">")
            // arthur position finale
            .to(this.arthur.position,
            {
                x: this.targets['TargetPortal_arthur4'].x,
                y: this.targets['TargetPortal_arthur4'].y,
                z: this.targets['TargetPortal_arthur4'].z,
                duration: 1.5,
                ease: 'sine.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // morgane 1.4-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Continue d'avancer.",
                    'audio/dialogue-portal/morgane_voices-1.4-1.ogg'
                );
                // morgane 1.4-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Les souvenirs ne reviennent jamais à ceux qui restent immobiles.",
                    'audio/dialogue-portal/morgane_voices-1.4-2.ogg'
                );

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 1.5
             */
            // camera regarde vers scène 5
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetPortal_target5'].x,
                y: this.targets['TargetPortal_target5'].y,
                z: this.targets['TargetPortal_target5'].z,
                duration: 1.5,
                ease: 'power2.inOut'
            }, "<")
            // camera se déplace vers scène 5
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetPortal_camera5'].x,
                y: this.targets['TargetPortal_camera5'].y,
                z: this.targets['TargetPortal_camera5'].z,
                duration: 2,
                ease: 'power2.inOut'
            })
            // morganne psoition
            .to(this.morganne.position,
            {
                x: this.targets['TargetPortal_morganne5'].x,
                y: this.targets['TargetPortal_morganne5'].y,
                z: this.targets['TargetPortal_morganne5'].z,
                duration: 2.3,
                ease: 'sine.inOut'
            }, "<")
            // arthur position
            .to(this.arthur.position,
            {
                x: this.targets['TargetPortal_arthur5'].x,
                y: this.targets['TargetPortal_arthur5'].y,
                z: this.targets['TargetPortal_arthur5'].z,
                duration: 2.6,
                ease: 'sine.inOut'
            }, "<")



            /**
             * Questions
             */
            .call(async () => 
            { 
                this.timeline.pause()

                await this.resources.loadGroup('animations', deferredGroups.animations)
                this.experience.world.createAnimationsZone()
                await this.experience.uploadGroupTextures('animations')

                // show animations
                this.experience.world.animationsClip.model.visible = true 
                this.timeline.play()
            })


            .call(async () =>
            {
                this.timeline.pause();
                /**
                 * Question Portal
                 */
                // morgane 1.5-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Avant d'aller plus loin, cherche en toi.",
                    'audio/dialogue-portal/morgane_voices-1.5-1.ogg'
                );
                // morgane 1.5-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Cherche au plus profond de ton esprit.",
                    'audio/dialogue-portal/morgane_voices-1.5-2.ogg'
                );
                // morgane 1.5-3
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Un nom t'appartient.",
                    'audio/dialogue-portal/morgane_voices-1.5-3.ogg'
                );
                // morgane 1.5-4
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Il a été crié par des rois, des chevaliers… et des mourants.",
                    'audio/dialogue-portal/morgane_voices-1.5-4.ogg'
                );
                // morgane 1.5-5
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Dis-moi lequel.",
                    'audio/dialogue-portal/morgane_voices-1.5-5.ogg'
                );
                /**
                 * Choix portal
                 */
                const choices = [
                    { text: "Arthur", isCorrect: true },
                    { text: "Lancelot", isCorrect: false },
                ];

                // afffiche les choix
                this.storyManager.showChoices(choices, async (isCorrect) =>
                {
                    if (isCorrect)
                    {
                        // morgane 1.5-success-1
                        await this.dialogueManager.playLine(
                            "Morgane",
                            "Tu viens d'ouvrir une porte vers tes souvenirs. Allons-y.",
                            'audio/dialogue-portal/morgane_voices-1.5-success-1.ogg'
                        );
                        this.dialogueManager.hide();

                        this.timeline.play();

                    }
                    else
                    {
                        // morgane 1.5-fail-1
                        await this.dialogueManager.playLine(
                            "Morgane",
                            "Non, ce nom est celui d'un de tes amis.",
                            'audio/dialogue-portal/morgane_voices-1.5-fail-1.ogg'
                        );
                        // morgane 1.5-fail-2
                        await this.dialogueManager.playLine(
                            "Morgane",
                            "Cherche plus profondément. Ton nom est plus ancien que cette douleur.",
                            'audio/dialogue-portal/morgane_voices-1.5-fail-2.ogg'
                        );
                    }
                });
            })

            // lance l'animation du pont
            .call(() => { this.experience.world.animationsClip.playClip(2); }, null, "+=0.1")
            .to({}, { duration: 4.7 })



            /**
             * Scène 1.6
             * Scène 1.7
             */
            // camera point de vue 6 
            // camera position finale 7
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetPortal_camera6'].x,
                y: this.targets['TargetPortal_camera6'].y,
                z: this.targets['TargetPortal_camera6'].z,
                duration: 2,
                ease: 'power2.inOut'
            })
            // camera regarde vers scène 6
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetPortal_target6'].x,
                y: this.targets['TargetPortal_target6'].y,
                z: this.targets['TargetPortal_target6'].z,
                duration: 2.5,
                ease: 'power2.inOut'
            }, "<")
            // morganne psoition 6
            .to(this.morganne.position,
            {
                x: this.targets['TargetPortal_morganne6'].x,
                y: this.targets['TargetPortal_morganne6'].y,
                z: this.targets['TargetPortal_morganne6'].z,
                duration: 3,
                ease: 'sine.inOut'
            }, "<")
            // arthur position 6
            .to(this.arthur.position,
            {
                x: this.targets['TargetPortal_arthur6'].x,
                y: this.targets['TargetPortal_arthur6'].y,
                z: this.targets['TargetPortal_arthur6'].z,
                duration: 3.2,
                ease: 'sine.inOut'
            }, "<")


            // camera position finale 7
            .to(this.camera.instance.position,
            {
                x: this.targets['TargetPortal_camera7'].x,
                y: this.targets['TargetPortal_camera7'].y,
                z: this.targets['TargetPortal_camera7'].z,
                duration: 3,
                ease: 'power2.inOut'
            }, ">")
            // camera regarde vers scène 7
            .to(this.camera.cameraTarget,
            {
                x: this.targets['TargetPortal_target7'].x,
                y: this.targets['TargetPortal_target7'].y,
                z: this.targets['TargetPortal_target7'].z,
                duration: 3,
                ease: 'power2.inOut'
            }, "<")
            // morganne position finale 7
            .to(this.morganne.position,
            {
                x: this.targets['TargetPortal_morganne7'].x,
                y: this.targets['TargetPortal_morganne7'].y,
                z: this.targets['TargetPortal_morganne7'].z,
                duration: 3,
                ease: 'sine.inOut'
            }, "<")
            // arthur position finale 7
            .to(this.arthur.position,
            {
                x: this.targets['TargetPortal_arthur7'].x,
                y: this.targets['TargetPortal_arthur7'].y,
                z: this.targets['TargetPortal_arthur7'].z,
                duration: 3.5,
                ease: 'sine.inOut'
            }, "<")


            .call(async () =>
            {
                this.timeline.pause();

                // morgane 1.7-1
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Elle est là.",
                    'audio/dialogue-portal/morgane_voices-1.7-1.ogg'
                );
                // morgane 1.7-2
                await this.dialogueManager.playLine(
                    "Morgane",
                    "Ne parle pas, écoute.",
                    'audio/dialogue-portal/morgane_voices-1.7-2.ogg'
                );

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })


        .call(() =>
        {
            this.dialogueManager.hide();
            this.storyManager.goTo('lake');
        });
    }

}
