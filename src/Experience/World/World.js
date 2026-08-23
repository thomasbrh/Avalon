// import base
import Experience from '../Experience.js'
import Environment from './Environment.js'

// import base extends
import AnimationsClip from '../Zones/AnimationsClip.js'
import Island from '../Zones/Island.js'
import Items from '../Zones/items.js'
import Portal from '../Zones/Portal.js'
import Sword from '../Zones/Sword.js'
import Lake from '../Zones/Lake.js'
import Manor from '../Zones/Manor.js'
import Personnages from '../personnages/personnages.js'


export default class World
{

    constructor()
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources


        // On attends les ressources
        this.resources.on('ready', () =>
        {

            /**
             * Base extends
             */
            this.environment = new Environment()
            this.island = new Island()
            this.items = new Items()
            this.portal = new Portal()

            this.morganne = new Personnages('#D4A0C0')
            this.arthur = new Personnages('#FAB56F')

        })
        
    }


    /**
     * Deferred
     */
    createLakeZone()
    {
        if(this.lake) return

        this.lake = new Lake()
    }


    createAnimationsZone()
    {
        if(this.animationsClip) return

        this.animationsClip = new AnimationsClip()
        this.animationsClip.model.visible = false
    }


    createSwordZone()
    {
        if(this.sword) return

        this.sword = new Sword()
        this.sword.model.visible = false

        this.experience.storyManager.swordManager.init()
    }


    createManorZone()
    {
        if(this.manor) return

        this.manor = new Manor()
        this.manor.model.visible = false

        this.experience.storyManager.manorManager.init()
    }


    update()
    {
        // update du raycaster
        if(this.items)
        {
            this.items.update()
        }

        // maj du shader du portal
        if(this.portal && this.portal.model.visible && this.portal.portalShaderMesh?.visible)
        {
            this.portal.update()
        }

        // maj clip d'anim
        if (this.animationsClip && this.animationsClip.mixer && this.animationsClip.model.visible)
        {
            this.animationsClip.mixer.update(this.experience.time.delta * 0.001)
        }

        // maj perso
        if(this.morganne)
        {
            this.morganne.update()
        } 

        if(this.arthur)
        {
            this.arthur.update()
        }
    }

}
