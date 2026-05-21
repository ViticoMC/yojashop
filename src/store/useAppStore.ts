import { create } from 'zustand';
import type { AppState, CartItem } from '@/types/store';

export const useAppStore = create<AppState>((set, get) => ({
  // Cart Logic
  cart: [],
  addToCart: (item, quantity, type) => {
    const currentCart = get().cart;
    const existingItem = currentCart.find((cartItem) => cartItem.id === item.id && cartItem.type === type);

    if (existingItem) {
      set({
        cart: currentCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.type === type
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        ),
      });
    } else {
      const newItem: CartItem = {
        id: item.id,
        name: 'name' in item ? item.name : item.nombre,
        price: item.price,
        image: 'img_url' in item ? (item.img_url || "") : item.foto_url,
        quantity,
        type
      };
      set({ cart: [...currentCart, newItem] });
    }
  },
  removeFromCart: (itemId, type) => {
    set({ cart: get().cart.filter((item) => !(item.id === itemId && item.type === type)) });
  },
  updateQuantity: (itemId, type, delta) => {
    const currentCart = get().cart;
    set({
      cart: currentCart.map((item) =>
        item.id === itemId && item.type === type
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ),
    });
  },
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  // Modal Logic
  isProductModalOpen: false,
  selectedProduct: null,
  openProductModal: (product) => set({ selectedProduct: product, isProductModalOpen: true }),
  closeProductModal: () => set({ isProductModalOpen: false, selectedProduct: null }),
  isComboModalOpen: false,
  selectedCombo: null,
  openComboModal: (combo) => set({ selectedCombo: combo, isComboModalOpen: true }),
  closeComboModal: () => set({ isComboModalOpen: false, selectedCombo: null }),
}));
