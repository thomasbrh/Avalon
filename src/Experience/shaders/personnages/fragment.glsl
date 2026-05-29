uniform vec3 uColor;

void main()
{
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

    // noyau défini mais avec du fallout
    float disc = 1.0 - smoothstep(0.0, 0.45, distanceToCenter);
    disc = pow(disc, 0.6);

    // aura douce autour
    float aura = clamp(0.05 / max(distanceToCenter, 0.001) - 0.1, 0.0, 1.0);

    float strength = disc * 0.55 + aura * 0.2;

    gl_FragColor = vec4(uColor, strength);
}