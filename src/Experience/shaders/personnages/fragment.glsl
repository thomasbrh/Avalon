uniform vec3 uColor;

varying float vKind;
varying float vAlpha;
varying float vRandom;

void main()
{
    vec2 uv = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(uv);
    float isMist = step(0.5, vKind);

    // orbe initiale
    float core = 1.0 - smoothstep(0.0, 0.24, distanceToCenter);
    core = pow(core, 0.36);

    float halo = 1.0 - smoothstep(0.18, 0.5, distanceToCenter);
    halo = pow(halo, 1.9);

    float orbStrength = clamp(core * 0.62 + halo * 0.28, 0.0, 0.72);

    // carres de brume
    float squareDistance = max(abs(uv.x), abs(uv.y));
    float square = 1.0 - smoothstep(0.39, 0.5, squareDistance);
    float inner = 1.0 - smoothstep(0.0, 0.42, squareDistance);
    float mistStrength = square * (0.14 + inner * 0.26) * vAlpha;

    float luminance = dot(uColor, vec3(0.299, 0.587, 0.114));
    vec3 saturatedColor = clamp(mix(vec3(luminance), uColor, 1.55), 0.0, 1.0);

    vec3 orbColor = mix(saturatedColor, vec3(1.0), core * 0.08 + halo * 0.06);
    vec3 mistColor = mix(saturatedColor, vec3(1.0), 0.2 + vRandom * 0.14);
    vec3 color = mix(orbColor, mistColor, isMist);
    float strength = mix(orbStrength, mistStrength, isMist);

    gl_FragColor = vec4(color, strength);
}
