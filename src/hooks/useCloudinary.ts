import { useState } from 'react';

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

export const useCloudinary = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploadImage = async (file: File): Promise<CloudinaryResponse | null> => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Error al subir la imagen a Cloudinary');
      }

      const data = await response.json();
      return {
        secure_url: data.secure_url,
        public_id: data.public_id,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, error };
};
