import { Hero } from '../components/homepage/Hero';
import { Categories } from '../components/homepage/Categories';

export const Home = () => {
  return (
    <div className="homepage-container">
      <Hero />
      <Categories />
    </div>
  );
};
