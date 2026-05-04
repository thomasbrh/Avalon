// import base
import Experience from '../Experience.js'
import AudioManager from './AudioManager.js'

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
            this.portalTimeline();
        });

    }


    enter() 
    {
        this.timeline.play();
    }


    portalTimeline() 
    {
        this.targets = this.experience.world.portal.targets;
        this.targetsLake = this.experience.world.lake.targets;

        this.morganne = this.experience.world.morganne.mesh;

        this.timeline
            // camera se déplace vers le portal
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_middlePosition'].x, 
                y: this.targets['TargetPortal_middlePosition'].y, 
                z: this.targets['TargetPortal_middlePosition'].z, 
                duration: 3.5, 
                ease: 'steps.inOut' 
            }, "")
            // camera regarde vers la stone
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_portal'].x, 
                y: this.targets['TargetPortal_portal'].y, 
                z: this.targets['TargetPortal_portal'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, "<-=1.25")
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_stone'].x, 
                y: this.targets['TargetPortal_stone'].y, 
                z: this.targets['TargetPortal_stone'].z, 
                duration: 3, 
                ease: 'steps.inOut' 
            }, ">+=1")
            // morganne move
            .to(this.morganne.position, 
            { 
                x: this.targets['TargetPortal_stone'].x, 
                y: this.targets['TargetPortal_stone'].y, 
                z: this.targets['TargetPortal_stone'].z, 
                duration: 2, 
                ease: 'power2.inOut' 
            }, "<-=1.25")
            

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
                    "Je suis Morgane. Et bien que les rives d’Avalon aient un peu brouillé ton espri, tu es mon frère.",
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

            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_bridgeEnd'].x, 
                y: this.targets['TargetPortal_bridgeEnd'].y, 
                z: this.targets['TargetPortal_bridgeEnd'].z, 
                duration: 3, 
                ease: 'steps.inOut' 
            },">+=2")
            // move
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_bridgeStart'].x, 
                y: this.targets['TargetPortal_bridgeStart'].y, 
                z: this.targets['TargetPortal_bridgeStart'].z, 
                duration: 3.5, 
                ease: 'steps.inOut' 
            }, ">+=1")
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_bridgeMiddle'].x, 
                y: this.targets['TargetPortal_bridgeMiddle'].y, 
                z: this.targets['TargetPortal_bridgeMiddle'].z, 
                duration: 3.5, 
                ease: 'steps.inOut' 
            }, ">")
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_bridgeEnd'].x, 
                y: this.targets['TargetPortal_bridgeEnd'].y, 
                z: this.targets['TargetPortal_bridgeEnd'].z, 
                duration: 3.5, 
                ease: 'steps.inOut' 
            }, ">")
                
            // camera regarde vers l'animation
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_treeAnimation'].x, 
                y: this.targets['TargetPortal_treeAnimation'].y, 
                z: this.targets['TargetPortal_treeAnimation'].z, 
                duration: 4, 
                ease: 'steps.inOut' 
            }, ">=-0.5")

            .call(async () => 
            { 
                /* this.timeline.pause(); */
                await this.dialogueManager.playLine("Morganne", "Je m'appelle Morganne... Viens avec moi.", './assets/sounds/voice_morganne_2.mp3');
            })

            // camera regarde vers le lac
            .to(this.camera.cameraTarget, 
            { 
                x: this.targetsLake['TargetLake_towerUp'].x, 
                y: this.targetsLake['TargetLake_towerUp'].y, 
                z: this.targetsLake['TargetLake_towerUp'].z, 
                duration: 3,
                ease: 'steps.inOut' 
            }, ">")
            // camera se déplace vers le lake
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_lake'].x,
                y: this.targets['TargetPortal_lake'].y,
                z: this.targets['TargetPortal_lake'].z,
                duration: 12,    
                ease: 'steps.inOut' 
            }, ">")


            // choix test
            /* .call(async () => 
            { 
                // 1. On met la timeline en pause pour attendre l'interaction
                this.timeline.pause(); 
                
                // 2. Morganne pose la question
                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Arthur, écoute-moi bien. Te souviens-tu du nom de ton épée ?", 
                    './assets/sounds/morganne_question.mp3'
                );

                // 3. On définit les choix possibles
                const choices = [
                    { text: "Excalibur", isCorrect: true },
                    { text: "Durandal", isCorrect: false },
                    { text: "Une grande frite", isCorrect: false }
                ];

                // 4. On affiche les choix et on gère la réponse
                this.storyManager.showChoices(choices, async (isCorrect) => {
                    if (isCorrect) {
                        // Bonne réponse : Dialogue de succès
                        await this.dialogueManager.playLine(
                            "Morganne", 
                            "C'est exact. Ta mémoire te revient pas à pas. Regarde le pont devant toi.", 
                            './assets/sounds/morganne_success.mp3'
                        );
                        
                        this.dialogueManager.hide();
                        
                        // On relance la timeline qui enchaînera sur l'animation du pont
                        this.timeline.play(); 
                    } else {
                        // Mauvaise réponse : Dialogue d'erreur, l'utilisateur doit re-cliquer
                        await this.dialogueManager.playLine(
                            "Morganne", 
                            "Non Arthur, ce n'est pas ça. Concentre-toi, essaye encore.", 
                            './assets/sounds/morganne_fail.mp3'
                        );
                    }
                });
            })   */

            
            // lance l'animation du pont
            .call(() => { this.experience.world.animationsClip.playClip(2); })
            .to({}, { duration: 5 }, "<")


        .call(() => 
        {
            this.dialogueManager.hide();
            this.storyManager.goTo('lake');
        });
    }


    playLine(index, speaker, text, audioKey) 
    {
        // met à jour l'index actuel
        this.currentDialogueIndex = index;

        this.dialogueManager.show(speaker, text);
        this.audioManager.playVoice(audioKey); 
    }

    // au clic
    skipDialogue() 
    {
        // coupe l'audio
        this.audioManager.stopVoice();
        
        // go to next
        const nextIndex = this.currentDialogueIndex + 1;
        const nextLabel = `dialog_${nextIndex}`;

        // skip la timeline
        if (this.timeline.labels[nextLabel] !== undefined) 
        {
            this.timeline.play(nextLabel);
        } else 
        {
            this.timeline.play("dialog_end");
        }
    }
    

    exit()
    {

    }
    
}