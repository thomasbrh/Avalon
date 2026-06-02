// import base
import Experience from '../Experience.js'

// import librairies
import * as THREE from 'three'

let instance = null

export default class AudioManager
{
    constructor()
    {
        // singleton
        if(instance) {
            return instance 
        }
        instance = this

        /**
         * Base
         */
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera

        this.audioListener = new THREE.AudioListener()


        /**
         * inisialisations
         */
        this.isMuted = false
        this.voicePlayer = new Audio()
        this.musicVolume = 0.07
        this.forestVolume = 0.08


        /**
         * DOM
         */
        this.audioBtn = document.querySelector('.audio-btn')

        this.audioBtn.addEventListener('click', (event) =>
        {
            event.stopPropagation()
            this.toggleMute()
        })


        /**
         * Appel des instances
         */
        this.setAudio()

    }


    /**
     * Audio
     */
    setAudio()
    {
        this.camera.instance.add(this.audioListener)
        // chargé le son
        this.musicTrack = new THREE.Audio(this.audioListener)
        this.forestTrack = new THREE.Audio(this.audioListener)
    }


    startAmbiantMusic()
    {
        this.buffer = this.resources.items.ambiantMusic
        
        if(this.buffer) 
        {
            this.musicTrack.setBuffer(this.buffer)
            this.musicTrack.setLoop(true)
            this.musicTrack.setVolume(this.musicVolume)
            this.musicTrack.play()
        }
    }

    startAmbiantForest()
    {
        this.buffer = this.resources.items.ambiantForest
        
        // Sécurité pour la forêt également
        if(this.buffer)
        {
            this.forestTrack.setBuffer(this.buffer)
            this.forestTrack.setLoop(true)
            this.forestTrack.setVolume(this.forestVolume)
            this.forestTrack.play()
        }
    }


    /**
     * Gestion du son
     */
    toggleMute()
    {
        this.isMuted = !this.isMuted

        this.musicTrack.setVolume(this.isMuted ? 0 : this.musicVolume)
        this.forestTrack.setVolume(this.isMuted ? 0 : this.forestVolume)
        this.voicePlayer.muted = this.isMuted
        this.audioBtn.classList.toggle('is-muted', this.isMuted)
        this.audioBtn.textContent = this.isMuted ? 'Muet' : 'Son'
    }

}