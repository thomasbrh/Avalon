export default 
[

    // environmentMap
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.png',
            'textures/environmentMap/nx.png',
            'textures/environmentMap/py.png',
            'textures/environmentMap/ny.png',
            'textures/environmentMap/pz.png',
            'textures/environmentMap/nz.png'
        ]
    },



    /**
     * Camera sources
     */
    // Camera
    // glb
    {
        name: 'CameraModel',
        type: 'gltfModel',
        path: 'models/camera/first-camera-position.glb'
    },



    /**
     * Animations sources
     */
    // Animations
    // glb
    {
        name: 'animationsModel',
        type: 'gltfModel',
        path: 'models/animations/animations.glb'
    },
    // texture
    // Lightmap
    /* {
        name: 'animationsTextureLightmap',
        type: 'texture',
        path: 'textures/animations/animations_lightmap.webp'
    }, */
    // Normalmap
    /* {
        name: 'animationsTextureNormalmap',
        type: 'texture',
        path: 'textures/animations/animations_normalmap.png'
    }, */
    


    /**
     * Island sources
     */
    // Island
    // glb
    {
        name: 'islandModel',
        type: 'gltfModel',
        path: 'models/island/island.glb'
    },
    // texture
    // Lightmap
    {
        name: 'islandTextureLightmap',
        type: 'texture',
        path: 'textures/island/island_lightmap.webp'
    },
    // Normalmap
    {
        name: 'islandTextureNormalmap',
        type: 'texture',
        path: 'textures/island/island_normalmap.webp'
    },


    // Ocean sources
    // glb
    {
        name: 'oceanModel',
        type: 'gltfModel',
        path: 'models/island/ocean.glb'
    },
    // texture
    // Lightmap
    /* {
        name: 'oceanTextureLightmap',
        type: 'texture',
        path: 'textures/island/ocean/ocean_lightmap.webp'
    }, */
    // Normalmap
    /* {
        name: 'oceanTextureNormalmap',
        type: 'texture',
        path: 'textures/island/ocean/ocean_normalmap.webp'
    }, */


    // Rocks sources
    // glb
    {
        name: 'rocksModel',
        type: 'gltfModel',
        path: 'models/island/rocks.glb'
    },
    // texture
    // Lightmap
    /* {
        name: 'rocksTextureLightmap',
        type: 'texture',
        path: 'textures/island/rocks/rocks_lightmap.webp'
    }, */
    // Normalmap
    /* {
        name: 'rocksTextureNormalmap',
        type: 'texture',
        path: 'textures/island/rocks/rocks_normalmap.webp'
    }, */


    // Tree sources
    // glb
    {
        name: 'treesModel',
        type: 'gltfModel',
        path: 'models/island/trees.glb'
    },

    // texture
    // Lightmap
    {   
        name: 'treesTextureLightmap',
        type: 'texture',
        path: 'textures/island/trees/trees_lightmap.webp'
    },
    // Normalmap
    /* {
        name: 'treesTextureNormalmap',
        type: 'texture',
        path: 'textures/island/trees/trees_normalmap.webp'
    }, */



    /**
     * lake sources
     */
    // glb
    {
        name: 'lakeModel',
        type: 'gltfModel',
        path: 'models/lake/lake.glb'
    },

    // texture
    // Lightmap
    {
        name: 'lakeTextureLightmap',
        type: 'texture',
        path: 'textures/lake/lake_lightmap.webp'
    },
    // Normalmap
    {
        name: 'lakeTextureNormalmap',
        type: 'texture',
        path: 'textures/lake/lake_normalmap.webp'
    },



    /**
     * Manor sources
     */
    // glb
    {
        name: 'manorModel',
        type: 'gltfModel',
        path: 'models/manor/manor.glb'
    },

    // texture
    // Lightmap
    {
        name: 'manorTextureLightmap',
        type: 'texture',
        path: 'textures/manor/manor_lightmap.webp'
    },
    // Normalmap
    {
        name: 'manorTextureNormalmap',
        type: 'texture',
        path: 'textures/manor/manor_normalmap.webp'
    },



    /**
     * portal sources
     */
    // glb
    {
        name: 'portalModel',
        type: 'gltfModel',
        path: 'models/portal/portal.glb'
    },

    // texture
    // Lightmap
    {
        name: 'portalTextureLightmap',
        type: 'texture',
        path: 'textures/portal/portal_lightmap.webp'
    },
    // Normalmap
    {
        name: 'portalTextureNormalmap',
        type: 'texture',
        path: 'textures/portal/portal_normalmap.webp'
    },



    /**
     * Sword sources
     */
    // glb
    {
        name: 'swordModel',
        type: 'gltfModel',
        path: 'models/sword/sword.glb'
    },

    // texture
    // Lightmap
    /* {
        name: 'swordTextureLightmap',
        type: 'texture',
        path: 'textures/sword/sword_lightmap.webp'
    }, */
    // texture
    // Normalmap
    /* {
        name: 'swordTextureNormalmap',
        type: 'texture',
        path: 'textures/sword/sword_normalmap.webp'
    }, */



    /**
     * audio sources 
     */
    // ambiance
    {
        name: 'ambiantMusic',
        type: 'audio',
        path: 'audio/ambiant-music/ambiant-music.mp3'
    },

    // ambiant forest
    {
        name: 'ambiantForest',
        type: 'audio',
        path: 'audio/ambiant-forest/ambiant-forest.mp3'
    },

]