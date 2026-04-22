
export default class DialogueManager
{

    constructor() 
    {
        /**
         * DOM
         */
        this.dialogueBox = document.querySelector('.dialogue-box')
        this.dialogueSpeaker = document.querySelector('.dialogue-speaker')
        this.dialogueText = document.querySelector('.dialogue-text')
    }


    show(speaker, content) 
    {
        this.dialogueSpeaker.textContent = speaker
        this.dialogueText.textContent = content
        this.dialogueBox.classList.add('is-visible')
    }


    hide() 
    {
        this.dialogueBox.classList.remove('is-visible')
        this.dialogueSpeaker.textContent = ''
        this.dialogueText.textContent = ''
    }
}