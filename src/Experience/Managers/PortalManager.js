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
            .to(this.camera.instance.position, { x: 65, y: 15, z: 52.2, duration: 3.5, ease: 'power2.inOut' })
            // camera regarde vers la stone
            .to(this.camera.cameraTarget, 
                { 
                    x: this.targets['TargetPortal_stone'].x, 
                    y: this.targets['TargetPortal_stone'].y, 
                    z: this.targets['TargetPortal_stone'].z, 
                    duration: 3, 
                    ease: 'power2.inOut' 
                }, "<-=1.25")
            

            // dialoguues
            .call(() => 
            {
                this.audioManager.startAmbiantForest();
                this.dialogueManager.show("Arthur : Où... où suis-je ? Pourquoi ce lieu ne me dis rien ? Je n'ai aucun souvenir..");
            })
            .to({}, { duration: 4 })


            .call(() => 
            {
                this.dialogueManager.show("Arthur : Mais qu'est-ce que je fais ici ? Je suis mort ?");
            })
            .to({}, { duration: 3 })


            .call(() => 
            {
                this.dialogueManager.show("Morganne : Bonjour Arthur, comment te sens-tu ?");
            })
            .to({}, { duration: 3 })


            .call(() => 
            {
                this.dialogueManager.show("Arthur : Qui êtes-vous ?");
            })
            .to({}, { duration: 3 })


            .call(() => 
            {
                this.dialogueManager.show("Morganne : Je m'appelle Morganne, je suis une amie. Tu es sur les rives d'Avalon. Les brumes semblent avoir brouillé ton esprit, mais n'aie crainte. Viens avec moi, je vais t'aider à retrouver les morceaux de ton histoire.");
            })
            .to({}, { duration: 6 })


            // pause
            .call(() => 
            { 
                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })
            .addPause()


            // camera regarde vers le bridge
            .to(this.camera.cameraTarget, 
                { 
                    x: this.targets['TargetPortal_bridge'].x, 
                    y: this.targets['TargetPortal_bridge'].y, 
                    z: this.targets['TargetPortal_bridge'].z, 
                    duration: 2.5,
                    ease: 'power2.inOut' 
                }, ">")
            // camera se déplace vers le bridge
            .to(this.camera.instance.position, 
                { 
                    x: this.targets['TargetPortal_bridge'].x, 
                    y: this.targets['TargetPortal_bridge'].y, 
                    z: this.targets['TargetPortal_bridge'].z, 
                    duration: 3.5, 
                    ease: 'power2.inOut' 
                }, ">=+1")

                
            // camera regarde vers l'animation
            .to(this.camera.cameraTarget, 
                { 
                    x: this.targets['TargetPortal_treeAnimation'].x, 
                    y: this.targets['TargetPortal_treeAnimation'].y, 
                    z: this.targets['TargetPortal_treeAnimation'].z, 
                    duration: 4, 
                    ease: 'power2.inOut' 
                }, ">=-0.5")

            // camera regarde vers le lac
            .to(this.camera.cameraTarget, 
                { 
                    x: this.targetsLake['TargetLake_towerUp'].x, 
                    y: this.targetsLake['TargetLake_towerUp'].y, 
                    z: this.targetsLake['TargetLake_towerUp'].z, 
                    duration: 3,
                    ease: 'power2.inOut' 
                }, ">")
            // camera se déplace vers le lake
            .to(this.camera.instance.position, 
                { 
                    x: this.targets['TargetPortal_lake'].x,
                    y: this.targets['TargetPortal_lake'].y,
                    z: this.targets['TargetPortal_lake'].z,
                    duration: 12,    
                    ease: 'power2.inOut' 
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
    

    exit()
    {

    }
    
}