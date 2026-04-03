import Experience from '../Experience.js'
import PortalManager from './PortalManager.js'
import DialogueManager from './DialogueManager.js'

export default class StoryManager
{
    constructor()
    {
        /**
         * Base
         */
        this.experience = new Experience()
        this.dialogueManager = new DialogueManager()
        this.portalManager = new PortalManager(this)


        /**
         * Initialisation
         */
        this.locked = false
        this.step = 0
        this.zones = {
            portal: this.portalManager,
        }
        this.currentScene = this.zones.portal 


        /**
         * DOM
         * cible indicator cliquable
         */
        this.indicator = document.querySelector('#next-indicator')


        /**
         * Appel des instances
         */
        this.initInteraction()
    }

    initInteraction() 
    {
        this.indicator.addEventListener('click', () => {
            // remet le none
            this.indicator.style.display = 'none'
            
            // relance la timeline
            if (this.currentScene && this.currentScene.timeline) 
            {
                this.currentScene.timeline.play()
            }
        })
    }

    showNextIndicator() 
    {
        // overwrite le none
        this.indicator.style.display = 'block'
    }


    goTo(name)
    {
        if (this.currentScene?.exit) {
            this.currentScene.exit()
        }
        this.currentScene = this.zones[name]
        this.currentScene?.enter()
    }

    lock()
    { 
        this.locked = true 
    }


    unlock(){ 
        this.locked = false 
    }


    update(){

    }
}