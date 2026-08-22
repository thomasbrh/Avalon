// import base
import Experience from '../Experience.js'
import { deferredGroups } from '../sources.js'

// import Manager
import DialogueManager from './DialogueManager.js'

// import ZonesManager
import PortalManager from './ZonesManager/PortalManager.js'
import LakeManager from './ZonesManager/LakeManager.js'
import SwordManager from './ZonesManager/SwordManager.js'
import ManorManager from './ZonesManager/ManorManager.js'


export default class StoryManager
{
    constructor()
    {
        /**
         * Base
         */
        this.experience = new Experience()
        this.dialogueManager = new DialogueManager()

        this.portalManager = new PortalManager(this)
        this.lakeManager = new LakeManager(this)
        this.swordManager = new SwordManager(this)
        this.manorManager = new ManorManager(this)


        /**
         * Initialisation
         */
        this.locked = false
        this.indicatorVisible = false
        this.nextIndicatorAction = null
        this.zones = 
        {
            portal: this.portalManager,
            lake: this.lakeManager,
            sword: this.swordManager,
            manor: this.manorManager,
        }
        this.checkpoints =
        {
            portal: 'checkpoint-portal',
            lake: 'checkpoint-lake',
            sword: 'checkpoint-sword',
            manor: 'checkpoint-manor',
        }
        this.currentScene = this.zones.portal


        /**
         * DOM
         * cible indicator cliquable
         */
        this.indicator = document.querySelector('#next-indicator')
        this.choicesContainer = document.querySelector('#choices-container')
        this.header = document.querySelector('.header')
        this.chapterMenuToggle = document.querySelector('.chapter-menu__toggle')
        this.chapterMenu = document.querySelector('#chapter-menu')
        this.chapterButtons = document.querySelectorAll('[data-chapter]')


        /**
         * Appel des instances
         */
        this.setStoryNavigation()
        this.setChapterNavigation()
        this.setActiveChapter('portal')
        this.setCheckpointsEnabled(false)
    }


    /**
     * Clic pour continuer
     */
    setStoryNavigation()
    {
        const onNextClick = (event) =>
        {
            // le menu ne doit jamais faire avancer la timeline
            if(event.target.closest('.header')) return
            if(!this.indicatorVisible) return

            event.preventDefault()
            
            this.indicatorVisible = false
            this.indicator.style.display = 'none'
            document.body.classList.remove('indicator-active')

            const action = this.nextIndicatorAction
            this.nextIndicatorAction = null

            if(action)
            {
                action()
                return
            }

            if(this.currentScene && this.currentScene.timeline)
                this.currentScene.timeline.play()
        }
        window.addEventListener('click', onNextClick)
    }


    /**
     * Le menu
     */
    setChapterNavigation()
    {
        this.chapterMenuToggle.addEventListener('click', (event) =>
        {
            event.stopPropagation()
            this.header.classList.toggle('menu-open')
        })

        // ferme le menu si on clique sur le fond
        this.chapterMenu.addEventListener('click', (event) =>
        {
            if(event.target === this.chapterMenu)
            {
                this.header.classList.remove('menu-open')
            }
        })

        // navigation vers les checkpoints
        this.chapterButtons.forEach((button) =>
        {
            button.addEventListener('click', async (event) =>
            {
                event.stopPropagation()
                this.header.classList.remove('menu-open')

                await this.goToCheckpoint(button.dataset.chapter)
            })
        })
    }


    showNextIndicator(onNext = null)
    {
        this.nextIndicatorAction = onNext
        this.indicatorVisible = true
        this.indicator.style.display = 'block'
        document.body.classList.add('indicator-active')
    }


    showChoices(choices, onResult) 
    {
        this.choicesContainer.style.display = 'flex'
        this.choicesContainer.innerHTML = ''


        choices.forEach(choice => 
        {
            const button = document.createElement('button')
            button.innerText = choice.text
            button.classList.add('btn', 'btn--large')
            
            // Événement au clic
            button.addEventListener('click', (event) =>
            {
                event.stopPropagation()
                if (choice.isCorrect)
                {
                    this.choicesContainer.style.display = 'none'
                    onResult(true)
                } else
                {
                    onResult(false)
                }
            })

            // On ajoute le bouton dans le HTML
            this.choicesContainer.appendChild(button)
        })
    }


    goTo(name)
    {
        if (this.currentScene?.exit) 
        {
            this.currentScene.exit()
        }
        this.currentScene = this.zones[name]
        this.setActiveChapter(name)
        this.currentScene?.enter()
    }


