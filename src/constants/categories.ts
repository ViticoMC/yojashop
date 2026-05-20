export const PRODUCT_CATEGORIES = [
  { id: 'frutas', name: 'Frutas y Verduras', icon: 'Apple' },
  { id: 'lacteos', name: 'Lácteos y Huevos', icon: 'Milk' },
  { id: 'panaderia', name: 'Panadería y Dulces', icon: 'Croissant' },
  { id: 'carnes', name: 'Carnes y Embutidos', icon: 'Beef' },
  { id: 'despensa', name: 'Despensa y Abarrotes', icon: 'PackageSearch' },
] as const;

export type CategoryId = typeof PRODUCT_CATEGORIES[number]['id'];
export type CategoryName = typeof PRODUCT_CATEGORIES[number]['name'];

export const getCategoryName = (id: string) => {
  return PRODUCT_CATEGORIES.find(c => c.id === id)?.name || id;
};
