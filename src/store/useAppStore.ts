import { create } from 'zustand';

interface Product {
  id: number | string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  // Cart State
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number | string) => void;
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
  addToCart: (product, quantity) => {
    const currentCart = get().cart;
    const existingItem = currentCart.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cart: currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ cart: [...currentCart, { ...product, quantity }] });
    }
  },
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.id !== productId) });
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
