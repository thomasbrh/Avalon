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
        this.portalTimeline();

    }


    enter() 
    {
        this.timeline.play();
    }


    portalTimeline() 
{
    this.timeline
        .to(this.camera.instance.position, { x: 65, y: 15, z: 52.2, duration: 3.5, ease: 'power2.inOut' })
        .to(this.camera.cameraTarget, { x: 35, y: 50, z: 360, duration: 2.5, ease: 'power2.inOut' }, "-=2")

        
        .call(() => {
            this.storyManager.showNextIndicator();
        })
        .addPause()
        

        .call(() => {
            this.audioManager.startAmbiantForest();
            this.dialogueManager.show("Arthur : Où... où suis-je ? Pourquoi ce lieu ne me dis rien ? Je n'ai aucun souvenir..");
        })
        .to({}, { duration: 4.5 })


        .call(() => {
            this.dialogueManager.show("Arthur : Mais qu'est-ce que je fais ici ? Je suis mort ?");
        })
        .to({}, { duration: 3.5 })


        .call(() => {
            this.dialogueManager.show("Morganne : Bonjour Arthur, comment te sens-tu ?");
        })
        .to({}, { duration: 3 })


        .call(() => {
            this.dialogueManager.show("Arthur : Qui êtes-vous ?");
        })
        .to({}, { duration: 2.5 })


        .call(() => {
            this.dialogueManager.show("Morganne : Je m'appelle Morganne, je suis une amie. Tu es sur les rives d'Avalon. Les brumes semblent avoir brouillé ton esprit, mais n'aie crainte. Viens avec moi, je vais t'aider à retrouver les morceaux de ton histoire.");
        })
        .to({}, { duration: 7 })
        

        .call(() => {
            this.storyManager.showNextIndicator();
        })
        .addPause()


        .call(() => { 
            this.dialogueManager.hide(); 
        })


        .to(this.camera.cameraTarget, { x: -62.5, y: 32.2, z: -360, duration: 2.5, ease: 'power2.inOut' })
        .to(this.camera.instance.position, { x: 46.5, y: 14.5, z: 49, duration: 3, ease: 'power2.inOut' }, "-=1.2")


        .call(() => {
            this.storyManager.showNextIndicator();
        })
        .addPause()


        .to(this.camera.instance.position, { x: 43.2, y: 14.5, z: 1.5, duration: 5, ease: 'power2.inOut' })
        .to(this.camera.cameraTarget, { x: 7.5, y: 25, z: -35.5, duration: 2.5, ease: 'power2.inOut' }, "-=3")


        .call(() => { this.experience.world.animationsClip.playClip(8); })
        .to({}, { duration: 1.5 }) 
        
        .call(() => { this.experience.world.animationsClip.playClip(7); })
        .to({}, { duration: 1.5 }) 
        
        .call(() => { this.experience.world.animationsClip.playClip(6); })
        .to({}, { duration: 2 })


        .call(() => {
            this.dialogueManager.hide();
            this.storyManager.goTo('lake');
        });
}
    

    exit()
    {

    }
    
}