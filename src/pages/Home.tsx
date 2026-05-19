import { Hero } from '@/components/homepage/Hero';
import { Categories } from '@/components/homepage/Categories';
import { DailyOffers } from '@/components/homepage/DailyOffers';
import { ProductGrid } from '@/components/homepage/ProductGrid';
import { HowItWorks } from '@/components/homepage/HowItWorks';
import { CoverageSection } from '@/components/homepage/CoverageSection';
import { ScheduleSection } from '@/components/homepage/ScheduleSection';

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


