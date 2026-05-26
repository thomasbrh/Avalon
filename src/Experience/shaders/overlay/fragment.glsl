varying vec2 vUv;

uniform float uAlpha;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

void main()
{
    float screenGradient = smoothstep(1.0, 0.0, vUv.y);
    vec3 color = mix(uColorEnd, uColorStart, screenGradient);

    gl_FragColor = vec4(color, uAlpha);
    #include <colorspace_fragment>
}