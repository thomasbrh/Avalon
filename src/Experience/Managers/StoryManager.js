// import base
import Experience from '../Experience.js'

// import Manager
import DialogueManager from './DialogueManager.js'
import AudioManager from './AudioManager.js'

// import ZonesManager
import PortalManager from './ZonesManager/PortalManager.js'
import LakeManager from './ZonesManager/LakeManager.js'
import SwordManager from './ZonesManager/SwordManager.js'
import ManorManager from './ZonesManager/ManorManager.js'


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
        this.lakeManager = new LakeManager(this)
        this.swordManager = new SwordManager(this)
        this.manorManager = new ManorManager(this)


        /**
         * Initialisation
         */
        this.locked = false
        this.step = 0
        this.zones = 
        {
            portal: this.portalManager,
            lake: this.lakeManager,
            sword: this.swordManager,
            manor: this.manorManager,
        }
        this.currentScene = this.zones.portal


        /**
         * DOM
         * cible indicator cliquable
         */
        this.indicator = document.querySelector('#next-indicator')
        this.choicesContainer = document.querySelector('#choices-container')


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


    showChoices(choices, onResult) 
    {
        this.choicesContainer.style.display = 'flex'
        this.choicesContainer.innerHTML = ''


        choices.forEach(choice => 
        {
            const button = document.createElement('button')
            button.innerText = choice.text
            button.classList.add('btn', 'btn--large')
            
            // Événement au clic
            button.addEventListener('click', () => 
            {
                if (choice.isCorrect) 
                {
                    this.choicesContainer.style.display = 'none'
                    onResult(true)
                } else 
                {
                    onResult(false)
                }
            })

            // On ajoute le bouton dans le HTML
            this.choicesContainer.appendChild(button)
        })
    }


    goTo(name)
    {
        if (this.currentScene?.exit) 
        {
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