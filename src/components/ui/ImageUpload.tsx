import React, { useRef, useState } from 'react';
import { useCloudinary } from '@/hooks/useCloudinary';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ImageUploadProps {
  onUploadSuccess: (url: string, id: string) => void;
  defaultValue?: string;
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUploadSuccess, 
  defaultValue, 
  label = "Imagen del Producto" 
}) => {
  const { uploadImage, uploading, error } = useCloudinary();
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    const result = await uploadImage(file);
    if (result) {
      onUploadSuccess(result.secure_url, result.public_id);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadSuccess("", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-black">
        {label}
      </label>
      
      <div className="relative group">
        <div 
          className={`
            relative w-full h-48 border-4 border-black border-dashed flex flex-col items-center justify-center transition-all overflow-hidden
            ${preview ? 'border-solid' : 'bg-gray-50 hover:bg-primary/5'}
          `}
        >
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  type="button" 
                  variant="black" 
                  size="sm" 
                  onClick={handleRemove}
                  className="scale-90"
                >
                  <X size={16} className="mr-2" /> CAMBIAR
                </Button>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-primary transition-colors"
            >
              {uploading ? (
                <Loader2 size={40} className="animate-spin" />
              ) : (
                <Upload size={40} />
              )}
              <span className="font-black text-xs uppercase italic">
                {uploading ? 'SUBIENDO...' : 'SUBIR ARCHIVO'}
              </span>
            </button>
          )}

          {uploading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Loader2 size={32} className="animate-spin text-primary" />
                <span className="font-black text-[10px] uppercase italic">Procesando...</span>
              </div>
            </div>
          )}
        </div>

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-[10px] text-error font-bold uppercase italic mt-1">
          ⚠️ {error}
        </p>
      )}

      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 italic uppercase">
        <ImageIcon size={12} />
        <span>PNG, JPG o WEBP (Máx. 5MB)</span>
      </div>
    </div>
  );
};
