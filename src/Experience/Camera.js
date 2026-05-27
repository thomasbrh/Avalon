// import base
import Experience from './Experience.js'

// import librairies
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
        this.resources = this.experience.resources


        /**
         * inisialisations 
         */
        this.enableMouseLook = false
        this.mouseLookAmplitudeX = 0.25
        this.mouseLookAmplitudeY = 0.10
        this.cursor = { x: 0, y: 0 }
        this.smoothedCursor = { x: 0, y: 0 }

        window.addEventListener('mousemove', (event) => 
        {
            this.cursor.x = - ((event.clientX / this.sizes.width) - 0.5)
            this.cursor.y = - ((event.clientY / this.sizes.height) - 0.5)
        })


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('Camera')
        }

        
        /**
         * Appel des instances
         */
        this.setInstance()
        this.setControls()
        
    }


    setupCamera(CameraModel)
    {
        this.model = CameraModel
        
        // Ajoute la cam à la scène
        this.scene.add(this.model)

        // Configure les cibles
        this.targets = {}
        this.model.traverse((child) => 
        {
            if(child.name.includes('FirstCamPosition')) 
            {
                // On sauvegarde sa position en utilisant son nom
                this.targets[child.name] = new THREE.Vector3()
                child.getWorldPosition(this.targets[child.name])
            }
        })
        
        if(this.targets['FirstCamPosition']) 
        {
            this.instance.position.copy(this.targets['FirstCamPosition'])
        }
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
            35, // fov
            this.experience.sizes.width / this.experience.sizes.height, // calcul avec la taille du wrapper
            1, // traverser les objets
            300 // distance de visibilité
        );

        // position 
        this.instance.position.set(0, 0, 0) // x, y, z

        // target
        this.cameraTarget = new THREE.Vector3(0, 0, 0) // x, y, z
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
        if(this.controls.enabled)
        {
            this.controls.update()
        }
        else
        {
            // update la target
            this.instance.lookAt(this.cameraTarget)

            if(this.enableMouseLook)
            {
                // lissage de la souris pour un mouvement fluide
                this.smoothedCursor.x += (this.cursor.x - this.smoothedCursor.x) * 0.05
                this.smoothedCursor.y += (this.cursor.y - this.smoothedCursor.y) * 0.05

                this.instance.rotateY(this.smoothedCursor.x * this.mouseLookAmplitudeX)
                this.instance.rotateX(this.smoothedCursor.y * this.mouseLookAmplitudeY)
            }
        }
    }

}