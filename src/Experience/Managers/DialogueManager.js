
export default class DialogueManager
{

    constructor() 
    {
        /**
         * DOM
         */
        this.dialogueBox = document.querySelector('.dialogue-box')
        this.dialogueText = document.querySelector('.dialogue-text')
    }


    show(content) 
    {
        this.dialogueText.textContent = content
        this.dialogueBox.classList.add('is-visible')
    }


    hide() 
    {
        this.dialogueBox.classList.remove('is-visible')
        this.dialogueText.textContent = ''
    }
}