// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'

// shaders
import personnagesVertexShader from '../shaders/personnages/vertex.glsl' 
import personnagesFragmentShader from '../shaders/personnages/fragment.glsl'


export default class Personnages
{
    constructor(colorHex = '#ffffff') 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        
        // param
        this.colorHex = colorHex 

        this.setParticle()
    }

    setParticle()
    {
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array([0, 0, 0])
        const scales = new Float32Array([1.0])

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

        this.material = new THREE.ShaderMaterial(
        {
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            transparent: true,
            vertexShader: personnagesVertexShader,
            fragmentShader: personnagesFragmentShader,
            uniforms: 
            {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uSize: { value: 4200.0 },

                uColor: { value: new THREE.Color(this.colorHex) } 
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