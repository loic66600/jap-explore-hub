import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Users, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Map from '@/components/Map';
import Navigation from '@/components/Navigation';

interface CityData {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  bannerImage: string;
  population: string;
  bestTime: string;
  attractions: number;
  mainAttractions: Array<{
    name: string;
    description: string;
    image: string;
  }>;
  itineraries: Array<{
    days: number;
    description: string;
  }>;
  images: string[];
  transport: string;
  food: string[];
}

const citiesData: Record<number, CityData> = {
  1: {
    id: 1,
    name: 'Tokyo',
    title: 'Bienvenue à Tokyo',
    subtitle: 'Découvrez les trésors culturels, historiques et modernes de cette ville.',
    description: 'Une métropole alliant modernité et traditions millénaires.',
    bannerImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    population: '37 millions',
    bestTime: 'Mars-Avril (Sakura) / Octobre-Novembre',
    attractions: 100,
    mainAttractions: [
      {
        name: 'Shibuya Crossing',
        description: "L'intersection la plus célèbre du monde.",
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
      },
      {
        name: 'Akihabara',
        description: 'Le paradis des amateurs de mangas et de gadgets électroniques.',
        image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d',
      },
      {
        name: 'Temple Sensō-ji',
        description: 'Un lieu de spiritualité au cœur de la ville.',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
      },
    ],
    itineraries: [
      { days: 1, description: 'Shibuya, Harajuku et Shinjuku' },
      { days: 2, description: 'Asakusa, Ueno et Akihabara' },
      { days: 3, description: 'Odaiba, Tokyo Tower et Roppongi' },
    ],
    images: [
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
      'https://images.unsplash.com/photo-1548189797-aa4804b7e996',
      'https://images.unsplash.com/photo-1542931287-023b922fa89b',
    ],
    transport: 'Utilisation de la carte Suica/Pasmo recommandée',
    food: ['Sushi', 'Ramen', 'Tempura'],
  },
  2: {
    id: 2,
    name: 'Kyoto',
    title: 'Plongez dans la tradition de Kyoto',
    subtitle: 'Découvrez les trésors culturels, historiques et modernes de cette ville.',
    description: 'Capitale culturelle du Japon, riche en temples et jardins.',
    bannerImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    population: '1.46 millions',
    bestTime: 'Avril (Sakura) / Octobre (Automne)',
    attractions: 50,
    mainAttractions: [
      {
        name: 'Kinkaku-ji',
        description: 'Le pavillon d\'or, un trésor national.',
        image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
      },
      {
        name: 'Arashiyama Bamboo Grove',
        description: 'Une promenade dans une forêt magique.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      },
      {
        name: 'Fushimi Inari-taisha',
        description: 'Les célèbres torii rouges.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      },
    ],
    itineraries: [
      { days: 1, description: 'Visite des temples et balade à Arashiyama.' },
      { days: 2, description: 'Découverte de Gion et du marché de Nishiki.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    ],
    transport: 'Bus et vélo recommandés',
    food: ['Kaiseki', 'Yudofu', 'Matcha'],
  },
  3: {
    id: 3,
    name: 'Osaka',
    title: 'Savourez la gastronomie d\'Osaka',
    subtitle: 'Découvrez les trésors culturels, historiques et modernes de cette ville.',
    description: 'Ville dynamique réputée pour sa gastronomie et sa vie nocturne.',
    bannerImage: 'https://images.unsplash.com/photo-1590559899731-a382839e5549',
    population: '2.75 millions',
    bestTime: 'Mars-Mai / Septembre-Novembre',
    attractions: 80,
    mainAttractions: [
      {
        name: 'Château d\'Osaka',
        description: 'Un symbole historique entouré de magnifiques jardins.',
        image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549',
      },
      {
        name: 'Dotonbori',
        description: 'Quartier animé pour savourer des spécialités comme les takoyaki.',
        image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549',
      },
      {
        name: 'Universal Studios Japan',
        description: 'Un parc d\'attractions pour toute la famille.',
        image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549',
      },
    ],
    itineraries: [
      { days: 1, description: 'Découverte de Dotonbori et du château.' },
      { days: 2, description: 'Visite de Universal Studios et shopping.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1590559899731-a382839e5549',
      'https://images.unsplash.com/photo-1590559899731-a382839e5549',
      'https://images.unsplash.com/photo-1590559899731-a382839e5549',
    ],
    transport: 'Métro pour se déplacer rapidement',
    food: ['Takoyaki', 'Okonomiyaki', 'Kushikatsu'],
  },
  4: {
    id: 4,
    name: 'Nara',
    title: 'Découvrez l\'histoire de Nara',
    subtitle: 'Découvrez les trésors culturels, historiques et modernes de cette ville.',
    description: 'Berceau historique du Japon et paradis des amoureux de la nature.',
    bannerImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    population: '360,000',
    bestTime: 'Avril (Sakura) / Automne',
    attractions: 30,
    mainAttractions: [
      {
        name: 'Temple Tōdai-ji',
        description: 'Abritant une statue géante de Bouddha.',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      },
      {
        name: 'Parc de Nara',
        description: 'Célèbre pour ses cerfs en liberté.',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      },
      {
        name: 'Mont Wakakusa',
        description: 'Une randonnée avec une vue spectaculaire sur la ville.',
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      },
    ],
    itineraries: [
      { days: 1, description: 'Rencontre avec les cerfs et visite des temples.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    ],
    transport: 'Bus et vélo recommandés',
    food: ['Kakinoha-zushi', 'Nara-zuke', 'Sake'],
  },
  5: {
    id: 5,
    name: 'Hokkaido',
    title: 'Explorez la nature de Hokkaido',
    subtitle: 'Découvrez les trésors culturels, historiques et modernes de cette ville.',
    description: 'Destination idéale pour les amateurs de plein air et de sports d\'hiver.',
    bannerImage: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
    population: '5.4 millions',
    bestTime: 'Décembre-Février (Hiver) / Juillet-Août (Été)',
    attractions: 40,
    mainAttractions: [
      {
        name: 'Parc national de Daisetsuzan',
        description: 'Un paradis pour les amoureux de la nature.',
        image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
      },
      {
        name: 'Sapporo Snow Festival',
        description: 'Un événement magique en hiver.',
        image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
      },
      {
        name: 'Ferme Tomita',
        description: 'Des champs de lavande à perte de vue en été.',
        image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
      },
    ],
    itineraries: [
      { days: 4, description: 'Nature, ski et sources thermales.' },
    ],
    images: [
      'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
      'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
      'https://images.unsplash.com/photo-1542640244-7e672d6cef4e',
    ],
    transport: 'Location de voiture recommandée',
    food: ['Ramen de Sapporo', 'Crabe', 'Fromage de Hokkaido'],
  },
};

const CityDetail = () => {
  const { cityId } = useParams();
  const city = citiesData[Number(cityId)];

  if (!city) {
    return <div>Ville non trouvée</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Banner */}
      <div className="relative h-[60vh] w-full">
        <img
          src={city.bannerImage}
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-center"
          >
            {city.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-center max-w-2xl"
          >
            {city.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex items-center space-x-4 p-6">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="text-xl font-semibold">{city.population}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center space-x-4 p-6">
                <Calendar className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Meilleure période</p>
                  <p className="text-xl font-semibold">{city.bestTime}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center space-x-4 p-6">
                <MapPin className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Attractions</p>
                  <p className="text-xl font-semibold">{city.attractions}+</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Attractions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Attractions Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {city.mainAttractions.map((attraction, index) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{attraction.name}</h3>
                    <p className="text-gray-600">{attraction.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Itinéraires Suggérés</h2>
          <div className="space-y-4">
            {city.itineraries.map((itinerary, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Jour {itinerary.days}
                  </h3>
                  <p className="text-gray-600">{itinerary.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Explorer {city.name}</h2>
          <div className="h-[500px] rounded-xl overflow-hidden">
            <Map type="cities" />
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Galerie</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {city.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="aspect-[16/9] relative rounded-xl overflow-hidden">
                      <img
                        src={image}
                        alt={`${city.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Informations Pratiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Transport</h3>
                </div>
                <p className="text-gray-600">{city.transport}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Utensils className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Spécialités Culinaires</h3>
                </div>
                <ul className="list-disc list-inside text-gray-600">
                  {city.food.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Link to="/booking">
            <Button size="lg" className="mr-4">
              Réserver votre séjour à {city.name}
            </Button>
          </Link>
          <Link to="/cities">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux villes
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CityDetail;
