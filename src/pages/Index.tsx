import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Cities from '@/components/Cities';
import Map from '@/components/Map';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Cities />
      <Map />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;