    /**
     * Replace les ponts dans l'état du chapitre choisi
     */
    setBridgeCheckpointState(name)
    {
        const animationsClip = this.experience.world.animationsClip

        // remet tous les ponts en bas
        animationsClip.setClipProgress(0, 0)
        animationsClip.setClipProgress(1, 0)
        animationsClip.setClipProgress(2, 0)

        // levé au chap du lake
        if(name === 'lake' || name === 'sword' || name === 'manor')
        {
            animationsClip.setClipProgress(2, 1)
        }

        // levé au chap du manoir
        if(name === 'manor')
        {
            animationsClip.setClipProgress(0, 1)
        }
    }


    /**
     * Charge les zones nécessaires
     */
    // replace l'expérience au chapitre choisi
    async goToCheckpoint(name)
    {
        // reset UI avant le tp
        this.indicatorVisible = false
        this.nextIndicatorAction = null
        this.indicator.style.display = 'none'
        document.body.classList.remove('indicator-active')
        this.choicesContainer.style.display = 'none'
        this.choicesContainer.innerHTML = ''
        this.dialogueManager.cancelDialogue()

        // charge les zones
        if(name === 'lake' || name === 'sword' || name === 'manor')
        {
            await this.experience.resources.loadGroup('lake', deferredGroups.lake)
            this.experience.world.createLakeZone()
        }

        if(name === 'lake' || name === 'sword' || name === 'manor')
        {
            await this.experience.resources.loadGroup('animations', deferredGroups.animations)
            this.experience.world.createAnimationsZone()
        }

        if(name === 'sword' || name === 'manor')
        {
            await this.experience.resources.loadGroup('sword', deferredGroups.sword)
            this.experience.world.createSwordZone()
        }

        if(name === 'manor')
        {
            await this.experience.resources.loadGroup('manor', deferredGroups.manor)
            this.experience.world.createManorZone()
        }

        // reset les timelines
        Object.values(this.zones).forEach((zone) =>
        {
            zone.timeline.pause(0)
        })

        // affiche les bonnes zones
        if(this.experience.world.lake)
            this.experience.world.lake.model.visible = name === 'lake' || name === 'sword' || name === 'manor'

        if(this.experience.world.animationsClip)
        {
            this.experience.world.animationsClip.model.visible = name === 'lake' || name === 'sword' || name === 'manor'
            this.setBridgeCheckpointState(name)
        }

        if(this.experience.world.sword)
            this.experience.world.sword.model.visible = name === 'sword' || name === 'manor'

        if(this.experience.world.manor)
            this.experience.world.manor.model.visible = false

        this.currentScene = this.zones[name]
        this.setActiveChapter(name)

        // pause au label du checkpoint
        this.currentScene.timeline.pause(this.checkpoints[name])

        // targets du checkpoint
        let targets = this.portalManager.targets
        let prefix = 'TargetPortal'
        let number = '1'

        if(name === 'lake')
        {
            number = '7'
        }

        if(name === 'sword')
        {
            targets = this.swordManager.targets
            prefix = 'TargetSword'
        }

        if(name === 'manor')
        {
            targets = this.manorManager.targets
            prefix = 'TargetManor'
        }

        // position caméra et personnages
        this.experience.camera.instance.position.set(
            targets[`${prefix}_camera${number}`].x,
            targets[`${prefix}_camera${number}`].y,
            targets[`${prefix}_camera${number}`].z
        )
        this.experience.camera.cameraTarget.set(
            targets[`${prefix}_target${number}`].x,
            targets[`${prefix}_target${number}`].y,
            targets[`${prefix}_target${number}`].z
        )
        this.experience.world.morganne.mesh.position.set(
            targets[`${prefix}_morganne${number}`].x,
            targets[`${prefix}_morganne${number}`].y,
            targets[`${prefix}_morganne${number}`].z
        )
        this.experience.world.arthur.mesh.position.set(
            targets[`${prefix}_arthur${number}`].x,
            targets[`${prefix}_arthur${number}`].y,
            targets[`${prefix}_arthur${number}`].z
        )

        this.showNextIndicator()
    }


    /**
     * Marque le chapitre actuel dans le menu
     */
    setActiveChapter(name)
    {
        this.chapterButtons.forEach((button) =>
        {
            button.classList.toggle('is-active', button.dataset.chapter === name)
        })

    }


    /**
     * Active le menu seulement après le chargement
     */
    setCheckpointsEnabled(isEnabled)
    {
        this.chapterButtons.forEach((button) =>
        {
            button.disabled = !isEnabled
            button.classList.toggle('is-locked', !isEnabled)
        })

    }

    
    lock()
    { 
        this.locked = true 
    }


    unlock(){ 
        this.locked = false 
    }


    update(){

    }
}
