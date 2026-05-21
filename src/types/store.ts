import type { Product } from "./product";
import type { Combo } from "./combo";

export type CartItemType = 'product' | 'combo';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: CartItemType;
  discount?: number;
}

export interface AppState {
  cart: CartItem[];
  addToCart: (item: Product | Combo, quantity: number, type: CartItemType) => void;
  removeFromCart: (id: string | number, type: CartItemType) => void;
  updateQuantity: (id: string | number, type: CartItemType, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  isProductModalOpen: boolean;
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
}
