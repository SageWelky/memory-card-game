import { GameProvider } from './context/GameContext'
import { ShuffleProvider } from './context/ShuffleContext'
import { Header } from './modules/components/Header/Header'
import { Body } from './modules/components/Body/Body'
import { Footer } from './modules/components/Footer/Footer'
import styles from './App.module.css'
import './global.css'

function App() {

  return (
      <GameProvider>
        <ShuffleProvider>
          <div className={styles.app}>
            <Header />
            <Body />
            <Footer />
          </div>
        </ShuffleProvider>
      </GameProvider>
  )
}

export default App
