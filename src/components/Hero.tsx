import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import FlightDetailsModal from './details/FlightDetailsModal';
import AccommodationDetailsModal from './details/AccommodationDetailsModal';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [showAccommodationDetails, setShowAccommodationDetails] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Sample data for demonstration
  const sampleFlight = {
    carrier: {
      name: "Japan Airlines",
      logo: "https://example.com/jal-logo.png"
    },
    flightNumber: "JL123",
    departure: {
      airport: "Paris Charles de Gaulle",
      iataCode: "CDG",
      time: "10:30",
      terminal: "2E"
    },
    arrival: {
      airport: "Tokyo Haneda",
      iataCode: "HND",
      time: "08:45",
      terminal: "3"
    },
    duration: "11h 15m",
    aircraft: "Boeing 787-9",
    class: "Économique",
    price: {
      total: "750",
      currency: "EUR"
    },
    services: {
      baggage: "23kg inclus",
      meal: true,
      entertainment: true,
      wifi: true
    }
  };

  const sampleAccommodation = {
    name: "Ryokan Traditional",
    type: "Ryokan",
    rating: 4.8,
    totalReviews: 245,
    description: "Un ryokan authentique offrant une expérience japonaise traditionnelle",
    history: "Construit en 1887, ce ryokan a accueilli de nombreux visiteurs illustres",
    address: {
      full: "1-2-3 Asakusa, Taito-ku, Tokyo 111-0032",
      distance: {
        station: "5 minutes à pied de la station Asakusa",
        attractions: [
          "Temple Senso-ji (8 min à pied)",
          "Tokyo Skytree (15 min à pied)"
        ]
      }
    },
    amenities: [
      "Wi-Fi gratuit",
      "Onsen privé",
      "Petit-déjeuner traditionnel",
      "Service en chambre",
      "Jardin japonais"
    ],
    images: [
      "https://example.com/ryokan1.jpg",
      "https://example.com/ryokan2.jpg",
      "https://example.com/ryokan3.jpg"
    ],
    rooms: [
      {
        type: "Chambre Traditionnelle",
        description: "Chambre de style japonais avec tatamis et futons",
        price: "30,000¥ / nuit",
        images: [
          "https://example.com/room1.jpg",
          "https://example.com/room2.jpg"
        ]
      }
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      cancellation: "Gratuite jusqu'à 48h avant l'arrivée"
    },
    reviews: [
      {
        author: "Marie D.",
        rating: 5,
        comment: "Une expérience inoubliable dans un cadre authentique",
        date: "2024-02-15"
      }
    ]
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div
          className={`space-y-6 transform transition-all duration-700 ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Découvrez le Japon
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Voyagez au cœur de la culture japonaise avec des expériences uniques et authentiques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => setShowFlightDetails(true)}
            >
              Voir les vols
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
              onClick={() => setShowAccommodationDetails(true)}
            >
              Voir les hébergements
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 rounded-full bg-white/50" />
      </div>

      {/* Modals */}
      <FlightDetailsModal
        isOpen={showFlightDetails}
        onClose={() => setShowFlightDetails(false)}
        flight={sampleFlight}
      />
      <AccommodationDetailsModal
        isOpen={showAccommodationDetails}
        onClose={() => setShowAccommodationDetails(false)}
        accommodation={sampleAccommodation}
      />
    </div>
  );
};

export default Hero;