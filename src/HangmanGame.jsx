import { useState } from 'react'
import HintWheel from './HintWheel'

const SOLUTION = "ENERGIEKE LEERGIERIGE TEAMPLAYER"
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
const MAX_WRONG_GUESSES = 7

const GALLOWS_STAGES = [
  `
  ┌───────┐
  │       │
  │       
  │      
  │      
  │      
  ═══════════`,
  `
  ┌───────┐
  │       │
  │       O
  │      
  │      
  │      
  ═══════════`,
  `
  ┌───────┐
  │       │
  │       O
  │       │
  │      
  │      
  ═══════════`,
  `
  ┌───────┐
  │       │
  │       O
  │      /│
  │      
  │      
  ═══════════`,
  `
  ┌───────┐
  │       │
  │       O
  │      /│\\
  │      
  │      
  ═══════════`,
  `
  ┌───────┐
  │       │
  │       O
  │      /│\\
  │      / 
  │      
  ═══════════`,
  `
  ┌───────┐
  │       │
  │       O
  │      /│\\
  │      / \\
  │      
  ═══════════`,
  `
  ┌───────┐
  │       │
  │       X
  │      /│\\
  │      / \\
  │      💀
  ═══════════`
]

function HangmanGame() {
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [deaths, setDeaths] = useState(0)
  const [showDistortion, setShowDistortion] = useState(false)

  const getDisplayWord = () => {
    return SOLUTION.split("").map((char) => {
      if (char === " ") return " "
      if (guessedLetters.includes(char)) return char
      return "_"
    })
  }

  const isWon = !getDisplayWord().includes("_")

  const triggerDistortion = () => {
    setDeaths(deaths + 1)
    setWrongGuesses(0)
    setShowDistortion(true)
    setTimeout(() => {
      setShowDistortion(false)
    }, 3000)
  }

  const handleSpecialEffect = (effect) => {
    if (effect === "DISTORTION" && wrongGuesses > 0) {
      triggerDistortion()
    }
  }

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || isWon) return
    setGuessedLetters([...guessedLetters, letter])

    if (!SOLUTION.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1
      
      if (newWrongGuesses >= MAX_WRONG_GUESSES) {
        setWrongGuesses(newWrongGuesses)
        setTimeout(() => triggerDistortion(), 500)
      } else {
        setWrongGuesses(newWrongGuesses)
      }
    }
  }

  return (
    <div className="hangman-game">
      <h2>Galgje Spel</h2>

      {/* Visuele galg */}
      <div className="gallows">
        <pre>{GALLOWS_STAGES[wrongGuesses]}</pre>
      </div>

      {/* Status tellers */}
      <div className="status">
        <span className="status-item">Fouten: {wrongGuesses} / {MAX_WRONG_GUESSES}</span>
        <span className="status-item">Deaths: {deaths} 💀</span>
      </div>

      {/* De te raden zin */}
      <div className="word-display">
        {getDisplayWord().map((char, index) => (
          <span 
            key={index} 
            className={char === " " ? "space" : "letter"}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Eindscherm bij winst */}
      {isWon && (
        <div className="end-screen">
          <h2>🎉 Gefeliciteerd!</h2>
          <p className="solution-reveal">
            Je hebt me ontcijferd als: <strong>{SOLUTION}</strong>
          </p>
          <p className="death-count">
            Je bent {deaths} keer "dood" gegaan om hier te komen.
            {deaths === 0 && " Indrukwekkend! 🌟"}
            {deaths > 0 && deaths <= 2 && " Goed gedaan! 👏"}
            {deaths > 2 && " Maar je hebt volgehouden! 💪"}
          </p>
          
          <div className="about-me">
            <h3>Over mij</h3>
            <p>
              Ik ben een energieke en leergierige teamplayer met een technische achtergrond 
              in CNC en schrijnwerk. Na mijn Full Stack C#.NET-opleiding ben ik klaar om 
              mijn passie voor programmeren in de praktijk te brengen.
            </p>
            <p>
              Wat mij kenmerkt? Ik denk in oplossingen, werk graag procesmatig 
              en geef niet snel op - zoals je net hebt ervaren in dit spel!
            </p>
          </div>

          <button 
            className="restart-button"
            onClick={() => window.location.reload()}
          >
            🔄 Speel opnieuw
          </button>
        </div>
      )}

      {/* Distortion bericht */}
      {showDistortion && (
        <div className="message distortion">
          ⚡ Nieuwe kans! Opgeven zit niet in mijn woordenboek.
        </div>
      )}

      {/* Alfabet knoppen */}
      <div className="alphabet">
        {ALPHABET.map((letter) => {
          const isGuessed = guessedLetters.includes(letter)
          const isCorrect = SOLUTION.includes(letter)
          
          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={isGuessed || isWon}
              className={`letter-btn ${isGuessed ? (isCorrect ? 'correct' : 'wrong') : ''}`}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {/* Hint-rad */}
      <HintWheel onSpecialEffect={handleSpecialEffect} />
    </div>
  )
}

export default HangmanGame
