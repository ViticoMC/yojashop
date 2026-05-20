import { create } from 'zustand';

interface Product {
  id: number | string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
}

interface Combo {
  id: number | string;
  nombre: string;
  price: number;
  foto_url: string;
  descriptiom: string;
}

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'product' | 'combo';
}

interface AppState {
  // Cart State
  cart: CartItem[];
  addToCart: (item: Product | Combo, quantity: number, type: 'product' | 'combo') => void;
  removeFromCart: (itemId: number | string) => void;
  updateQuantity: (itemId: number | string, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Product Modal State
  isProductModalOpen: boolean;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
}

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
        image: 'image' in item ? item.image : item.foto_url,
        quantity,
        type
      };
      set({ cart: [...currentCart, newItem] });
    }
  },
  removeFromCart: (itemId) => {
    set({ cart: get().cart.filter((item) => item.id !== itemId) });
  },
  updateQuantity: (itemId: number | string, delta: number) => {
    const currentCart = get().cart;
    set({
      cart: currentCart.map((item) =>
        item.id === itemId
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
}));
