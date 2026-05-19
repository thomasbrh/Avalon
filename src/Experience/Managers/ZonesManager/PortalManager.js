// import base
import Experience from '../../Experience.js'
import AudioManager from '../AudioManager.js'

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
        this.animationsClip = this.experience.world.animationsClip

        
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
                this.targets['TargetPortal_arthur1'].x, 
                this.targets['TargetPortal_arthur1'].y, 
                this.targets['TargetPortal_arthur1'].z
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

            /**
             * Scene 1.1
             */
            // camera se déplace vers scène 1
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_camera1'].x, 
                y: this.targets['TargetPortal_camera1'].y, 
                z: this.targets['TargetPortal_camera1'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 1
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_arthur1'].x, 
                y: this.targets['TargetPortal_arthur1'].y, 
                z: this.targets['TargetPortal_arthur1'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<-=1")
            
            
            .call(async () => 
            { 
                this.camera.enableMouseLook = true;
                this.audioManager.startAmbiantForest();
                
                this.timeline.pause();

                // dialogues
                // arthur 1
                await this.dialogueManager.playLine(
                    "???", 
                    "Ce silence…",
                    'audio/dialogue-portal/arthur_voices-1.1.mp3',);
                await this.dialogueManager.playLine(
                    "???", 
                    "Où sont les cris et le fracas de l'acier ?",
                    'audio/dialogue-portal/arthur_voices-1.2.mp3');
                await this.dialogueManager.playLine(
                    "???", 
                    "Pourquoi ses sons résonnent-ils dans ma tête ?",
                    'audio/dialogue-portal/arthur_voices-1.3.mp3');
                await this.dialogueManager.playLine(
                    "???", 
                    "J’ai l’impression de me réveiller d’un très long rêve.",
                    'audio/dialogue-portal/arthur_voices-1.4.mp3');

                // morganne 1
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "L'orage est terminé.",
                    'audio/dialogue-portal/morganne_voices-1.1.mp3');
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Tu es arrivé sur des rives dont les fracas du monde sont fort fort loingtain.",
                    'audio/dialogue-portal/morganne_voices-1.2.mp3');
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Tu peux enfin souffler un peu.",
                    'audio/dialogue-portal/morganne_voices-1.3.mp3');
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Je suis Morgane. Et bien que les brumes d’Avalon aient un peu brouillé ton espri, tu es mon frère.",
                    'audio/dialogue-portal/morganne_voices-1.4.mp3');


                // arthur 2
                await this.dialogueManager.playLine(
                    "???", 
                    "Ton frère ?", 
                    'audio/dialogue-portal/arthur_voices-2.1.mp3');
                await this.dialogueManager.playLine(
                    "???", 
                    "Je n'ai aucun souvenir de ce visage.", 
                    'audio/dialogue-portal/arthur_voices-2.2.mp3');
                await this.dialogueManager.playLine(
                    "???", 
                    "Je n'ai aucun souvenir de mon propre nom. C'est comme si je n’avais aucun passé, recraché par cette brume.", 
                    'audio/dialogue-portal/arthur_voices-2.3.mp3');
                await this.dialogueManager.playLine(
                    "???", 
                    "Dis-moi qu'est-ce que cet endroit ?", 
                    'audio/dialogue-portal/arthur_voices-2.4.mp3');


                // morganne 2 
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Tu es sur l'île d'Avalon, le sanctuaire du repos et des pommiers éternels.", 
                    'audio/dialogue-portal/morganne_voices-2.1.mp3');
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Tu t'appelles Arthur et ton histoire n'est pas achevée.", 
                    'audio/dialogue-portal/morganne_voices-2.2.mp3');
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Tu es tombé, certes. De si haut que le choc a chassé ton esprit de ton corps.", 
                    'audio/dialogue-portal/morganne_voices-2.3.mp3');
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Mais soit tranquille, je vais t’aider à te rappeler la personne que tu es pas à pas.", 
                    'audio/dialogue-portal/morganne_voices-2.4.mp3');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })



            /**
             * Scene 1.2
             */
            // camera se déplace vers scène 2
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_camera2'].x, 
                y: this.targets['TargetPortal_camera2'].y, 
                z: this.targets['TargetPortal_camera2'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 2
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_arthur2'].x, 
                y: this.targets['TargetPortal_arthur2'].y, 
                z: this.targets['TargetPortal_arthur2'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetPortal_morganne2'].x, 
                y: this.targets['TargetPortal_morganne2'].y, 
                z: this.targets['TargetPortal_morganne2'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetPortal_arthur2'].x, 
                y: this.targets['TargetPortal_arthur2'].y, 
                z: this.targets['TargetPortal_arthur2'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scene 1.3
             */
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
                x: this.targets['TargetPortal_arthur3'].x, 
                y: this.targets['TargetPortal_arthur3'].y, 
                z: this.targets['TargetPortal_arthur3'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetPortal_morganne3'].x, 
                y: this.targets['TargetPortal_morganne3'].y, 
                z: this.targets['TargetPortal_morganne3'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetPortal_arthur3'].x, 
                y: this.targets['TargetPortal_arthur3'].y, 
                z: this.targets['TargetPortal_arthur3'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            },"<")



            /**
             * Scene 1.4
             */
            // camera se déplace vers scène 4
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_camera4'].x, 
                y: this.targets['TargetPortal_camera4'].y, 
                z: this.targets['TargetPortal_camera4'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 4
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_arthur4'].x, 
                y: this.targets['TargetPortal_arthur4'].y, 
                z: this.targets['TargetPortal_arthur4'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetPortal_morganne4'].x, 
                y: this.targets['TargetPortal_morganne4'].y, 
                z: this.targets['TargetPortal_morganne4'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetPortal_arthur4'].x, 
                y: this.targets['TargetPortal_arthur4'].y, 
                z: this.targets['TargetPortal_arthur4'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scene 1.5
             */
            // camera se déplace vers scène 5
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_camera5'].x, 
                y: this.targets['TargetPortal_camera5'].y, 
                z: this.targets['TargetPortal_camera5'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 5
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_arthur5'].x, 
                y: this.targets['TargetPortal_arthur5'].y, 
                z: this.targets['TargetPortal_arthur5'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetPortal_morganne5'].x, 
                y: this.targets['TargetPortal_morganne5'].y, 
                z: this.targets['TargetPortal_morganne5'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetPortal_arthur5'].x, 
                y: this.targets['TargetPortal_arthur5'].y, 
                z: this.targets['TargetPortal_arthur5'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")

            // Question
            .call(async () => 
            { 
                this.timeline.pause(); 
                
                // question
                this.dialogueManager.playLine(
                    "Morganne", 
                    "Arthur, Te souviens-tu du nom de ton épée ?", 
                    './assets/sounds/morganne_question.mp3'
                );

                // choix
                const choices = [
                    { text: "Excalibur", isCorrect: true },
                    { text: "Durandal", isCorrect: false },
                ];

                // afffiche les choix 
                this.storyManager.showChoices(choices, async (isCorrect) => 
                {
                    if (isCorrect) 
                    {
                        this.dialogueManager.playLine(
                            "Morganne", 
                            "C'est exact. Ta mémoire te revient pas à pas. Regarde le chemin qui se dessine devant toi.", 
                            '/audio/morganne_success.mp3'
                        );
                        this.dialogueManager.hide();

                        this.timeline.play();

                    } 
                    else 
                    {
                        this.dialogueManager.playLine(
                            "Morganne", 
                            "Non Arthur, ce n'est pas ça, essaye encore.", 
                            '/audio/morganne_fail.mp3'
                        );
                    }
                });
            })
            
            // lance l'animation du pont
            .call(() => { this.experience.world.animationsClip.playClip(2); }, null, "+=0.1")
            .to({}, { duration: 5 })



            /**
             * Scène 1.6
             */
            // camera se déplace vers scène 6
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_camera6'].x, 
                y: this.targets['TargetPortal_camera6'].y, 
                z: this.targets['TargetPortal_camera6'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 6
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_arthur6'].x, 
                y: this.targets['TargetPortal_arthur6'].y, 
                z: this.targets['TargetPortal_arthur6'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetPortal_morganne6'].x, 
                y: this.targets['TargetPortal_morganne6'].y, 
                z: this.targets['TargetPortal_morganne6'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetPortal_arthur6'].x, 
                y: this.targets['TargetPortal_arthur6'].y, 
                z: this.targets['TargetPortal_arthur6'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")



            /**
             * Scène 1.7
             */
            // camera se déplace vers scène 7
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_camera7'].x, 
                y: this.targets['TargetPortal_camera7'].y, 
                z: this.targets['TargetPortal_camera7'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            })
            // camera regarde vers scène 7
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_arthur7'].x, 
                y: this.targets['TargetPortal_arthur7'].y, 
                z: this.targets['TargetPortal_arthur7'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<")
            // morganne psoition
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetPortal_morganne7'].x, 
                y: this.targets['TargetPortal_morganne7'].y, 
                z: this.targets['TargetPortal_morganne7'].z, 
                duration: 3, 
                ease: 'power2.inOut' 
            }, "<")
            // arthur position
            .to(this.arthur.position, 
            { 
                x: this.targets['TargetPortal_arthur7'].x, 
                y: this.targets['TargetPortal_arthur7'].y, 
                z: this.targets['TargetPortal_arthur7'].z, 
                duration: 3.5, 
                ease: 'power2.inOut' 
            }, "<")


        .call(() => 
        {
            this.dialogueManager.hide();
            this.storyManager.goTo('lake');
        });
    }
    
}