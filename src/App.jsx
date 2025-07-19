import { useState } from 'react'
import { PokemonCardsProvider } from './context/PokemonCardsProvider'
import { Header } from './modules/components/Header/Header'
import { Body } from './modules/components/Body/Body'
import { Footer } from './modules/components/Footer/Footer'
import styles from './App.module.css'
import './global.css'

function App() {
  const [score, setScore] = useState(0);

  return (
      <PokemonCardsProvider>
        <div className={styles.app}>
          <Header score={score} />
          <Body />
          <Footer />
        </div>
      </PokemonCardsProvider>
  )
}

export default App
