/**
 * Start loading
 */
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
    },
    // Normalmap
    {
        name: 'animationsTextureNormalmap',
        type: 'texture',
        path: 'textures/animations/animations_normalmap.webp'
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
    {
        name: 'oceanTextureLightmap',
        type: 'texture',
        path: 'textures/island/ocean/ocean_lightmap.webp'
    },
    // Normalmap
    {
        name: 'oceanTextureNormalmap',
        type: 'texture',
        path: 'textures/island/ocean/ocean_normalmap.webp'
    },


    // Rocks sources
    // glb
    {
        name: 'rocksModel',
        type: 'gltfModel',
        path: 'models/island/rocks.glb'
    },
    // texture
    // Lightmap
    {
        name: 'rocksTextureLightmap',
        type: 'texture',
        path: 'textures/island/rocks/rocks_lightmap.webp'
    },
    // Normalmap
    {
        name: 'rocksTextureNormalmap',
        type: 'texture',
        path: 'textures/island/rocks/rocks_normalmap.webp'
    },


    // Trees sources
    // glb
    {
        name: 'treesModelPack01',
        type: 'gltfModel',
        path: 'models/island/trees/TreesPack01.glb'
    },
    {
        name: 'treesModelPack02',
        type: 'gltfModel',
        path: 'models/island/trees/TreesPack02.glb'
    },
    {
        name: 'treesModelPack03',
        type: 'gltfModel',
        path: 'models/island/trees/TreesPack03.glb'
    },

    // texture
    // Lightmap
    {   
        name: 'treesTextureLightmapPack01',
        type: 'texture',
        path: 'textures/island/trees/trees_lightmapPack01.webp'
    },
    {   
        name: 'treesTextureLightmapPack02',
        type: 'texture',
        path: 'textures/island/trees/trees_lightmapPack02.webp'
    },
    {   
        name: 'treesTextureLightmapPack03',
        type: 'texture',
        path: 'textures/island/trees/trees_lightmapPack03.webp'
    },
    // Normalmap
    {
        name: 'treesTextureNormalmapPack01',
        type: 'texture',
        path: 'textures/island/trees/trees_normalmapPack01.webp'
    },
    {
        name: 'treesTextureNormalmapPack02',
        type: 'texture',
        path: 'textures/island/trees/trees_normalmapPack02.webp'
    },
    {
        name: 'treesTextureNormalmapPack03',
        type: 'texture',
        path: 'textures/island/trees/trees_normalmapPack03.webp'
    },



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
     * audio sources 
     */
    // ambiance
    {
        name: 'ambiantMusic',
        type: 'audio',
        path: 'audio/ambiant-music/ambiant-music.ogg'
    },

]



/**
 * Deferred
 */
export const deferredSources =
[

    /**
     * Sword sources
     */
    {
        name: 'swordModel',
        type: 'gltfModel',
        path: 'models/sword/sword.glb'
    },
    {
        name: 'swordTextureLightmap',
        type: 'texture',
        path: 'textures/sword/sword_lightmap.webp'
    },
    {
        name: 'swordTextureNormalmap',
        type: 'texture',
        path: 'textures/sword/sword_normalmap.webp'
    },



    /**
     * Manor sources
     */
    {
        name: 'manorModel',
        type: 'gltfModel',
        path: 'models/manor/manor.glb'
    },
    {
        name: 'manorTextureLightmap',
        type: 'texture',
        path: 'textures/manor/manor_lightmap.webp'
    },
    {
        name: 'manorTextureNormalmap',
        type: 'texture',
        path: 'textures/manor/manor_normalmap.webp'
    },



    /**
     * Audio
     */
    {
        name: 'ambiantForest',
        type: 'audio',
        path: 'audio/ambiant-forest/ambiant-forest.ogg'
    },

]