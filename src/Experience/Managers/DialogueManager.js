
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
        this.dialogueBox.classList.remove('hidden')
    }


    hide() 
    {
        this.dialogueBox.classList.add('hidden')
        this.dialogueText.textContent = ''
    }
}