import AudioManager from './AudioManager.js'

export default class DialogueManager
{

    constructor()
    {
        this.voicePlayer = new AudioManager().voicePlayer

        /**
         * DOM
         */
        this.dialogueBox = document.querySelector('.dialogue-box')
        this.dialogueSpeaker = document.querySelector('.dialogue-speaker')
        this.dialogueText = document.querySelector('.dialogue-text')

        // historique des dialogues
        this.history = []
        this.historyIndex = -1
        this.endDialogue = null

        // clic gauche = -1, clic droit = +1
        document.addEventListener('click', (event) =>
        {
            if(!this.endDialogue) return
            if(event.target.closest('.header')) return

            const direction = event.clientX < window.innerWidth / 2 ? -1 : 1
            this.moveLine(direction)
        })
    }


    playLine(speaker, content, audioSrc)
    {
        return new Promise((resolve) =>
        {
            // fonction pour dire que le dialogue est fini
            this.endDialogue = resolve

            // add la ligne dans l'historique
            const line = { speaker, content, audioSrc }
            this.history.push(line)
            this.historyIndex = this.history.length - 1

            this.dialogueBox.classList.add('is-visible')
            document.body.classList.add('dialogue-active')
            this.showLine(line)

            this.voicePlayer.onended = () =>
            {
                // si on écoute une ancienne ligne alors on ne passe pas à la suite
                if(this.historyIndex === this.history.length - 1)
                    this.skipDialogue()
            }
        })
    }


    moveLine(direction)
    {
        if(!this.endDialogue) return

        const nextIndex = this.historyIndex + direction

        if(nextIndex < 0) return

        if(nextIndex >= this.history.length)
        {
            this.skipDialogue()
            return
        }

        this.historyIndex = nextIndex
        this.showLine(this.history[this.historyIndex])
    }


    skipDialogue()
    {
        if(!this.endDialogue) return

        this.voicePlayer.pause()

        const resolve = this.endDialogue
        this.endDialogue = null

        if(resolve) resolve()
    }


    showLine(line)
    {
        if(!line) return

        this.dialogueSpeaker.textContent = line.speaker
        this.dialogueText.textContent = line.content

        // data speaker récupéré pour l'animation speaking
        this.dialogueBox.setAttribute('data-speaker', line.speaker.toLowerCase())

        this.voicePlayer.pause()
        this.voicePlayer.src = line.audioSrc
        this.voicePlayer.currentTime = 0
        this.voicePlayer.play()
    }


    cancelDialogue()
    {
        this.voicePlayer.pause()
        this.voicePlayer.onended = null
        this.endDialogue = null
        this.history = []
        this.historyIndex = -1
        this.hide()
    }


    hide()
    {
        this.dialogueBox.classList.remove('is-visible')

        // reset le speaker quand le dialogue est hide
        this.dialogueBox.removeAttribute('data-speaker')
        document.body.classList.remove('dialogue-active')
        this.dialogueSpeaker.textContent = ''
        this.dialogueText.textContent = ''
    }
}
