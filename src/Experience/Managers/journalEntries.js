/**
 * Contenu du journal
 */
export const journalSections =
[
    /**
     * Infos progression de l'histoire
     */
    {
        id: 'infos',
        label: 'Infos',
        counterLabel: 'infos',
        empty: "Les informations essentielles reviendront ici quand Arthur les retrouvera.",
        journalElements:
        [
            // Zone du portail
            {
                id: 'info-avalon',
                progress: 1,
                title: 'Avalon',
                content: "La traversée des brumes d'Avalon a brouillé ma mémoire."
            },
            {
                id: 'info-morgane',
                progress: 1,
                title: 'Morgane',
                content: "Morgane est ma sœur. Elle veut m'aider à retrouver mes souvenirs."
            },
            {
                id: 'info-identite',
                progress: 1,
                title: 'Identité',
                content: "Je m'appelle Arthur."
            },

            // Zone du lac
            {
                id: 'info-dame-lac',
                progress: 2,
                title: 'La Dame du Lac',
                content: "La Dame du Lac connaît mon nom et veillait sur moi avant ma gloire."
            },
            {
                id: 'info-excalibur',
                progress: 2,
                title: 'Excalibur',
                content: "La Dame du Lac m'a confié Excalibur, une lame liée à une promesse."
            },
            {
                id: 'info-premiere-epee',
                progress: 2,
                title: 'Première épée',
                content: "Avant de comprendre Excalibur, je dois retrouver le souvenir de ma première épée."
            },

            // Zone de l'épée
            {
                id: 'info-roc',
                progress: 3,
                title: 'Le roc',
                content: "Cette première épée était retenue par un roc."
            },
            {
                id: 'info-epee-rocher',
                progress: 3,
                title: 'L’épée du rocher',
                content: "J'ai retiré l'épée du roc devant une foule. À cet instant, tout a changé."
            },
            {
                id: 'info-roi',
                progress: 3,
                title: 'Roi reconnu',
                content: "Seul un héritier de sang royal pouvait tirer cette lame. Le royaume m'a alors reconnu comme son roi."
            },

            // Zone du manoir
            {
                id: 'info-serment-roi',
                progress: 4,
                title: 'Le serment du roi',
                content: "Être roi, c'était le serment de protéger, servir et porter le poids des autres."
            },
            {
                id: 'info-camelot',
                progress: 4,
                title: 'Camelot',
                content: "Camelot était le cœur de mon royaume et le siège de la Table Ronde."
            },
            {
                id: 'info-compagnons',
                progress: 4,
                title: 'Frères d’armes',
                content: "Lancelot, Gauvain et Perceval étaient mes frères d'armes autour de la Table Ronde."
            },
        ]
    },



    /**
     * Notes cachées sur l'île
     */
    {
        id: 'notes',
        label: 'Notes',
        counterLabel: 'notes trouvées',
        empty: 'Aucune note trouvée pour le moment.',
        journalElements:
        [
            {
                id: 'note-brume',
                image: '',
                title: 'Note froissée',
                content: "Les brumes d'Avalon ne cachent pas seulement les chemins. Elles protègent aussi certaines vérités.",
                lockedLabel: 'Note à trouver'
            },
            {
                id: 'note-table',
                image: '',
                title: 'Fragment de chronique',
                content: "La Table Ronde n'était pas faite pour placer un roi au-dessus des autres, mais pour rappeler que chaque serment engageait tous les chevaliers.",
                lockedLabel: 'Note à trouver'
            },
            {
                id: 'note-3',
                image: '',
                title: 'Note 3',
                content: '',
                lockedLabel: 'Note à trouver'
            },
            {
                id: 'note-4',
                image: '',
                title: 'Note 4',
                content: '',
                lockedLabel: 'Note à trouver'
            },
            {
                id: 'note-5',
                image: '',
                title: 'Note 5',
                content: '',
                lockedLabel: 'Note à trouver'
            },
        ]
    },



    /**
     * Objets cachés sur l'île
     */
    {
        id: 'collection',
        label: 'Collection',
        counterLabel: 'objets trouvés',
        empty: 'Aucun objet retrouvé pour le moment.',
        // modelName correspond au nom du mesh dans ItemsView.glb.
        journalElements:
        [
            {
                id: 'object-graal',
                image: 'images/Graal.png',
                modelName: 'GraalView',
                title: 'Graal',
                content: "Une coupe ancienne retrouvée sur l'île.",
                lockedLabel: 'Objet à trouver'
            },
            {
                id: 'object-baton-merlin',
                image: 'images/Baton.png',
                modelName: 'StickView',
                title: 'Bâton de Merlin',
                content: "Le bâton attribué à Merlin.",
                lockedLabel: 'Objet à trouver'
            },
            {
                id: 'object-tas-or',
                image: 'images/View_Coin.png',
                modelName: 'CoinView',
                title: "Tas d'or",
                content: "Des pièces anciennes cachées sur l'île.",
                lockedLabel: 'Objet à trouver'
            },
            {
                id: 'object-grimoire-merlin',
                image: 'images/Grimoire.png',
                modelName: 'BookView',
                title: 'Grimoire de Merlin',
                content: "Un grimoire ayant appartenu à Merlin.",
                lockedLabel: 'Objet à trouver'
            },
            {
                id: 'object-potion-1',
                image: 'images/View_Potion01.png',
                modelName: 'PotionView01',
                title: 'Potion rouge',
                content: "Une potion dont les effets restent inconnus.",
                lockedLabel: 'Objet à trouver'
            },
            {
                id: 'object-potion-2',
                image: 'images/View_Potion02.png',
                modelName: 'PotionView02',
                title: 'Potion violette',
                content: "Une seconde potion trouvée sur l'île.",
                lockedLabel: 'Objet à trouver'
            },
            {
                id: 'object-couronne',
                image: 'images/Courrone.png',
                modelName: 'CrownView',
                title: 'Couronne',
                content: "Une couronne ancienne dont le propriétaire reste inconnu.",
                lockedLabel: 'Objet à trouver'
            },
        ]
    },
]


/**
 * Progression checkpoint
 */
export const journalProgressByChapter =
{
    portal: 0,
    lake: 1,
    sword: 2,
    manor: 3,
}
