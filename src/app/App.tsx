
import { ThemeProvider } from '../shared/layouts/lib/theme/ThemeContext'
import './App.css'
import { AppRouter } from './providers/router';

function App() {

  return (
    <ThemeProvider>
      <AppRouter/>
    </ThemeProvider>
  )
    
}

export default App
