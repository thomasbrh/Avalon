// import base
import Experience from '../Experience.js'
import Environment from './Environment.js'

// import base extends
import AnimationsClip from '../Zones/AnimationsClip.js'
import Island from '../Zones/Island.js'
import Portal from '../Zones/Portal.js'
import Sword from '../Zones/Sword.js'
import Lake from '../Zones/Lake.js'
import Manor from '../Zones/Manor.js'


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
            this.animationsClip = new AnimationsClip()
            this.island = new Island()
            this.portal = new Portal()
            this.lake = new Lake()
            this.sword = new Sword()
            this.manor = new Manor()

        })
        
    }


    update()
    {
        // maj du shader du portal
        if(this.portal)
        {
            this.portal.update()
        }

        if (this.animationsClip && this.animationsClip.mixer) 
        {
            this.animationsClip.mixer.update(this.experience.time.delta * 0.001) 
        }
    }

}