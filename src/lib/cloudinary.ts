/**
 * Optimiza una URL de Cloudinary agregando parámetros de transformación
 * @param url URL original de Cloudinary
 * @param width Ancho deseado (opcional)
 * @returns URL optimizada con f_auto, q_auto y transformaciones
 */
export const optimizeCloudinaryUrl = (url: string, width: number = 800): string => {
  if (!url || !url.includes('cloudinary.com')) return url;

  // Si ya tiene transformaciones, evitamos duplicar lógica compleja
  // pero intentamos insertar después de /upload/
  if (url.includes('/upload/')) {
    const parts = url.split('/upload/');
    const transformation = `f_auto,q_auto,w_${width}`;
    
    // Si la segunda parte ya empieza con transformaciones (v12345...), las mantenemos
    return `${parts[0]}/upload/${transformation}/${parts[1]}`;
  }

  return url;
};
