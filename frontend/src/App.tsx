import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import HowItWorks from './components/HowItWorks';
import axios from 'axios';

// 🔹 Importando um componente 404 para páginas não encontradas
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  useEffect(() => {
    const pingAPI = () => {
      axios
        .get('https://quantitativo-bim.onrender.com/')
        .then(() => console.log('🔄 Backend Pingado!'))
        .catch(() => console.warn('⚠️ Erro ao pingar backend'));
    };

    // 🔄 Executa a cada 4 minutos (Render desliga após 15 minutos)
    const interval = setInterval(pingAPI, 4 * 60 * 1000);

    // 🔹 Executa o ping assim que o app carrega
    pingAPI();

    return () => clearInterval(interval); // 🛑 Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <Router basename="/">
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="como-funciona" element={<HowItWorks />} />
            <Route path="precos" element={<Pricing />} />
            <Route path="sobre" element={<About />} />
            <Route path="contato" element={<Contact />} />
            {/* 🔹 Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
