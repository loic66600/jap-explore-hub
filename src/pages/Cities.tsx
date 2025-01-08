import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const cities = [
  {
    id: 1,
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    description: "Découvrez une métropole futuriste mêlée de traditions ancestrales.",
    highlights: ["Akihabara", "Shibuya", "Marché de Tsukiji"],
    itinerary: "Tokyo en 3 jours : Akihabara, Shibuya, et le marché de Tsukiji."
  },
  {
    id: 2,
    name: "Kyoto",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    description: "La capitale culturelle du Japon, riche en temples et traditions.",
    highlights: ["Temple Kinkaku-ji", "Arashiyama", "Quartier de Gion"],
    itinerary: "Kyoto en 2 jours : Visite des temples et balade à Arashiyama."
  },
  {
    id: 3,
    name: "Osaka",
    image: "https://images.unsplash.com/photo-1590559899731-a382839e5549",
    description: "Savourez la gastronomie japonaise et profitez de la vie nocturne.",
    highlights: ["Château d'Osaka", "Dotonbori", "Kuromon Market"],
    itinerary: "Osaka en 2 jours : Exploration culinaire et découverte culturelle."
  },
  {
    id: 4,
    name: "Nara",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "Le berceau du Japon antique avec ses trésors historiques.",
    highlights: ["Temple Todai-ji", "Parc des Cerfs", "Sanctuaire Kasuga"],
    itinerary: "Nara en 1 jour : Rencontre avec les cerfs et visite des temples."
  },
  {
    id: 5,
    name: "Hokkaido",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e",
    description: "Un paradis naturel pour les amoureux de la nature et du ski.",
    highlights: ["Sapporo", "Parc national de Daisetsuzan", "Sources chaudes"],
    itinerary: "Hokkaido en 4 jours : Nature, ski et sources thermales."
  }
];

const CitiesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] flex items-center justify-center text-white"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Découvrez les Villes Incontournables du Japon
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-200"
          >
            Explorez les trésors culturels, historiques et modernes des grandes villes japonaises
          </motion.p>
        </div>
      </motion.section>

      {/* Cities Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={city.image} 
                    alt={city.name}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{city.name}</CardTitle>
                  <CardDescription>{city.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Points d'intérêt :</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {city.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-600">{highlight}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full group">
                    Explorer {city.name}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Itineraries Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Itinéraires Suggérés
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city, index) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="font-semibold text-xl mb-4">{city.name}</h3>
                <p className="text-gray-600">{city.itinerary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CitiesPage;