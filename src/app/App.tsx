
import { ThemeProvider } from '../shared/layouts/lib/theme/ThemeContext'
import MainLayout from '../shared/layouts/MainLayout'
import PostList from '../widgets/PostList'
import './App.css'

function App() {
  const isLoading = false;
  const error = null;
  return (
    <ThemeProvider>
    <MainLayout>
      <PostList isLoading={isLoading} error={error} />
    </MainLayout>
    </ThemeProvider>
  )
    
}

export default App
