uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uSpeech;
varying float vWobble;


void main()
{
    float colorMix = smoothstep(-1.0, 1.0, vWobble);
    vec3 wobbleColor = mix(uColorA, uColorB, colorMix);

    csm_DiffuseColor.rgb = wobbleColor * (1.0 + uSpeech * 0.22);

    csm_Roughness = mix(1.0 - colorMix, 0.28, uSpeech * 0.35);
}
