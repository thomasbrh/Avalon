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


        // Pont anim
        this.bridgeClicCount = 0

        this.bridgeClicNeeded = 4
        // état de l'interaction du pont
        this.bridgeInteractionActive = false

        // protection tween
        this.bridgeStepPlaying = false
        // reprendre la timeline
        this.bridgeInteractionResolve = null

        // index du du pont à jouer
        this.bridgeClipIndex = null


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
        this.interactionText = document.querySelector('#interaction-text')
        this.interactionButton = document.querySelector('#interaction-button')
        this.header = document.querySelector('.header')
        this.chapterMenuToggle = document.querySelector('.chapter-menu__toggle')
        this.chapterMenu = document.querySelector('#chapter-menu')
        this.chapterButtons = document.querySelectorAll('[data-chapter]')


        /**
         * Appel des instances
         */
        this.initInteraction()
        this.setNavigation()
        this.setActiveChapter('portal')
        this.setCheckpointsEnabled(false)
    }

    initInteraction()
    {
        const handler = (event) =>
        {
            if (!this.indicatorVisible) return
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

            if (this.currentScene && this.currentScene.timeline)
                this.currentScene.timeline.play()
        }
        window.addEventListener('click', handler)
        window.addEventListener('touchstart', handler)

        // interaction clavier pour les ponts
        window.addEventListener('keydown', (event) =>
        {
            if(!this.bridgeInteractionActive) return
            if(event.repeat) return

            if(event.code === 'KeyE')
            {
                event.preventDefault()
                this.advanceBridgeStep()
            }
        })
    }


    setNavigation()
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


    showInteraction(text, onClick = null)
    {
        // affiche un texte pour les interactions
        this.interactionText.textContent = text
        this.interactionText.classList.remove('hidden')
        this.interactionText.classList.toggle('can-click', !!onClick)

        // bouton E pour mobile / tactile
        this.interactionButton.classList.toggle('hidden', !onClick)

        this.interactionButton.onclick = (event) =>
        {
            event.stopPropagation()

            if(onClick)
            {
                onClick()
            }
        }
    }


    hideInteraction()
    {
        // cache et vide le texte d'aide
        this.interactionText.classList.add('hidden')
        this.interactionText.classList.remove('can-click')
        this.interactionText.textContent = ''
        this.interactionText.onclick = null
        this.interactionButton.classList.add('hidden')
        this.interactionButton.onclick = null
    }


    startBridgeInteraction(index)
    {
        // Promise pour mettre la timeline en pause pendant le mini-jeu du pont
        return new Promise((resolve) =>
        {
            const animationsClip = this.experience.world.animationsClip

            if(!animationsClip)
            {
                // si les animations ne sont pas chargées
                resolve()
                return
            }

            // reset du mini-jeu
            this.bridgeClicCount = 0
            this.bridgeClipIndex = index
            this.bridgeInteractionActive = true
            this.bridgeStepPlaying = false
            this.bridgeInteractionResolve = resolve

            const clipReady = animationsClip.setClipProgress(index, 0)

            if(!clipReady)
            {
                // si le clip n'existe pas
                this.bridgeInteractionActive = false
                this.bridgeStepPlaying = false
                this.bridgeInteractionResolve = null
                this.bridgeClipIndex = null
                resolve()
                return
            }

            this.showInteraction(
                "E - devoiler le pont",
                () =>
                {
                    this.advanceBridgeStep()
                }
            )
        })
    }


    advanceBridgeStep()
    {
        // le pont doit être en interaction
        if(!this.bridgeInteractionActive) return
        // empêche de spam
        if(this.bridgeStepPlaying) return

        // on joue seulement un morceau du clip à chaque clic
        const startProgress = this.bridgeClicCount / this.bridgeClicNeeded
        this.bridgeClicCount++

        const endProgress = this.bridgeClicCount / this.bridgeClicNeeded
        const animationsClip = this.experience.world.animationsClip

        this.bridgeStepPlaying = true
        this.showInteraction("Le pont se devoile...")

        const stepStarted = animationsClip?.playClipPart(
            this.bridgeClipIndex,
            startProgress,
            endProgress,
            () =>
            {
                // le morceau d'animation est fini, on peut accepter un nouvel clic
                this.bridgeStepPlaying = false

                const remainingClic = this.bridgeClicNeeded - this.bridgeClicCount

                if(remainingClic > 0)
                {
                    // il reste des étapes avant de finir le pont
                    this.showInteraction(
                        "E - continuer le pont",
                        () =>
                        {
                            this.advanceBridgeStep()
                        }
                    )

                    return
                }

                this.bridgeInteractionActive = false
                this.hideInteraction()

                // relance la timeline qui attendait la fin
                const resolve = this.bridgeInteractionResolve
                this.bridgeInteractionResolve = null
                this.bridgeClipIndex = null

                if(resolve) resolve()
            }
        )

        if(!stepStarted)
        {
            // si le clip n'a pas pu se lancer
            this.bridgeInteractionActive = false
            this.bridgeStepPlaying = false
            this.hideInteraction()

            const resolve = this.bridgeInteractionResolve
            this.bridgeInteractionResolve = null
            this.bridgeClipIndex = null

            if(resolve) resolve()
        }
    }


    setBridgeCheckpointState(name)
    {
        const animationsClip = this.experience.world.animationsClip
        if(!animationsClip) return

        // reset des ponts pour éviter de garder un ancien état après navigation rapide
        animationsClip.setClipProgress(0, 0) // pont de l'épée
        animationsClip.setClipProgress(1, 0) // pont du manoir
        animationsClip.setClipProgress(2, 0) // pont du portail

        // si on arrive au lac, le pont du portail est déjà passé
        if(name === 'lake' || name === 'sword' || name === 'manor')
        {
            animationsClip.setClipProgress(2, 1)
        }

        // si on arrive au manoir, le pont de l'épée est déjà passé aussi
        if(name === 'manor')
        {
            animationsClip.setClipProgress(0, 1)
        }
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

    async goToCheckpoint(name)
    {
        // reset UI avant le tp
        this.indicatorVisible = false
        this.nextIndicatorAction = null
        this.indicator.style.display = 'none'
        document.body.classList.remove('indicator-active')
        this.choicesContainer.style.display = 'none'
        this.choicesContainer.innerHTML = ''

        // interactions
        this.hideInteraction()
        this.bridgeInteractionActive = false
        this.bridgeStepPlaying = false
        this.bridgeInteractionResolve = null
        this.bridgeClipIndex = null
        this.experience.world.animationsClip?.stopCurrentClip()
        this.swordManager.swordInteractionActive = false
        this.swordManager.swordInteractionResolve = null

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


    setActiveChapter(name)
    {
        this.chapterButtons.forEach((button) =>
        {
            button.classList.toggle('is-active', button.dataset.chapter === name)
        })

    }


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
