import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { HighlightText } from '@/components/ui/HighlightText';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface PlusTipsProps {
  text: string;
  key: string;
}

function PlusTips({ text, key }: PlusTipsProps) {
  return (
    <div key={key} className="flex items-center gap-2 text-sm font-semibold text-app-text" >
      <span className="bg-secondary text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">✓</span>{text}
    </div>
  );
}

const PLUSTIPS = [
  "Calidad Garantizada",
  "Confiabilidad",
  "Pago Contra Entrega",
  "Entrega Rápida",
]


// Import Swiper styles
const heroImages = [
  {
    url: "https://img.freepik.com/free-photo/delivery-man-with-red-cap-holding-paper-bag-with-food_23-2148505548.jpg",
    alt: "Repartidor con bolsa de comida"
  },
  {
    url: "https://img.freepik.com/free-photo/courier-holding-paper-bag-with-food-vegetables-home_23-2148505545.jpg",
    alt: "Entrega de vegetales frescos"
  },
  {
    url: "https://img.freepik.com/free-photo/side-view-delivery-man-with-face-mask-holding-box-boxes_23-2148780280.jpg",
    alt: "Repartidor con cajas"
  }
];
export const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between py-16 px-4 lg:px-0 gap-8 max-w-300 mx-auto overflow-visible">
      {/* Fondo de puntos decorativo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-dots text-primary/5 -z-10 pointer-events-none" />

      <div className="flex-1">
        <h1 className="text-5xl lg:text-6xl leading-[1.1] font-extrabold mb-6 text-app-text">
          Deja que tus <HighlightText variant="primary">compras</HighlightText> lleguen a ti
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-125">
          Compra tus productos frescos en línea sin salir de casa para preparar comida deliciosa con los mejores ingredientes.
        </p>

        {/* <SearchBar value="" onChange={() => {}} /> */}

        <div className="grid grid-cols-2 gap-4">
          {
            PLUSTIPS.map((text) => (<PlusTips key={text} text={text} />))
          }
        </div>
      </div>
      <div className="flex-1 relative w-full lg:max-w-125">
        <div className="relative w-full overflow-visible">
          <div className="overflow-hidden rounded-3xl border-4 border-app-card shadow-lg">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect={'fade'}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop={true}
              className="w-full h-full"
            >
              {heroImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-100 object-cover block"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Tarjetas flotantes sobre el slider */}
          {/* <div className="absolute top-[10%] -right-5 z-10 bg-app-card p-4 rounded-2xl shadow-xl flex flex-col items-center w-[120px] text-center border border-gray-100 dark:border-gray-800">
            <div className="text-4xl mb-2">🥬</div>
            <div className="card-info">
              <p className="text-[0.8rem] font-bold m-0 text-app-text">Espinaca Fresca</p>
              <HighlightText variant="success" className="text-[0.8rem] font-bold">$12.00</HighlightText>
            </div>
          </div>
          
          <div className="absolute bottom-[10%] -right-5 z-10 bg-app-card p-4 rounded-2xl shadow-xl flex flex-col items-center w-[120px] text-center border border-gray-100 dark:border-gray-800">
            <div className="text-4xl mb-2">🥕</div>
            <div className="card-info">
              <p className="text-[0.8rem] font-bold m-0 text-app-text">Zanahoria Fresca</p>
              <HighlightText variant="success" className="text-[0.8rem] font-bold">$9.00</HighlightText>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};