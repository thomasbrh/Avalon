import AudioManager from './AudioManager.js'

export default class DialogueManager
{

    constructor()
    {
        /**
         * Base
         */
        this.voicePlayer = new AudioManager().voicePlayer

        /**
         * DOM
         */
        this.dialogueBox = document.querySelector('.dialogue-box')
        this.dialogueSpeaker = document.querySelector('.dialogue-speaker')
        this.dialogueText = document.querySelector('.dialogue-text')

        /**
         * Initialisation
         */
        this.history = []
        this.historyIndex = -1
        // fonction qui permet de terminer le dialogue en cours
        this.dialogueResolve = null


        /**
         * Appel des instances
         */
        this.setDialogueNavigation()
    }


    /**
     * Navigation de dialogue
     */
    setDialogueNavigation()
    {
        document.addEventListener('click', (event) =>
        {
            if(!this.dialogueResolve) return
            if(event.target.closest('.header, .journal, .item-viewer, .mobile-controls, button, a')) return

            // ce clic sert seulement à la navigation du dialogue
            event.stopPropagation()

            // -1 revient dans l'historique, 1 continue
            const direction = event.clientX < window.innerWidth / 2 ? -1 : 1
            this.changeDialogueLine(direction)
        })

        document.addEventListener('mousemove', (event) =>
        {
            this.updateCursor(event)
        })
    }


    /**
     * Cursor dialogue
     */
    updateCursor(event)
    {
        if(!this.dialogueResolve) return

        // garde le cursor normal sur les éléments cliquables
        if(event.target.closest('.header, .journal, .item-viewer, .mobile-controls, button, a'))
        {
            document.body.classList.remove('dialogue-previous', 'dialogue-next')
            return
        }

        const previous = event.clientX < window.innerWidth / 2

        document.body.classList.toggle('dialogue-previous', previous)
        document.body.classList.toggle('dialogue-next', !previous)
    }


    playLine(speaker, content, audioSrc)
    {
        return new Promise((resolve) =>
        {
            this.dialogueResolve = resolve

            // add la ligne dans l'historique
            const line = { speaker, content, audioSrc }
            this.history.push(line)
            this.historyIndex = this.history.length - 1

            this.dialogueBox.classList.add('is-visible')
            document.body.classList.add('dialogue-active')
            this.showDialogueLine(line)

            this.voicePlayer.onended = () =>
            {
                // si on écoute une ancienne ligne alors on ne passe pas à la suite
                if(this.historyIndex === this.history.length - 1)
                    this.finishDialogue()
            }
        })
    }


    /**
     * Change le dialogue
     */
    changeDialogueLine(direction)
    {
        const nextIndex = this.historyIndex + direction

        if(nextIndex < 0) return

        if(nextIndex >= this.history.length)
        {
            this.finishDialogue()
            return
        }

        this.historyIndex = nextIndex
        this.showDialogueLine(this.history[this.historyIndex])
    }


    /**
     * Reprend la timeline
     */
    finishDialogue()
    {
        this.voicePlayer.pause()

        const resolve = this.dialogueResolve
        this.dialogueResolve = null

        resolve()
    }


    /**
     * Affiche et lance la ligne
     */
    showDialogueLine(line)
    {
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
        this.dialogueResolve = null
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
        document.body.classList.remove('dialogue-previous', 'dialogue-next')
        this.dialogueSpeaker.textContent = ''
        this.dialogueText.textContent = ''
    }
}
