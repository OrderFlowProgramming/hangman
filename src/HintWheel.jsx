import { useState } from 'react'
import profilePhoto from './assets/DiskTest.png'

const HINTS = [
  "Leergierig en altijd bereid om nieuwe dingen te leren",
  "Volgde een Full Stack C#.NET-opleiding",
  "Achtergrond in CNC/schrijnwerk – technisch ingesteld",
  "Werk graag procesmatig en gestructureerd",
  "Vlot in de omgang met collega's",
  "Goedlachs en positief ingesteld",
  "Geef niet snel op bij tegenslagen",
  "Denk in oplossingen, niet in problemen",
]

function HintWheel({ onSpecialEffect }) {
  const [currentHint, setCurrentHint] = useState(null)
  const [spins, setSpins] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showLargePhoto, setShowLargePhoto] = useState(false)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * HINTS.length)
      setCurrentHint(HINTS[randomIndex])
      const newSpins = spins + 1
      setSpins(newSpins)

      if (newSpins % 4 === 0 && onSpecialEffect) {
        onSpecialEffect("DISTORTION")
      }

      setIsSpinning(false)
    }, 500)
  }

  return (
    <div className="hint-wheel">
      <h3>🎡 Hint Rad</h3>
      
      {/* Profiel foto - klik om te vergroten */}
      <div className="profile-photo" onClick={() => setShowLargePhoto(true)}>
        <img src={profilePhoto} alt="Profiel foto" />
        <span className="photo-hint">Klik om DISC te vergroten</span>
      </div>

      {/* Lightbox voor vergrote foto */}
      {showLargePhoto && (
        <div className="photo-lightbox" onClick={() => setShowLargePhoto(false)}>
          <div className="lightbox-content">
            <img src={profilePhoto} alt="Profiel foto groot" />
            <p>Klik ergens om te sluiten</p>
          </div>
        </div>
      )}
      
      <button 
        className="spin-button"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? "Draait..." : "Draai voor een hint!"}
      </button>

      <p className="spin-counter">Aantal keer gedraaid: {spins}</p>

      {currentHint && (
        <div className="hint-display">
          <p className="hint-label">💡 Hint over mij:</p>
          <p className="hint-text">"{currentHint}"</p>
        </div>
      )}
    </div>
  )
}

export default HintWheel
