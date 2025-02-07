import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Cities from '@/components/Cities';
import CustomMap from '@/components/CustomMap';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Cities />
      <CustomMap type="cities" />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;