uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);


    modelPosition.x += sin(uTime * 0.2) * 0.20 + cos(uTime * 0.75) * 0.10;
    modelPosition.y += sin(uTime * 0.25) * 0.15 + sin(uTime * 0.75) * 0.08;
    modelPosition.z += sin(uTime * 0.32) * 0.10 + sin(uTime * 0.75) * 0.06;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    float pulsation = 1.0 + sin(uTime * 3.0) * 0.25;

    gl_PointSize = uSize * aScale * uPixelRatio * pulsation;
    gl_PointSize *= (1.0 / - viewPosition.z);
}