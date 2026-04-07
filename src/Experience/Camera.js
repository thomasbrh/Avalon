import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from './Experience.js'


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
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('camera')
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
            this.instance.lookAt(this.cameraTarget)
        }

    }

}