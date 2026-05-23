import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
import { useAppStore } from '@/store/useAppStore';
import ProductModal from '@/components/ui/Modal/ProductModal';
import ComboModal from '@/components/ui/Modal/ComboModal';
import { Toaster } from 'sonner';
import { AdminStats } from '@/components/admin/AdminStats';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminCombos } from '@/components/admin/AdminCombos';
import { AdminLogros } from '@/components/admin/AdminLogros';
import { AdminOrders } from '@/components/admin/AdminOrders';

import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import CartDrawer from './components/cart/CartDrawer';

const GlobalModals = () => {
  const {
    isProductModalOpen,
    closeProductModal,
    selectedProduct,
    isComboModalOpen,
    closeComboModal,
    selectedCombo,
    addToCart
  } = useAppStore();

  const handleProductConfirm = (quantity: number) => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity, 'product');
    }
  };

  const handleComboConfirm = (quantity: number) => {
    if (selectedCombo) {
      addToCart(selectedCombo, quantity, 'combo');
    }
  };

  return (
    <>
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
        product={selectedProduct}
        onConfirm={handleProductConfirm}
      />
      <ComboModal
        isOpen={isComboModalOpen}
        onClose={closeComboModal}
        combo={selectedCombo}
        onConfirm={handleComboConfirm}
      />
    </>
  );
};



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <Toaster position="top-right" richColors closeButton theme="light" />
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
          >
            <Route index element={<AdminStats />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="combos" element={<AdminCombos />} />
            <Route path="logros" element={<AdminLogros />} />
            <Route path="pedidos" element={<AdminOrders />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
