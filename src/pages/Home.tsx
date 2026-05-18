import { Hero } from '@/components/homepage/Hero';
import { Categories } from '@/components/homepage/Categories';
import { DailyOffers } from '@/components/homepage/DailyOffers';
import { ProductGrid } from '@/components/homepage/ProductGrid/ProductGrid';
import { HowItWorks } from '@/components/homepage/HowItWorks/HowItWorks';
import { CoverageSection } from '@/components/homepage/Coverage/CoverageSection';
import { ScheduleSection } from '@/components/homepage/Schedule/ScheduleSection';

export const Home = () => {
  return (
    <>
      <Hero />
      <DailyOffers />
      <ProductGrid />
      <HowItWorks />
      <ScheduleSection />
      <CoverageSection />
      <Categories />
    </>
  );
};


