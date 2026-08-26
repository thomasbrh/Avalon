import { journalSections, journalProgressByChapter } from './journalEntries.js'
import ItemViewerManager from './ItemViewerManager.js'

export default class JournalManager
{
    constructor()
    {
        /**
         * Base
         */
        this.sections = journalSections
        this.unlockedIds = []
        this.activeSectionId = 'infos'
        this.toastTimeout = null


        /**
         * DOM
         */
        this.button = document.querySelector('.journal-btn')
        this.badge = document.querySelector('.journal-btn__badge')
        this.panel = document.querySelector('#journal-panel')
        this.closeButton = document.querySelector('.journal__close')
        this.tabsContainer = document.querySelector('.journal__tabs')
        this.content = document.querySelector('.journal__content')
        this.toast = document.querySelector('.journal-toast')
        this.itemViewer = new ItemViewerManager()


        /**
         * Appel des instances
         */
        this.setJournalEvents()
        this.render()
    }


    /**
     * Navigation Journal
     */
    setJournalEvents()
    {
        this.button.addEventListener('click', (event) =>
        {
            event.stopPropagation()
            this.toggle()
        })

        this.closeButton.addEventListener('click', (event) =>
        {
            event.stopPropagation()
            this.close()
        })

        // ferme le journal avec un clic sur le fond
        this.panel.addEventListener('click', (event) =>
        {
            if(event.target === this.panel)
            {
                this.close()
                return
            }

            event.stopPropagation()
        })

        // Ouvre le viewer seulement depuis une vignette d'objet débloquée.
        this.content.addEventListener('click', (event) =>
        {
            const mediaButton = event.target.closest('[data-viewer-id]')

            if(!mediaButton) return

            event.stopPropagation()
            const journalElement = this.findJournalElement(mediaButton.dataset.viewerId)

            if(journalElement)
            {
                this.itemViewer.open(journalElement)
            }
        })

        document.addEventListener('keydown', (event) =>
        {
            if(event.key === 'Escape')
            {
                if(this.itemViewer.isOpen)
                {
                    this.itemViewer.close()
                    return
                }

                this.close()
            }
        })
    }


    /**
     * Débloque et affiche la notification
     */
    unlock(id, showNotification = true) // showNotification false lors d'un saut checkpoint
    {
        const journalElement = this.findJournalElement(id)

        if(!journalElement || this.unlockedIds.includes(id)) return

        this.unlockedIds.push(id)
        this.render()

        if(showNotification)
        {
            this.showToast(journalElement)
        }
    }


    /**
     * Récupère les infos des chapitres précédents
     */
    syncToChapter(chapter)
    {
        const progress = journalProgressByChapter[chapter] ?? 0

        this.sections.forEach((section) =>
        {
            section.journalElements.forEach((journalElement) =>
            {
                if(journalElement.progress && journalElement.progress <= progress)
                {
                    this.unlock(journalElement.id, false)
                }
            })
        })
    }


    toggle()
    {
        if(this.panel.classList.contains('hidden'))
        {
            this.open()
            return
        }

        this.close()
    }

    open()
    {
        this.panel.classList.remove('hidden')
        this.panel.setAttribute('aria-hidden', 'false')
        this.button.setAttribute('aria-expanded', 'true')
    }


    close()
    {
        this.itemViewer.close()
        this.panel.classList.add('hidden')
        this.panel.setAttribute('aria-hidden', 'true')
        this.button.setAttribute('aria-expanded', 'false')
    }


    /**
     * Met à jour les différentes parties du journal
     */
    render()
    {
        this.renderTabs()
        this.renderContent()
        this.renderBadge()
    }

    /**
     * Crée les onglets et permet de changer de section
     */
    renderTabs()
    {
        this.tabsContainer.innerHTML = this.sections.map((section) =>
        {
            const activeClass = section.id === this.activeSectionId ? ' is-active' : ''
            const count = this.getUnlockedJournalElements(section).length
            const total = section.journalElements.length

            return `
                <button class="journal__tab${activeClass}" type="button" data-section="${section.id}">
                    <span class="journal__tab-label">${section.label}</span>
                    <span class="journal__tab-count">${count}/${total}</span>
                </button>
            `
        }).join('')

        this.tabsContainer.querySelectorAll('.journal__tab').forEach((button) =>
        {
            button.addEventListener('click', (event) =>
            {
                event.stopPropagation()
                this.activeSectionId = button.dataset.section
                this.render()
            })
        })
    }



    /**
     * Affiche les éléments de la section active
     */
    renderContent()
    {
        const section = this.sections.find((item) => item.id === this.activeSectionId)
        const journalElements = section.id === 'infos'
            ? this.getUnlockedJournalElements(section)
            : section.journalElements

        if(journalElements.length === 0)
        {
            this.content.innerHTML = `
                <p class="journal__section-count">0/${section.journalElements.length} ${section.counterLabel}</p>
                <p class="journal__empty">${section.empty}</p>
            `
            return
        }

        this.content.innerHTML = `
            <p class="journal__section-count">${this.getUnlockedJournalElements(section).length}/${section.journalElements.length} ${section.counterLabel}</p>
            <div class="journal__grid">
                ${journalElements.map((journalElement) => this.renderJournalElement(journalElement)).join('')}
            </div>
        `
    }



    renderJournalElement(journalElement)
    {
        const isUnlocked = this.unlockedIds.includes(journalElement.id)
        const lockedClass = isUnlocked ? '' : ' is-locked'

        const hasImageSpace = journalElement.image !== undefined
        const imageClass = hasImageSpace ? ' has-image' : ''

        const title = isUnlocked ? journalElement.title : journalElement.lockedLabel
        const content = isUnlocked ? journalElement.content : 'À découvrir sur l’île.'
        const image = journalElement.image
            ? `<img class="journal-element__image" src="${journalElement.image}" alt="">`
            : ''

        const hasViewer = isUnlocked && (journalElement.model || journalElement.modelName)
        let media = ''

        if(hasImageSpace && hasViewer)
        {
            media = `
                <button class="journal-element__media journal-element__media--button" type="button" data-viewer-id="${journalElement.id}" aria-label="Observer ${journalElement.title} en 3D">
                    ${image}
                </button>
            `
        }
        else if(hasImageSpace)
        {
            media = `<div class="journal-element__media">${image}</div>`
        }

        return `
            <article class="journal-element${lockedClass}${imageClass}">
                ${media}
                <div class="journal-element__body">
                    <h3 class="journal-element__title">${title}</h3>
                    <p class="journal-element__text">${content}</p>
                </div>
            </article>
        `
    }



    renderBadge()
    {
        const found = this.unlockedIds.length

        this.badge.textContent = found
        this.badge.classList.toggle('is-empty', found === 0)
    }



    findJournalElement(id)
    {
        for(const section of this.sections)
        {
            const journalElement = section.journalElements.find((item) => item.id === id)

            if(journalElement) return journalElement
        }
    }



    getUnlockedJournalElements(section)
    {
        return section.journalElements.filter((journalElement) => this.unlockedIds.includes(journalElement.id))
    }



    /**
     * Notification quand un élément est trouvé
     */
    showToast(journalElement)
    {
        window.clearTimeout(this.toastTimeout)
        this.toast.textContent = `Journal mis à jour : ${journalElement.title}`
        this.toast.classList.remove('hidden')

        this.toastTimeout = window.setTimeout(() =>
        {
            this.toast.classList.add('hidden')
        }, 2800)
    }
}
