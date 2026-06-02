
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
    const Portrait = window.innerHeight > window.innerWidth
    const Touch = navigator.maxTouchPoints > 0
    rotateOverlay.style.display = (Portrait && Touch) ? 'flex' : 'none'
}

window.addEventListener('resize', updateOrientationOverlay)
updateOrientationOverlay()