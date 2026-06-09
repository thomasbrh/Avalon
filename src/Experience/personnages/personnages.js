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
        const nbParticules = 240

        const positions = new Float32Array(nbParticules * 3)
        const scales = new Float32Array(nbParticules)
        const randomness = new Float32Array(nbParticules * 3)
        const kinds = new Float32Array(nbParticules)

        // orbe initiale
        positions[0] = 0
        positions[1] = 0
        positions[2] = 0
        scales[0] = 1.0
        randomness[0] = 0.0
        randomness[1] = 0.0
        randomness[2] = 0.0
        kinds[0] = 0.0

        // brume de carres autour de l'orbe
        for(let i = 1; i < nbParticules; i++)
        {
            const i3 = i * 3
            const angle = Math.random() * Math.PI * 2
            const radius = 0.16 + Math.random() * 0.72
            const height = (Math.random() - 0.5) * 0.58

            positions[i3 + 0] = Math.cos(angle) * radius
            positions[i3 + 1] = height
            positions[i3 + 2] = Math.sin(angle) * radius * 0.45

            scales[i] = 0.05 + Math.random() * 0.09
            randomness[i3 + 0] = Math.random()
            randomness[i3 + 1] = Math.random()
            randomness[i3 + 2] = Math.random()
            kinds[i] = 1.0
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
        geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
        geometry.setAttribute('aKind', new THREE.BufferAttribute(kinds, 1))

        this.material = new THREE.ShaderMaterial(
        {
            depthWrite: false,
            depthTest: false,
            blending: THREE.NormalBlending,
            transparent: true,
            vertexShader: personnagesVertexShader,
            fragmentShader: personnagesFragmentShader,
            uniforms: 
            {
                uTime: { value: 0 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uSize: { value: 2300.0 },
                uMistSize: { value: 430.0 },

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
