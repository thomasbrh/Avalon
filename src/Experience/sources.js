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
    // Diffuse
    {
        name: 'animationsTextureDiffuse',
        type: 'texture',
        path: 'textures/animations/RockBridge_Bake1_PBR_Diffuse.webp'
    },
    // Normal
    /* {
        name: 'animationsTextureNormal',
        type: 'texture',
        path: 'textures/animations/RockBridge_Bake1_PBR_Normal.png'
    }, */
    // Roughness
    /* {
        name: 'animationsTextureRoughness',
        type: 'texture',
        path: 'textures/animations/animations_Bake1_PBR_Roughness.png'
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
    // Diffuse
    {
        name: 'islandTextureDiffuse',
        type: 'texture',
        path: 'textures/island/Island_Bake1_PBR_Diffuse.webp'
    },
    // Normal
    /* {
        name: 'islandTextureNormal',
        type: 'texture',
        path: 'textures/island/Island_Bake1_PBR_Normal.png'
    }, */
    // Roughness
    /* {
        name: 'islandTextureRoughness',
        type: 'texture',
        path: 'textures/island/Island_Bake1_PBR_Roughness.png'
    }, */


    // Ocean sources
    // glb
    {
        name: 'oceanModel',
        type: 'gltfModel',
        path: 'models/island/ocean.glb'
    },

    // texture
    // Diffuse
    {
        name: 'oceanTextureDiffuse',
        type: 'texture',
        path: 'textures/island/ocean/Ocean_Bake1_PBR_Diffuse.webp'
    },
    // Normal
    /* {
        name: 'oceanTextureNormal',
        type: 'texture',
        path: 'textures/island/ocean/Ocean_Bake1_PBR_Normal.png'
    }, */
    // Roughness
    /* {
        name: 'oceanTextureRoughness',
        type: 'texture',
        path: 'textures/island/ocean/Ocean_Bake1_PBR_Roughness.png'
    }, */


    // Rocks sources
    // glb
    {
        name: 'rocksModel',
        type: 'gltfModel',
        path: 'models/island/rocks.glb'
    },

    // texture
    // Diffuse
    {
        name: 'rocksTextureDiffuse',
        type: 'texture',
        path: 'textures/island/rocks/Rock_Bake1_PBR_Diffuse.png'
    },
    // Normal
    {
        name: 'rocksTextureNormal',
        type: 'texture',
        path: 'textures/island/rocks/Rock_Bake1_PBR_Normal.png'
    },
    // Roughness
    {
        name: 'rocksTextureRoughness',
        type: 'texture',
        path: 'textures/island/rocks/Rock_Bake1_PBR_Roughness.png'
    },


    // Tree sources
    // glb
    {
        name: 'treesModel',
        type: 'gltfModel',
        path: 'models/island/trees.glb'
    },

    // texture
    // Diffuse
    {
        name: 'treesTextureDiffuse',
        type: 'texture',
        path: 'textures/island/trees/Tree_Bake1_PBR_Diffuse.png'
    },
    // Normal
    {
        name: 'treesTextureNormal',
        type: 'texture',
        path: 'textures/island/trees/Tree_Bake1_PBR_Normal.png'
    },
    // Roughness
    {
        name: 'treesTextureRoughness',
        type: 'texture',
        path: 'textures/island/trees/Tree_Bake1_PBR_Roughness.png'
    },



    // fog sources
    // glb
    /* {
        name: 'fogModel',
        type: 'gltfModel',
        path: 'models/island/fog.glb'
    }, */

    // texture
    // Diffuse
    /* {
        name: 'fogTextureDiffuse',
        type: 'texture',
        path: 'textures/island/Fog_Bake1_PBR_Diffuse.png'
    },
    // Alpha
    {
        name: 'fogTextureAlpha',
        type: 'texture',
        path: 'textures/island/Fog_Bake1_PBR_Alpha.png'
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
    // Diffuse
    {
        name: 'lakeTextureDiffuse',
        type: 'texture',
        path: 'textures/lake/Lac_Bake1_PBR_Diffuse.png'
    },
    // Normal
    {
        name: 'lakeTextureNormal',
        type: 'texture',
        path: 'textures/lake/Lac_Bake1_PBR_Normal.png'
    },
    // Roughness
    {
        name: 'lakeTextureRoughness',
        type: 'texture',
        path: 'textures/lake/Lac_Bake1_PBR_Roughness.png'
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
    // Diffuse
    {
        name: 'manorTextureDiffuse',
        type: 'texture',
        path: 'textures/manor/Manoir_Bake1_PBR_Diffuse.webp'
    },
    // Normal
    /* {
        name: 'manorTextureNormal',
        type: 'texture',
        path: 'textures/manor/Manoir_Bake1_PBR_Normal.png'
    }, */
    // Roughness
    /* {
        name: 'manorTextureRoughness',
        type: 'texture',
        path: 'textures/manor/Manoir_Bake1_PBR_Roughness.png'
    }, */



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
    // Diffuse
    {
        name: 'portalTextureDiffuse',
        type: 'texture',
        path: 'textures/portal/Portail_Bake1_PBR_Diffuse.png'
    },
    // Normal
    {
        name: 'portalTextureNormal',
        type: 'texture',
        path: 'textures/portal/Portail_Bake1_PBR_Normal.png'
    },
    // Roughness
    {
        name: 'portalTextureRoughness',
        type: 'texture',
        path: 'textures/portal/Portail_Bake1_PBR_Roughness.png'
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
    // Diffuse
    {
        name: 'swordTextureDiffuse',
        type: 'texture',
        path: 'textures/sword/Sword_Bake1_PBR_Diffuse.png'
    },
    // texture
    // Normal
    {
        name: 'swordTextureNormal',
        type: 'texture',
        path: 'textures/sword/Sword_Bake1_PBR_Normal.png'
    },
    // texture
    // Roughness
    {
        name: 'swordTextureRoughness',
        type: 'texture',
        path: 'textures/sword/Sword_Bake1_PBR_Roughness.png'
    },



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