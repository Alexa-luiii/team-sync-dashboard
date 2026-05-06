import { useState, useEffect } from 'react';
import Home from './pages/Home';
import SplashScreen from './components/SplashScreen';
import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? <SplashScreen /> : <Home />}
    </div>
  );
}

export default App;
