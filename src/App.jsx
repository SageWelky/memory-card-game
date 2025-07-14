import { useState } from 'react'
import { Header } from './modules/components/Header/Header'
import { Body } from './modules/components/Body/Body'
import { Footer } from './modules/components/Footer/Footer'
import styles from './App.module.css'
import './global.css'

function App() {
  const [score, setScore] = useState(0);

  return (
      <div className={styles.app}>
        <Header score={score} />
        <Body />
        <Footer />
      </div>
  )
}

export default App
