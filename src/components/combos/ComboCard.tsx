import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { HighlightText } from '@/components/ui/HighlightText';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';
import { Eye, ShoppingCart } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import type { Combo } from '@/types/combo';

interface ComboCardProps {
  combo: Combo;
}

export const ComboCard: React.FC<ComboCardProps> = ({ combo }) => {
  const navigate = useNavigate();
  const openComboModal = useAppStore((state) => state.openComboModal);

  return (
    <div className="group relative bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(239,68,68,1)] transition-all duration-300 hover:-translate-y-2 flex flex-col h-full group-hover/container:grayscale group-hover/container:opacity-50 hover:!grayscale-0 hover:!opacity-100">
      {/* Discount Badge */}
      {combo.discount > 0 && (
        <div className="absolute -top-3 -right-3 bg-secondary text-black font-black px-3 py-1 border-2 border-black rotate-12 z-10 shadow-md text-sm">
          -{combo.discount}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-video border-4 border-black overflow-hidden mb-4 bg-gray-100">
        <img
          src={optimizeCloudinaryUrl(combo.foto_url, 400)}
          alt={combo.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-2 line-clamp-1">
          {combo.nombre}
        </h3>
        <p className="text-xs font-bold text-gray-600 uppercase italic line-clamp-2 mb-4 flex-1">
          {combo.descriptiom}
        </p>

        <div className="flex items-center justify-between mb-4 border-t-2 border-black pt-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black italic leading-none">${combo.price.toFixed(2)}</span>
            {combo.discount > 0 && (
              <span className="text-xs text-error line-through font-bold italic">
                ${(combo.price * (1 + combo.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <HighlightText variant="primary" className="text-[10px] py-0.5 px-2">
            ¡SÚPER PACK!
          </HighlightText>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <Button
            variant="black"
            size="sm"
            className="w-full text-xs h-10 group/btn"
            onClick={() => openComboModal(combo)}
          >
            <span className="flex items-center justify-center gap-2">
              {combo.cta}
              <ShoppingCart size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs h-10 group/view"
            onClick={() => navigate(`/combos/${combo.id}`)}
          >
            <span className="flex items-center justify-center gap-2">
              VER DETALLES
              <Eye size={14} className="group-hover/view:scale-125 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
