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
        type: 'ktx2',
        path: 'textures/island/island_lightmap.ktx2'
    },
    // Normalmap
    {
        name: 'islandTextureNormalmap',
        type: 'ktx2',
        path: 'textures/island/island_normalmap.ktx2'
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
        type: 'ktx2',
        path: 'textures/island/rocks/rocks_lightmap.ktx2'
    },
    // Normalmap
    {
        name: 'rocksTextureNormalmap',
        type: 'ktx2',
        path: 'textures/island/rocks/rocks_normalmap.ktx2'
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
        type: 'ktx2',
        path: 'textures/portal/portal_lightmap.ktx2'
    },
    // Normalmap
    {
        name: 'portalTextureNormalmap',
        type: 'ktx2',
        path: 'textures/portal/portal_normalmap.ktx2'
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
        type: 'ktx2',
        path: 'textures/island/trees/trees_lightmapPack01.ktx2'
    },
    // Normalmap
    {
        name: 'treesTextureNormalmapPack01',
        type: 'ktx2',
        path: 'textures/island/trees/trees_normalmapPack01.ktx2'
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
        type: 'ktx2',
        path: 'textures/island/trees/trees_lightmapPack02.ktx2'
    },
    // Normalmap
    {
        name: 'treesTextureNormalmapPack02',
        type: 'ktx2',
        path: 'textures/island/trees/trees_normalmapPack02.ktx2'
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
        type: 'ktx2',
        path: 'textures/island/trees/trees_lightmapPack03.ktx2'
    },
    // Normalmap
    {
        name: 'treesTextureNormalmapPack03',
        type: 'ktx2',
        path: 'textures/island/trees/trees_normalmapPack03.ktx2'
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
        type: 'ktx2',
        path: 'textures/sword/sword_lightmap.ktx2'
    },
    // Normalmap
    {
        name: 'swordTextureNormalmap',
        type: 'ktx2',
        path: 'textures/sword/sword_normalmap.ktx2'
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
        type: 'ktx2',
        path: 'textures/manor/manor_lightmap.ktx2'
    },
    // Normalmap
    {
        name: 'manorTextureNormalmap',
        type: 'ktx2',
        path: 'textures/manor/manor_normalmap.ktx2'
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
        type: 'ktx2',
        path: 'textures/lake/lake_lightmap.ktx2'
    },
    // Normalmap
    {
        name: 'lakeTextureNormalmap',
        type: 'ktx2',
        path: 'textures/lake/lake_normalmap.ktx2'
    },

]