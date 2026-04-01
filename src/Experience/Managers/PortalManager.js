// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'
import gsap from "gsap"

export default class PortalManager
{

    constructor(storyManager)
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.storyManager = storyManager 
        this.dialogueManager = storyManager.dialogueManager

        
        /**
         * inisialisations 
         */
        this.step = 0

    }
    

    enter()
    {
        // step par default
        if(this.step ===0)
        {
            console.log(0)
            // change de camera
            this.camera.moveCamera(
                new THREE.Vector3(52, 16, 49), 
                new THREE.Vector3(13.5, 15, 8.2),
                2,
                () =>
                {
                    this.experience.world.portal.playSound()
                    this.step = 1
                    this.storyManager.unlock()
                },
            )
        }

        // step 1
        else if(this.step === 1)
        {
            console.log(1)
            this.camera.moveCamera(
                new THREE.Vector3(38, 16, 38), 
                new THREE.Vector3(33, 16.5, 50),
                1.5,
                () =>
                {
                    setTimeout(() => 
                    {
                        this.dialogueManager.show('Ou est-ce que je suis ?')
                    }, "250");
                    
                    this.step = 2
                    this.storyManager.unlock()
                },
            )
        }

        // step 2
        else if(this.step === 2)
        {
            console.log(2)
            this.camera.moveCamera(
                new THREE.Vector3(38, 16, 38), 
                new THREE.Vector3(33, 16.5, 50),
                1,
                () =>
                {
                    setTimeout(() => 
                    {
                        this.dialogueManager.show('Tu es sur Avalon !')
                    }, "250");
                    
                    this.step = 3
                    this.storyManager.unlock()
                }
            )

            
        }
        
        // step 3
        else if(this.step === 3)
        {
            console.log(3)
            // fin => suivant
            this.exit()
        }
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