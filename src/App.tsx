import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Productos } from '@/pages/Productos';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { ProductDetails } from '@/pages/ProductDetails';
import { Combos } from '@/pages/Combos';
import { ComboDetails } from '@/pages/ComboDetails';
import { Administracion } from '@/pages/Administracion';
import { AdminGuard } from '@/components/auth/AdminGuard';
import CartDrawer from '@/components/cart/CartDrawer';
import { useAppStore } from '@/store/useAppStore';
import ProductModal from '@/components/ui/Modal/ProductModal';

const GlobalModals = () => {
  const { isProductModalOpen, closeProductModal, selectedProduct, addToCart } = useAppStore();

  const handleConfirmAdd = (quantity: number) => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
    }
  };

  return (
    <ProductModal
      isOpen={isProductModalOpen}
      onClose={closeProductModal}
      product={selectedProduct}
      onConfirm={handleConfirmAdd}
    />
  );
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <GlobalModals />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductDetails />} />
          <Route path="/combos" element={<Combos />} />
          <Route path="/combos/:id" element={<ComboDetails />} />
          <Route 
            path="/administracion" 
            element={
              <AdminGuard>
                <Administracion />
              </AdminGuard>
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
