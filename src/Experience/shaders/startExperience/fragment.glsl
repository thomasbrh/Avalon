varying vec2 vUv;

uniform float uTime;
uniform float uHover;
uniform float uEnterProgress;
uniform float uAspect;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
    const vec4 C = vec4(
        0.211324865405187,
        0.366025403784439,
        -0.577350269189626,
        0.024390243902439
    );

    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod289(i);
    vec3 p = permute(
        permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0)
    );

    vec3 m = max(
        0.5 - vec3(
            dot(x0, x0),
            dot(x12.xy, x12.xy),
            dot(x12.zw, x12.zw)
        ),
        0.0
    );

    m = m * m;
    m = m * m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.y = a0.y * x12.x + h.y * x12.y;
    g.z = a0.z * x12.z + h.z * x12.w;

    return 130.0 * dot(m, g);
}

float circleInfluence(vec2 p, vec2 center, float radius)
{
    float d = length(p - center);
    return 1.0 - smoothstep(radius, radius + 0.03, d);
}

float bubbleMask(vec2 p, vec2 center, float radius, float blur)
{
    float d = length(p - center);
    return 1.0 - smoothstep(radius, radius + blur, d);
}

float sdRoundedBox(vec2 p, vec2 b, float r)
{
    vec2 q = abs(p) - b + vec2(r);
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main()
{
    vec2 uv = vUv - 0.5;
    uv.x *= uAspect;

    float progress = 0.0 + uHover * 0.01 + uEnterProgress * 1.2;

    vec2 dir = normalize(uv + vec2(0.0001));

    float radial1 = snoise(dir * 2.0 + vec2(uTime * 0.16, uTime * 0.16));
    float radial2 = snoise(dir.yx * 1.4 + vec2(-uTime * 0.10, uTime * 0.08));
    float surface = snoise(uv * 2.6 + vec2(uTime * 0.08, -uTime * 0.06));

    float wobble = radial1 * 0.030 + radial2 * 0.018 + surface * 0.010;

    vec2 p1 = vec2(cos(uTime * 0.45) * 0.10, sin(uTime * 0.60) * 0.08);
    vec2 p2 = vec2(cos(uTime * 0.35 + 2.2) * 0.08, sin(uTime * 0.48 + 1.4) * 0.10);

    float bubble1 = exp(-25.0 * length(uv - p1));
    float bubble2 = exp(-25.0 * length(uv - p2));
    float bubbles = bubble1 * 0.012 + bubble2 * 0.009;

    // base rectangle vertical arrondi
    vec2 boxSize = vec2(0.32, 0.25);
    float cornerRadius = 0.25;

    // le portail grandit au clic
    boxSize += vec2(progress * 0.55, progress * 0.75);

    float shape = sdRoundedBox(uv, boxSize, cornerRadius);

    // déformations organiques légères
    shape -= wobble;
    shape -= bubbles;

    float portal = 0.25 - smoothstep(-0.002, 0.002, shape);

    float screenGradient = smoothstep(1.0, 0.0, vUv.y);
    vec3 overlayColor = mix(uColorEnd, uColorStart, screenGradient);

    float alpha = 1.0 - portal;

    gl_FragColor = vec4(overlayColor, alpha);
    #include <colorspace_fragment>
}