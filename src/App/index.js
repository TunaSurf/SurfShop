import { BrowserRouter as Router } from 'react-router-dom';

import NormalizeStyles from './NormalizeStyles';
import Navigation from './components/Navigation';
import Routes from './components/Routes';
import Modal from './components/Modal';

function App() {
  return (
    <Router>
      <NormalizeStyles />
      <Navigation />
      <Routes />
      <Modal />
    </Router>
  );
}

export default App;
