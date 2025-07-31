import { GameProvider } from './context/GameContext'
import { Header } from './modules/components/Header/Header'
import { Body } from './modules/components/Body/Body'
import { Footer } from './modules/components/Footer/Footer'
import styles from './App.module.css'
import './global.css'

function App() {

  return (
      <GameProvider>
        <div className={styles.app}>
          {/* add a backdrop layer for the behind-cardMat animations/gif */}
          <Header />
          <Body />
          <Footer />
        </div>
      </GameProvider>
  )
}

export default App
