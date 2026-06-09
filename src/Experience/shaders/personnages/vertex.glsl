uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uMistSize;

attribute float aScale;
attribute vec3 aRandomness;
attribute float aKind;

varying float vKind;
varying float vAlpha;
varying float vRandom;

void main()
{
    vec3 animatedPosition = position;
    float isMist = step(0.5, aKind);

    vec3 orbDrift = vec3(
        sin(uTime * 0.2) * 0.20 + cos(uTime * 0.75) * 0.10,
        sin(uTime * 0.25) * 0.15 + sin(uTime * 0.75) * 0.08,
        sin(uTime * 0.32) * 0.10 + sin(uTime * 0.75) * 0.06
    );

    float mistTime = uTime * (0.45 + aRandomness.z * 0.9);
    float mistAngle = mistTime + aRandomness.x * 6.28318530718;
    float mistFloat = sin(mistTime * 1.7 + aRandomness.y * 6.28318530718);

    animatedPosition.x += isMist * (sin(mistAngle) * 0.10 + mistFloat * 0.035);
    animatedPosition.y += isMist * (cos(mistAngle * 0.72) * 0.055 + mistFloat * 0.04);
    animatedPosition.z += isMist * (cos(mistAngle) * 0.045);

    animatedPosition += orbDrift;

    vec4 modelPosition = modelMatrix * vec4(animatedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    float pulsation = 1.0 + sin(uTime * 3.0) * 0.15;
    float mistPulsation = 0.85 + sin(uTime * 1.4 + aRandomness.x * 8.0) * 0.18;
    float pointSize = mix(uSize * aScale * pulsation, uMistSize * aScale * mistPulsation, isMist);

    gl_PointSize = pointSize * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
    gl_PointSize = mix(max(gl_PointSize, 34.0 * uPixelRatio), gl_PointSize, isMist);

    vKind = aKind;
    vAlpha = mix(1.0, 0.28 + aRandomness.y * 0.36, isMist);
    vRandom = aRandomness.x;
}
