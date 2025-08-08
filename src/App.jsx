import { createTheme, ThemeProvider } from '@mui/material/styles'
import { GameProvider } from './context/GameContext'
import { ShuffleProvider } from './context/ShuffleContext'
import { Header } from './modules/components/Header/Header'
import { Body } from './modules/components/Body/Body'
import { Footer } from './modules/components/Footer/Footer'
import styles from './App.module.css'
import './global.css'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'var(--font-primary)',
      primary: {
        fontFamily: 'var(--font-primary)',
      },
      secondary: {
        fontFamily: 'var(--font-secondary)',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: 'var(--font-secondary)',
            paddingTop: '10px',
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          title: {
            fontFamily: 'var(--font-secondary)',
          },
          subheader: {
            fontFamily: 'var(--font-secondary)',
          },
        },
      },
    },
  });


  return (
      <ThemeProvider theme={theme}>
        <GameProvider>
          <ShuffleProvider>
            <div className={styles.app}>
              <Header />
              <Body />
              <Footer />
            </div>
          </ShuffleProvider>
        </GameProvider>
      </ThemeProvider>
  )
}

export default App
