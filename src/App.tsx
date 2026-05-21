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
import { ComboDetails } from '@/pages/shop/ComboDetails';
import { Administracion } from '@/pages/Administracion';
import { AdminGuard } from '@/components/auth/AdminGuard';
import CartDrawer from '@/components/cart/CartDrawer';
import { useAppStore } from '@/store/useAppStore';
import ProductModal from '@/components/ui/Modal/ProductModal';

const GlobalModals = () => {
  const { isProductModalOpen, closeProductModal, selectedProduct, addToCart } = useAppStore();

  const handleConfirmAdd = (quantity: number) => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity, 'product');
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

import { AdminStats } from '@/components/admin/AdminStats';
import { AdminUsers } from '@/components/admin/AdminUsers';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminCombos } from '@/components/admin/AdminCombos';
import { AdminLogros } from '@/components/admin/AdminLogros';

import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';

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
          >
            <Route index element={<AdminStats />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="combos" element={<AdminCombos />} />
            <Route path="logros" element={<AdminLogros />} />
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
