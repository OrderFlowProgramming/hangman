import { useState } from 'react'
import HangmanGame from './HangmanGame'
import './App.css'

function App() {
  const [isStarted, setIsStarted] = useState(false)

  return (
    <div className="app-container">
      {!isStarted ? (
        <div className="start-screen">
          <h1>Raad wie ik ben</h1>
          <p className="subtitle">(je kan niet verliezen)</p>
          
          <div className="intro-text">
            <p>
              Welkom! Dit is een interactief galgje-spel waarin je ontdekt wie ik ben.
            </p>
            <p>
              Raad de letters om het woord te onthullen. Draai aan het hint-rad voor tips over mij.
            </p>
            <p>
              Maak je geen zorgen over fouten - in dit spel krijg je altijd een nieuwe kans!
            </p>
          </div>

          <button 
            className="start-button"
            onClick={() => setIsStarted(true)}
          >
            Start het spel
          </button>
        </div>
      ) : (
        <HangmanGame />
      )}
    </div>
  )
}

export default App
