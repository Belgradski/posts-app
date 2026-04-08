
import { ThemeProvider } from '../shared/layouts/lib/theme/ThemeContext'
import { Provider } from 'react-redux';
import { store } from './providers/store';
import { AppRouter } from './providers/router';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}

export default App;