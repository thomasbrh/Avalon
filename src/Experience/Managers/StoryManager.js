// import base
import Experience from '../Experience.js'
import PortalManager from "./PortalManager.js"


export default class StoryManager
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.portalManager = new PortalManager()

        // initialisation des valeurs
        this.locked = true
        this.step = 0
        // initialisé les zones pour le GoTo
        this.zones = {
            portal: this.portalManager,
            /* lake: this.portalManager, */
        }

        // commence par le portal par defaut
        this.currentScene = this.zones.portal 


        /**
         * Appel des instances
         */
        this.NextStepEvent()

    }


    // instance pour passer à la prochaine step
    NextStepEvent() 
    {

        window.addEventListener('keydown', (event) =>
        {
            // sécutité de forcer le lowercase
            if (event.key.toLowerCase() !== 'e') 
                return
                // passe au enter de la scène suivante
                this.currentScene?.enter()   
        })

    }


    // instance pour changer de scène
    goTo(name)
    {

        // sécurité
        if (this.currentScene?.exit)
        {
            this.currentScene.exit()
        }

        // changer le current scène par le name
        this.currentScene = this.zones[name]
        // cherche une instance enter() dans currentScene
        this.currentScene?.enter()

    }


    goToPortal()
    {

        this.step = 1

    }


    goToLake()
    {

        this.step = 2

    }


    goToSword()
    {

        this.step = 3

    }


    // lock les controls
    lock()
    {
        this.locked = true
    }


    // unlock les controls
    unlock()
    {
        this.locked = false
    }

    update()
    {

        // vérifier conditions de progression

    }
    
}