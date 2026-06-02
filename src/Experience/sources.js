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
    {
        name: 'ambiantForest',
        type: 'audio',
        path: 'audio/ambiant-forest/ambiant-forest.ogg'
    },

]





/**
 * Deferred
 */
export const deferredSources =
[

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



    /**
     * Trees sources
     */
    // Trees Pack01
    // glb
    {
        name: 'treesModelPack01',
        type: 'gltfModel',
        path: 'models/island/trees/TreesPack01.glb'
    },
    // texture
    // Lightmap
    {
        name: 'treesTextureLightmapPack01',
        type: 'texture',
        path: 'textures/island/trees/trees_lightmapPack01.webp'
    },
    // Normalmap
    {
        name: 'treesTextureNormalmapPack01',
        type: 'texture',
        path: 'textures/island/trees/trees_normalmapPack01.webp'
    },

    // Trees Pack02
    // glb
    {
        name: 'treesModelPack02',
        type: 'gltfModel',
        path: 'models/island/trees/TreesPack02.glb'
    },
    // texture
    // Lightmap
    {
        name: 'treesTextureLightmapPack02',
        type: 'texture',
        path: 'textures/island/trees/trees_lightmapPack02.webp'
    },
    // Normalmap
    {
        name: 'treesTextureNormalmapPack02',
        type: 'texture',
        path: 'textures/island/trees/trees_normalmapPack02.webp'
    },

    // Trees Pack03
    // glb
    {
        name: 'treesModelPack03',
        type: 'gltfModel',
        path: 'models/island/trees/TreesPack03.glb'
    },
    // texture
    // Lightmap
    {
        name: 'treesTextureLightmapPack03',
        type: 'texture',
        path: 'textures/island/trees/trees_lightmapPack03.webp'
    },
    // Normalmap
    {
        name: 'treesTextureNormalmapPack03',
        type: 'texture',
        path: 'textures/island/trees/trees_normalmapPack03.webp'
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
    {
        name: 'swordTextureLightmap',
        type: 'texture',
        path: 'textures/sword/sword_lightmap.webp'
    },
    // Normalmap
    {
        name: 'swordTextureNormalmap',
        type: 'texture',
        path: 'textures/sword/sword_normalmap.webp'
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
     * Lake sources
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

]