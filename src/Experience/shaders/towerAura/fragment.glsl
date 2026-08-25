uniform float uTime;
uniform float uStrength;
uniform float uSpeech;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;
varying float vWave;
varying vec3 vNormal;
varying vec3 vViewDirection;

void main()
{
    // efface le bas et le haut du cylindre
    float bottomFade = smoothstep(0.0, 0.18, vUv.y);
    float topFade = 1.0 - smoothstep(0.72, 1.0, vUv.y);
    float verticalFade = bottomFade * topFade;

    // bandes verticales qui ressemblent à des rideaux d'aurore
    float curtain = sin(
        vUv.x * 28.0
        + vUv.y * 9.0
        - uTime * 1.8
        + vWave * 2.0
    );
    curtain = pow(curtain * 0.5 + 0.5, 6.0);

    // évite que l'aura recouvre tout l'écran quand la caméra entre dedans
    // les côtés du cylindre restent visibles comme une silhouette lumineuse
    float fresnel = 1.0 - abs(dot(
        normalize(vNormal),
        normalize(vViewDirection)
    ));
    fresnel = pow(fresnel, 2.0);

    // dégradé de couleur animé
    float colorMix = clamp(
        vUv.y + vWave * 0.12 + sin(uTime + vUv.x * 6.0) * 0.08,
        0.0,
        1.0
    );
    vec3 color = mix(uColorA, uColorB, colorMix);
    color *= 1.0 + uSpeech * 1.5;

    float auraAlpha = mix(0.08, 0.4, uSpeech);
    float alpha = verticalFade * curtain * auraAlpha * uStrength;
    alpha *= 0.5 + fresnel * 0.5;

    gl_FragColor = vec4(color, alpha);
}
