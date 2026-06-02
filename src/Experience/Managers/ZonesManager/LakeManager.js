// import base
import Experience from '../../Experience.js'
import AudioManager from '../AudioManager.js'

// import librairies
import gsap from "gsap"


export default class LakeManager
{

    constructor(storyManager)
    {

        /**
         * Base
         */
        this.experience = new Experience()
        this.audioManager = new AudioManager()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.time = this.experience.time
        this.storyManager = storyManager
        this.dialogueManager = storyManager.dialogueManager


        /**
         * inisialisations
         */
        this.timeline = gsap.timeline({ paused: true });


        /**
         * Appel des instances
         */
        this.resources.on('ready', () =>
        {
            this.lakeTimeline();
        });

    }


    enter()
    {
        this.timeline.play();
        console.log('lake')
    }


    lakeTimeline()
    {
        /**
         * Data
         */
        this.morganne = this.experience.world.morganne.mesh;
        this.arthur = this.experience.world.arthur.mesh;

        this.timeline
            /**
             * Scene 2.1
             */
            .call(async () =>
            {
                this.timeline.pause();

                // dame du lac 2.1-1
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Arthur ??",
                    'audio/dialogue-lake/damedulac_voices-2.1-1.ogg');
                // dame du lac 2.1-2
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Oh… je vois, je redoutais ce moment… Les brumes ont pris ton passé, mais elles n'ont pas effacé ce que tu es.",
                    'audio/dialogue-lake/damedulac_voices-2.1-2.ogg');



                // arthur 2.1-1
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Vous connaissez mon nom ?",
                    'audio/dialogue-lake/arthur_voices-2.1-1.ogg');



                // dame du lac 2.1-3
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Je l'ai porté dans le silence bien avant que le monde ne l'acclame.",
                    'audio/dialogue-lake/damedulac_voices-2.1-3.ogg');



                // arthur 2.1-2
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Morgane dit que vous m'avez aidé à devenir… quelqu'un.",
                    'audio/dialogue-lake/arthur_voices-2.1-2.ogg');



                // dame du lac 2.1-4
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Je ne t'ai pas donné la grandeur. Elle était déjà en toi.",
                    'audio/dialogue-lake/damedulac_voices-2.1-4.ogg');
                // dame du lac 2.1-5
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Mais je t'ai confié ce qui devait la révéler.",
                    'audio/dialogue-lake/damedulac_voices-2.1-5.ogg');



                // arthur 2.1-3
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Une lame ?",
                    'audio/dialogue-lake/arthur_voices-2.1-3.ogg');



                // dame du lac 2.1-6
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Pas seulement, une promesse.",
                    'audio/dialogue-lake/damedulac_voices-2.1-6.ogg');
                // dame du lac 2.1-7
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Mais avant de comprendre Excalibur, tu dois d'abord te souvenir de l'épée qui t'a reconnu le premier.",
                    'audio/dialogue-lake/damedulac_voices-2.1-7.ogg');



                // arthur 2.1-4
                await this.dialogueManager.playLine(
                    "Arthur",
                    "Par où dois-je aller ?",
                    'audio/dialogue-lake/arthur_voices-2.1-4.ogg');


                /**
                 * Question sword
                 */
                // dame du lac 2.1-8
                await this.dialogueManager.playLine(
                    "Dame du Lac",
                    "Souviens-toi pour que le chemin se dévoile. Dis-moi… qu'est-ce qui la retient dans ton souvenir ?",
                    'audio/dialogue-lake/damedulac_voices-2.1-8.ogg');

                this.dialogueManager.hide();
                this.storyManager.showNextIndicator();
            })

        .call(async () =>
        {
            this.dialogueManager.hide();
            this.storyManager.goTo('sword');
        });
    }

}
