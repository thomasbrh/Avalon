import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience.js'

// import librairies
import gsap from "gsap"


export default class Camera
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug


        /**
         * inisialisations 
         */
        this.enableMouseLook = false
        this.mouseLookAmplitude = 2
        this.cursor = { x: 0, y: 0 }
        this.currentParallax = new THREE.Vector2(0, 0)

        window.addEventListener('mousemove', (event) => {
            this.cursor.x = - ((event.clientX / this.sizes.width) - 0.5)
            this.cursor.y = - ((event.clientY / this.sizes.height) - 0.5)
        })
        

        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('camera')
            this.debugFolder.add(this, 'enableMouseLook').name('Mouse Look')
            this.debugFolder.add(this, 'mouseLookAmplitude').min(0).max(50).step(0.1).name('Look Amplitude')
        }

        
        /**
         * Appel des instances
         */
        this.setInstance()
        this.setControls()
        
    }


    setControls()
    {

        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enabled = false


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.controls, 'enabled')
                .name('Orbit controls')
        }

    }


    setInstance()
    {

        this.instance = new THREE.PerspectiveCamera(
            // PerspectiveCamera( fov, aspect-ratio, near, far )
            90, // fov
            this.experience.sizes.width / this.experience.sizes.height, // calcul avec la taille du wrapper
            0.001, // traverser les objets
            175 // distance de visibilité
        );

        // position 
        this.instance.position.set(75, 21.5, 92) // x, y, z

        // target
        this.cameraTarget = new THREE.Vector3(-2, 12, -25.5) // x, y, z
        this.instance.lookAt(this.cameraTarget) // un vec3 est nécessaire pour tweak

        // ajoute la camera à la scène
        this.scene.add(this.instance)


        // Debug
        if(this.debug.active)
        {
       
            // camera position
            this.debugFolder
                .add(this.instance.position, 'x')
                .name('cameraX')
                .min(- 200)
                .max(200)
                .step(0.1)
            
            this.debugFolder
                .add(this.instance.position, 'y')
                .name('cameraY')
                .min(- 200)
                .max(200)
                .step(0.1)
            
            this.debugFolder
                .add(this.instance.position, 'z')
                .name('cameraZ')
                .min(- 200)
                .max(200)
                .step(0.1)


            // camera lookAt
            this.debugFolder
                .add(this.cameraTarget, 'x')
                .name('targetX')
                .min(-360)
                .max(360)
                .step(0.1)

            this.debugFolder
                .add(this.cameraTarget, 'y')
                .name('targetY')
                .min(-360)
                .max(360)
                .step(0.1)

            this.debugFolder
                .add(this.cameraTarget, 'z')
                .name('targetZ')
                .min(-360)
                .max(360)
                .step(0.1)

        }

    }

    
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {

        // maj de la position et du lookAt()
        if(this.controls.enabled)
        {
            this.controls.update()
        }
        else
        {
            // On vérifie si GSAP anime la position OU la cible de la caméra
            const isAnimating = gsap.isTweening(this.instance.position) || gsap.isTweening(this.cameraTarget)

            // On ne calcule le décalage que si la caméra n'est pas en mouvement
            const targetX = (this.enableMouseLook && !isAnimating) ? this.cursor.x * this.mouseLookAmplitude : 0
            const targetY = (this.enableMouseLook && !isAnimating) ? this.cursor.y * this.mouseLookAmplitude : 0

            // Interpolation pour la fluidité
            this.currentParallax.x += (targetX - this.currentParallax.x) * 0.05
            this.currentParallax.y += (targetY - this.currentParallax.y) * 0.05

            // Application sur la cible finale
            const finalTarget = this.cameraTarget.clone()
            finalTarget.x += this.currentParallax.x
            finalTarget.y += this.currentParallax.y

            this.instance.lookAt(finalTarget)
        }

    }

}