uniform float uTime;
uniform float uSpeech;

varying vec2 vUv;
varying float vWave;
varying vec3 vNormal;
varying vec3 vViewDirection;

void main()
{
    vec3 animatedPosition = position;

    // deux vagues simples donnent un mouvement moins régulier
    float waveA = sin(position.y * 0.55 + position.x * 0.22 + uTime * 1.4);
    float waveB = sin(position.y * 0.35 - position.z * 0.3 - uTime * 0.9);
    float wave = (waveA + waveB) * 0.5;

    // pousse doucement le cylindre vers l'extérieur
    vec2 direction = normalize(animatedPosition.xz);
    animatedPosition.xz += direction * wave * mix(0.08, 0.4, uSpeech);

    vec4 modelPosition = modelMatrix * vec4(animatedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
    vWave = wave;
    vNormal = normalize(normalMatrix * normal);
    vViewDirection = normalize(-viewPosition.xyz);
}
