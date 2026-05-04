import * as THREE from 'three'
import Experience from '../Experience.js'
import morganneVertexShader from '../shaders/morganne/vertex.glsl'
import morganneFragmentShader from '../shaders/morganne/fragment.glsl'

export default class Morganne
{
    constructor()
    {
        /**
         * Base
         */
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time


        /**
         * Appel des instances
         */
        this.setParticle()
    }

    setParticle()
    {
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array([0, 0, 0])
        const scales = new Float32Array([1.0])

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

        // material
        this.material = new THREE.ShaderMaterial(
        {
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            transparent: true,
            vertexShader: morganneVertexShader,
            fragmentShader: morganneFragmentShader,
            uniforms: 
            {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uSize: { value: 1500.0 },
                uColor: { value: new THREE.Color('#E1C4F4') }
            }
        })

        this.mesh = new THREE.Points(geometry, this.material)
        this.scene.add(this.mesh)
    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.001
    }
}