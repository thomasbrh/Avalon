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



    // Bushes sources
    // glb
    {
        name: 'bushesModel',
        type: 'gltfModel',
        path: 'models/island/bushes.glb'
    },
    // texture
    // Lightmap
    {
        name: 'bushesTextureLightmap',
        type: 'texture',
        path: 'textures/island/bushes/buisson_lightmap.webp'
    },
    // Normalmap
    {
        name: 'bushesTextureNormalmap',
        type: 'texture',
        path: 'textures/island/bushes/buisson_normalmap.webp'
    },



    /**
     * Grass sources
     */
    // glb
    {
        name: 'grassModel',
        type: 'gltfModel',
        path: 'models/island/grass.glb'
    },
    // texture
    // Lightmap
    {
        name: 'grassTextureLightmap',
        type: 'texture',
        path: 'textures/island/grass/grass_lightmap.webp'
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
const lakeSources =
[
    {
        name: 'lakeModel',
        type: 'gltfModel',
        path: 'models/lake/lake.glb'
    },
    {
        name: 'lakeTextureLightmap',
        type: 'texture',
        path: 'textures/lake/lake_lightmap.webp'
    },
    {
        name: 'lakeTextureNormalmap',
        type: 'texture',
        path: 'textures/lake/lake_normalmap.webp'
    },
]

const animationsSources =
[
    {
        name: 'animationsModel',
        type: 'gltfModel',
        path: 'models/animations/animations.glb'
    },
    {
        name: 'animationsTextureLightmap',
        type: 'texture',
        path: 'textures/animations/animations_lightmap.webp'
    },
    {
        name: 'animationsTextureNormalmap',
        type: 'texture',
        path: 'textures/animations/animations_normalmap.webp'
    },
]

const swordSources =
[
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
]

const manorSources =
[
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
]



export const deferredGroups =
{
    lake: lakeSources,
    animations: animationsSources,
    sword: swordSources,
    manor: manorSources,
}
