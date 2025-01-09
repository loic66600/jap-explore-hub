import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Map from "@/components/Map";
import AccommodationDetail from "@/components/AccommodationDetail";
import { fr } from 'date-fns/locale';

const Accommodation = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner les dates d'arrivée et de départ",
      });
      return;
    }

    setIsSearching(true);
    toast({
      title: "Recherche en cours",
      description: "Nous recherchons les meilleurs hébergements pour vous",
    });

    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Recherche terminée",
        description: "Voici les hébergements disponibles",
      });
    }, 2000);
  };

  // Sample accommodation data for demonstration
  const sampleAccommodation = {
    id: 1,
    name: "Park Hyatt Tokyo",
    type: "Hôtel de luxe",
    price: "50000",
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd"
    ],
    description: "Situé dans le quartier animé de Shinjuku, le Park Hyatt Tokyo offre une expérience de luxe unique avec une vue imprenable sur la ville et le Mont Fuji. Les chambres spacieuses allient élégance contemporaine et touches traditionnelles japonaises.",
    amenities: ["Wifi", "Restaurant", "Parking", "Onsen", "Breakfast"],
    cancellationPolicy: "Annulation gratuite jusqu'à 48h avant l'arrivée. Au-delà, le montant de la première nuit sera facturé."
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <img
          src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Ryokan traditionnel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Trouvez votre hébergement idéal au Japon
          </h1>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                  <SelectItem value="kyoto">Kyoto</SelectItem>
                  <SelectItem value="osaka">Osaka</SelectItem>
                  <SelectItem value="hiroshima">Hiroshima</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type of Accommodation */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type d'hébergement</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hôtel</SelectItem>
                  <SelectItem value="ryokan">Ryokan</SelectItem>
                  <SelectItem value="capsule">Hôtel capsule</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date d'arrivée</label>
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                locale={fr}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date de départ</label>
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                locale={fr}
                className="rounded-md border"
              />
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Voyageurs</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Adultes</label>
                  <Input type="number" min="1" defaultValue="2" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Enfants</label>
                  <Input type="number" min="0" defaultValue="0" />
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Budget par nuit</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economic">Moins de 10 000¥</SelectItem>
                  <SelectItem value="moderate">10 000¥ - 20 000¥</SelectItem>
                  <SelectItem value="luxury">Plus de 20 000¥</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="w-full md:w-auto min-w-[200px] animate-fade-up"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "Recherche en cours..." : "Rechercher"}
            </Button>
          </div>
        </div>

        {/* Map Section with Markers */}
        <div className="mt-8">
          <Map />
        </div>

        {/* Accommodation Details Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <AccommodationDetail accommodation={sampleAccommodation} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Accommodation;
