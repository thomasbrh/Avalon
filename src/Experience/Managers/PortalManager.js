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

        this.timeline
            // camera se déplace vers le portal
            .to(this.camera.instance.position, 
            { 
                x: 65, 
                y: 15, 
                z: 52.2, 
                duration: 3.5, 
                ease: 'steps.inOut' 
            })
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

            /* .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_behind'].x, 
                y: this.targets['TargetPortal_behind'].y, 
                z: this.targets['TargetPortal_behind'].z, 
                duration: 3, 
                ease: 'steps.inOut' 
            },">+=3") */
            

            .call(async () => 
            { 
                this.camera.enableMouseLook = true;
                this.audioManager.startAmbiantForest();
                

                this.timeline.pause();

                await this.dialogueManager.playLine(
                    "Arthur", 
                    "Ce silence… Où sont les cris et le fracas de l'acier ? Pourquoi ses sons résonnent-ils dans ma tête ? J’ai l’impression de me réveiller d’un très long rêve. ",
                    'audio/dialogue-portal/arthur_voices-1.mp3');

                await this.dialogueManager.playLine(
                    "Morganne", 
                    "L'orage est terminé. Tu es arrivé sur des rives dont les fracas du monde sont fort fort loingtain. Tu peux souffler. Je suis Morgane. Et bien que les rives d’Avalon aient un peu brouillé ton espri, tu es mon frère.",
                    'audio/dialogue-portal/morganne_voices-1.mp3');

                await this.dialogueManager.playLine(
                    "Arthur", 
                    "Ton frère ? Je n'ai aucun souvenir de ce visage. Je n'ai aucun souvenir de mon propre nom. C'est comme si je n’avais aucun passé, recraché par cette brume. Dis-moi qu'est-ce que cet endroit ?", 
                    'audio/dialogue-portal/arthur_voices-2.mp3');

                await this.dialogueManager.playLine(
                    "Morganne", 
                    "Tu es sur l'île d'Avalon, le sanctuaire du repos et des pommiers éternels. Ton histoire n'est pas achevée. Tu es tombé, certes. De si haut que le choc a chassé ton esprit de ton corps. Mais soit tranquille, je vais t’aider à te rappeler la personne que tu es pas à pas.", 
                    'audio/dialogue-portal/morganne_voices-2.mp3');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })


            // camera regarde vers le bridge
            .to(this.camera.cameraTarget, 
            { 
                x: this.targets['TargetPortal_bridge'].x, 
                y: this.targets['TargetPortal_bridge'].y, 
                z: this.targets['TargetPortal_bridge'].z, 
                duration: 2,
                ease: 'steps.inOut' 
            }, ">")
            // camera se déplace vers le bridge
            .to(this.camera.instance.position, 
            { 
                x: this.targets['TargetPortal_bridge'].x, 
                y: this.targets['TargetPortal_bridge'].y, 
                z: this.targets['TargetPortal_bridge'].z, 
                duration: 5, 
                ease: 'steps.inOut' 
            }, ">=+0.5")

                
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
                await this.dialogueManager.playLine("Morganne", "suce ma kekette j'ai une grand bite", './assets/sounds/voice_morganne_2.mp3');
                await this.dialogueManager.playLine("Morganne", "six Mac Nuggets et une grande frite", './assets/sounds/voice_morganne_2.mp3');
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