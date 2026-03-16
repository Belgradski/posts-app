import { ThemeProvider } from '../shared/layouts/lib/theme/ThemeContext'
import MainLayout from '../shared/layouts/MainLayout'
import Button from '../shared/ui/Button/Button'
import PostList from '../widgets/PostList'
import './App.css'

function App() {
  

  return (
    <ThemeProvider>
    <MainLayout>
      <PostList/>
    </MainLayout>
    </ThemeProvider>
  )
    
}

export default App
