// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'
import gsap from 'gsap'


export default class Environment
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        

        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('environment')
        }


        /**
         * Appel des instances
         */
        this.setSunLight()
        this.setEnvironmentMap()

    }

    
    setSunLight()
    {
        // crée la light
        this.sunLight = new THREE.AmbientLight('#ffffff', 2)     
        // ajout de la light à la scène
        this.scene.add(this.sunLight)


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(100)
                .step(0.001) 
        }

    }


    setEnvironmentMap()
    {

        this.environmentMap = {}
        this.environmentMap.intensity = 0.12 
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace
        
        this.scene.background = this.environmentMap.texture
        this.scene.environment = this.environmentMap.texture

        this.scene.environmentRotation.y = 0
        this.scene.backgroundRotation.y = 0

        this.environmentMap.rotation = { y: 0 }

        this.environmentMap.updateMaterials = () =>
        {

            this.scene.traverse((child) =>
            {

                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.envMapRotation.y = this.environmentMap.rotation.y
                    child.material.needsUpdate = true
                }

            })

        }
        this.environmentMap.updateMaterials()
        this.playHDRIRotation()


        /**
         * Debug
         */
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }

    }


    updateHDRIRotation()
    {
        this.scene.backgroundRotation.y = this.environmentMap.rotation.y
        this.scene.environmentRotation.y = this.environmentMap.rotation.y

        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                child.material.envMapRotation.y = this.environmentMap.rotation.y
            }
        })
    }


    playHDRIRotation()
    {
        gsap.to(this.environmentMap.rotation,
        {
            y: Math.PI * 2,
            duration: 720,
            ease: 'none',
            repeat: -1,
            onUpdate: () =>
            {
                this.updateHDRIRotation()
            }
        })
    }
    
}
