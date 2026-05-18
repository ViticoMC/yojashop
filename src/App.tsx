import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Productos } from './pages/Productos';
import { ProductDetails } from './pages/ProductDetails';
import { Combos } from './pages/Combos';
import { ComboDetails } from './pages/ComboDetails';
import { Administracion } from './pages/Administracion';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductDetails />} />
          <Route path="/combos" element={<Combos />} />
          <Route path="/combos/:id" element={<ComboDetails />} />
          <Route path="/administracion" element={<Administracion />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
