import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import HowItWorks from './components/HowItWorks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="comofunciona" element={<HowItWorks />} />
          <Route path="precos" element={<Pricing />} />
          <Route path="sobre" element={<About />} />
          <Route path="contato" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
