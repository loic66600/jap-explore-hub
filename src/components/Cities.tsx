import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface City {
  id: number;
  name: string;
  description: string;
  image: string;
  highlights: string[];
}

const cities: City[] = [
  {
    id: 1,
    name: 'Tokyo',
    description: 'Une métropole où tradition et modernité se rencontrent.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    highlights: ['Shibuya Crossing', 'Temple Senso-ji', 'Tour de Tokyo'],
  },
  {
    id: 2,
    name: 'Kyoto',
    description: "L'ancienne capitale impériale aux mille temples.",
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    highlights: ['Fushimi Inari', 'Kinkaku-ji', 'Quartier de Gion'],
  },
  {
    id: 3,
    name: 'Osaka',
    description: 'La capitale culinaire du Japon.',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549',
    highlights: ['Château d\'Osaka', 'Dotonbori', 'Kuromon Market'],
  },
];

const Cities = () => {
  const [activeCity, setActiveCity] = useState<City>(cities[0]);

  return (
    <section id="cities" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Destinations Populaires
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explorez les villes emblématiques du Japon, chacune offrant une expérience unique
            et inoubliable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cities.map((city) => (
            <motion.div
              key={city.id}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${
                activeCity.id === city.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveCity(city)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={city.image}
                  alt={city.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{city.name}</h3>
                  <p className="text-white/90">{city.description}</p>
                  <Link 
                    to={`/cities/${city.name.toLowerCase()}`}
                    className="mt-4"
                  >
                    <Button>Explorer {city.name}</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          key={activeCity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-12 p-8 bg-gray-50 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-4">{activeCity.name}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {activeCity.highlights.map((highlight, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm"
              >
                {highlight}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cities;