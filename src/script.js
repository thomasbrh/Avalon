
// import de l'expérience entière
import Experience from './Experience/Experience.js'

/* anti-onglets */
window.name = "_blank__experience";


const experience = new Experience(document.querySelector('canvas.webgl'))

/**
 * Responsive
 */
if (screen?.orientation?.lock) 
{
    screen.orientation.lock('landscape').catch(() => {})
}

const rotateOverlay = document.querySelector('.rotate-overlay')

function updateOrientationOverlay()
{
    const viewport = window.visualViewport
    const width = viewport ? viewport.width : window.innerWidth
    const height = viewport ? viewport.height : window.innerHeight

    const Portrait = height > width
    const Touch = navigator.maxTouchPoints > 0
    rotateOverlay.style.display = (Portrait && Touch) ? 'flex' : 'none'
}

function scheduleOrientationUpdate()
{
    setTimeout(updateOrientationOverlay, 150)
}

window.addEventListener('resize', scheduleOrientationUpdate)
window.addEventListener('orientationchange', scheduleOrientationUpdate)
updateOrientationOverlay()