
// import de l'expérience entière
import Experience from './Experience/Experience.js'

/* anti-onglets */
window.name = "Avalon - expérience";


const experience = new Experience(document.querySelector('canvas.webgl'))

/**
 * Responsive
 */
if (screen?.orientation?.lock) 
{
    screen.orientation.lock('landscape').catch(() => {})
}

const rotateOverlay = document.querySelector('.rotate-overlay')
const coarsePointer = window.matchMedia('(pointer: coarse)')
let orientationFrame = null

function updateOrientationOverlay()
{
    const viewport = window.visualViewport
    const width = viewport ? viewport.width : window.innerWidth
    const height = viewport ? viewport.height : window.innerHeight

    const isPortrait = height > width
    const shouldBlock = isPortrait && coarsePointer.matches

    rotateOverlay.style.display = shouldBlock ? 'flex' : 'none'
    rotateOverlay.setAttribute('aria-hidden', String(!shouldBlock))
}

function scheduleOrientationUpdate()
{
    if(orientationFrame !== null) cancelAnimationFrame(orientationFrame)
    orientationFrame = requestAnimationFrame(() =>
    {
        orientationFrame = null
        updateOrientationOverlay()
    })
}

window.addEventListener('resize', scheduleOrientationUpdate)
window.addEventListener('orientationchange', scheduleOrientationUpdate)
window.visualViewport?.addEventListener('resize', scheduleOrientationUpdate)
coarsePointer.addEventListener('change', scheduleOrientationUpdate)
updateOrientationOverlay()
