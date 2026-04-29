
export default class DialogueManager
{

    constructor() 
    {
        this.voicePlayer = new Audio()

        /**
         * DOM
         */
        this.dialogueBox = document.querySelector('.dialogue-box')
        this.dialogueSpeaker = document.querySelector('.dialogue-speaker')
        this.dialogueText = document.querySelector('.dialogue-text')

        // gestion du clic
        this.skipResolver = null
        window.addEventListener('click', () => {
            if (this.skipResolver) this.skipDialogue()
        })
    }


    playLine(speaker, content, audioSrc) 
    {
        return new Promise((resolve) => 
        {
            this.skipResolver = resolve

            // Affichage UI
            this.dialogueSpeaker.textContent = speaker
            this.dialogueText.textContent = content

            // set attribute pour le css 
            this.dialogueBox.setAttribute('data-speaker', speaker.toLowerCase())

            this.dialogueBox.classList.add('is-visible')

            this.voicePlayer.src = audioSrc 
            this.voicePlayer.play()


            this.voicePlayer.onended = () => 
            {
                this.skipResolver = null
                resolve()
            }
        })
    }

    
    skipDialogue() 
    {
        this.voicePlayer.pause()
        const resolve = this.skipResolver
        this.skipResolver = null
        if (resolve) resolve()
    }


    hide() 
    {
        this.dialogueBox.classList.remove('is-visible')
        this.dialogueSpeaker.textContent = ''
        this.dialogueText.textContent = ''
    }
}