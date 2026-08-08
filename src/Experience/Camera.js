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
        this.time = this.experience.time
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug
        this.resources = this.experience.resources


        /**
         * inisialisations
         */
        // amplitudes
        this.mouseLookAmplitudeX = 0.20
        this.mouseLookAmplitudeY = 0.10

        this.cursor = { x: 0, y: 0 }
        this.smoothedCursor = { x: 0, y: 0 }

        this.keyboard = {}
        this.movementSpeed = 5

        // radius déplacement
        this.movementRadius = 3.2
        this.movementCenter = new THREE.Vector3()
        this.wasCameraMoving = false

        window.addEventListener('mousemove', (event) => 
        {
            this.cursor.x = - ((event.clientX / this.sizes.width) - 0.5)
            this.cursor.y = - ((event.clientY / this.sizes.height) - 0.5)
        })


        // setup touches caméra
        window.addEventListener('keydown', (event) =>
        {
            const key = event.key.toLowerCase()

            if(key === 'z' || key === 'q' || key === 's' || key === 'd' || key === ' ' || key === 'control')
            {
                event.preventDefault()
                this.keyboard[key] = true
            }
        })

        window.addEventListener('keyup', (event) =>
        {
            this.keyboard[event.key.toLowerCase()] = false
        })

        window.addEventListener('blur', () =>
        {
            this.keyboard = {}
        })

        this.setMobileControls()


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
            this.saveMovementCenter()
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

            // vitesse  caméra
            this.debugFolder
                .add(this, 'movementSpeed')
                .name('keyboard speed')
                .min(0)
                .max(10)
                .step(0.1)

            this.debugFolder
                .add(this, 'movementRadius')
                .name('keyboard radius')
                .min(0)
                .max(5)
                .step(0.1)
        }

    }


    setInstance()
    {

        this.instance = new THREE.PerspectiveCamera(
            // PerspectiveCamera( fov, aspect-ratio, near, far )
            35, // fov
            this.experience.sizes.width / this.experience.sizes.height, // calcul avec la taille du wrapper
            0.1, // traverser les objets
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


    saveMovementCenter()
    {
        this.movementCenter.copy(this.instance.position)
    }


    setMobileControls()
    {
        this.mobileControls = document.querySelectorAll('[data-camera-key]')

        this.mobileControls.forEach((button) =>
        {
            const key = button.dataset.cameraKey === 'space' ? ' ' : button.dataset.cameraKey

            button.addEventListener('pointerdown', (event) =>
            {
                event.preventDefault()
                event.stopPropagation()

                this.keyboard[key] = true
                button.classList.add('is-active')
            })

            button.addEventListener('pointerup', (event) =>
            {
                event.preventDefault()
                event.stopPropagation()

                this.keyboard[key] = false
                button.classList.remove('is-active')
            })

            button.addEventListener('pointerleave', () =>
            {
                this.keyboard[key] = false
                button.classList.remove('is-active')
            })

            button.addEventListener('pointercancel', () =>
            {
                this.keyboard[key] = false
                button.classList.remove('is-active')
            })

            button.addEventListener('click', (event) =>
            {
                event.preventDefault()
                event.stopPropagation()
            })
        })
    }


    // bind keyboard
    updateKeyboardMovement()
    {
        const direction = new THREE.Vector3()
        const forward = new THREE.Vector3()
        const right = new THREE.Vector3()

        this.instance.getWorldDirection(forward)
        forward.y = 0
        forward.normalize()

        right.crossVectors(forward, this.instance.up).normalize()

        if(this.keyboard.z)
            direction.add(forward)

        if(this.keyboard.s)
            direction.sub(forward)

        if(this.keyboard.d)
            direction.add(right)

        if(this.keyboard.q)
            direction.sub(right)

        if(this.keyboard[' '])
            direction.y += 1

        if(this.keyboard.control)
            direction.y -= 1

        if(direction.length() === 0)
            return

        direction.normalize()
        direction.multiplyScalar(this.movementSpeed * this.time.delta * 0.001)
        this.instance.position.add(direction)

        const distanceFromCenter = this.instance.position.clone().sub(this.movementCenter)

        if(distanceFromCenter.length() > this.movementRadius)
        {
            distanceFromCenter.setLength(this.movementRadius)
            this.instance.position.copy(this.movementCenter).add(distanceFromCenter)
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

            const cameraMoving = gsap.isTweening(this.instance.position) || gsap.isTweening(this.cameraTarget)

            // update caméra
            if(!cameraMoving)
            {
                if(this.wasCameraMoving)
                {
                    this.saveMovementCenter()
                    this.wasCameraMoving = false
                }

                this.updateKeyboardMovement()
                this.instance.lookAt(this.cameraTarget)

                // lissage de la souris pour un mouvement fluide
                this.smoothedCursor.x += (this.cursor.x - this.smoothedCursor.x) * 0.05
                this.smoothedCursor.y += (this.cursor.y - this.smoothedCursor.y) * 0.05

                this.instance.rotateY(this.smoothedCursor.x * this.mouseLookAmplitudeX)
                this.instance.rotateX(this.smoothedCursor.y * this.mouseLookAmplitudeY)
            }
            else
            {
                this.wasCameraMoving = true
            }
        }
    }

}
