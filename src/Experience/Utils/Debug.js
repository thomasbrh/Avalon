// import base
import Experience from '../Experience.js'

// import librairies
import GUI from 'lil-gui'
import { Spector } from 'spectorjs'


export default class Debug
{

    constructor()
    {
        /**
         * Setup
         */
        this.experience = new Experience()
        this.camera = this.experience.camera

        // besoin du hash pour activer
        this.active = window.location.hash.includes('debug')

        // sécurité
        if(!this.active) return


        /**
         * Debug
         */
        if(this.active)
        {

            // les objets a debug
            this.debugObject = 
            {
                orbitControls: false,
                gizmo: false,

                portalColorStart: '#fff',
                portalColorEnd: '#fff'
            }
            
            // lil-gui
            this.gui = new GUI(
            { 
                name: 'debug',
                width: 400
            })

            // spector.js
            this.spector = new Spector()
            this.spector.displayUI()

        }

    }

}