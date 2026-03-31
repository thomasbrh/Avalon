// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'
import gsap from "gsap"

export default class PortalManager
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.storyManager = this.experience.storyManager

    }
    

    enter()
    {

        // change de camera
        this.camera.moveCamera(
            new THREE.Vector3(75, 45, 75), 
            new THREE.Vector3(0, 25, 0),
            1,
            () =>
            {
                // logique pour cette cam
            }
        )

        // fin => suivant
        this.exit()

    }


    exit()
    {
        /* goTo(lake) */
    }


    update()
    {

        // vérifier conditions de progression

    }
    
}