import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { HighlightText } from '@/components/ui/HighlightText';
import { useAppStore } from '@/store/useAppStore';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/product';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export const DailyOffers = () => {
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const openProductModal = useAppStore((state) => state.openProductModal);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('producto')
        .select('*')
        .or('discount.gt.0,oferta.neq.""');

      if (!error && data) {
        setOffers(data);
      }
      setLoading(false);
    };

    fetchOffers();
  }, []);

  if (loading || offers.length === 0) return null;

  return (
    <section className="py-20 overflow-hidden bg-app-bg">
      {/* Tira en movimiento superior */}
      <div className="relative flex overflow-x-hidden bg-primary py-2 sm:py-3 mb-6 border-y-4 border-black rotate-1 shadow-2xl">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-white text-sm sm:text-base lg:text-2xl font-black uppercase tracking-tighter mx-2 sm:mx-4 italic">
              💥 ¡OFERTAS DEL DÍA! 💥 DESCUENTOS INCREÍBLES 💥 SÓLO POR HOY 💥
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-300 mx-auto px-8 sm:px-12 relative group/nav">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          loop={offers.length > 4}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="offers-swiper pb-12! group/container"
        >
          {offers.map((product) => {
            const hasDiscount = product.discount && product.discount > 0;
            const oldPrice = hasDiscount ? product.price / (1 - product.discount / 100) : null;

            return (
              <SwiperSlide key={product.id} className="py-4 sm:py-8 ">
                <div className="group relative bg-app-card border-4 min-h-90 max-h-90 border-black p-3 sm:p-4 rounded-none flex flex-col h-full transform-gpu transition-[transform,opacity,box-shadow] duration-300 hover:scale-110 hover:-rotate-2 hover:z-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover/container:opacity-50 hover:opacity-100!">
                  {/* Etiqueta de oferta/descuento caricaturesca */}
                  {product.oferta ? (
                    <div className="absolute -top-4 -right-4 bg-primary text-white font-black p-2 border-2 border-black rotate-12 z-10 text-[10px] shadow-md uppercase">
                      {product.oferta}
                    </div>
                  ) : hasDiscount ? (
                    <div className="absolute -top-4 -right-4 bg-secondary text-black font-black p-2 border-2 border-black rotate-12 z-10 text-xs shadow-md">
                      -{product.discount}% OFF
                    </div>
                  ) : null}

                  <div className="overflow-hidden bg-white border-2 border-black mb-3 aspect-4/3">
                    <img
                      src={product.img_url || '/assets/images/placeholder.png'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-col flex-1 gap-1.5">
                    <h3 className="text-sm sm:text-base lg:text-xl font-black uppercase tracking-tighter text-app-text leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium line-clamp-1">{product.peso || ''}</p>

                    <div className="flex items-center gap-2 pt-1 mt-auto">
                      <HighlightText variant="success" className="text-base sm:text-lg lg:text-2xl font-black italic leading-none">
                        ${product.price.toFixed(2)}
                      </HighlightText>
                      {oldPrice && (
                        <span className="text-[10px] sm:text-xs text-error line-through font-bold">
                          ${oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => openProductModal({
                        ...product,
                      })}
                      className="w-full bg-primary text-white font-black py-1.5 sm:py-2 border-2 border-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-secondary hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                    >
                      ¡Lo quiero!
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Botones de navegación personalizados fuera del swiper */}
        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-12 md:h-12 bg-secondary border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-8 md:w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-12 md:h-12 bg-secondary border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-8 md:w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Tira en movimiento inferior (sentido contrario) */}
      <div className="relative flex overflow-x-hidden bg-secondary py-2 sm:py-3 mt-6 border-y-4 border-black -rotate-1 shadow-2xl">
        <div className="animate-marqueeReverse whitespace-nowrap flex items-center">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-black text-sm sm:text-base lg:text-2xl font-black uppercase tracking-tighter mx-2 sm:mx-4 italic">
              🛒 AHORRA DINERO 🛒 PRODUCTOS FRESCOS 🛒 CALIDAD GARANTIZADA 🛒
            </span>
          ))}
        </div>
      </div>
    </section>



  );
};
