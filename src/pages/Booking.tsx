import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Map from "@/components/Map";
import { BookingForm } from "@/components/booking/BookingForm";
import { useAmadeusFlights } from "@/hooks/useAmadeus";
import { format } from 'date-fns';

const Booking = () => {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const { data: flightsData, isLoading: isLoadingFlights } = useAmadeusFlights(
    origin,
    destination,
    departureDate ? format(departureDate, 'yyyy-MM-dd') : '',
    "1"
  );

  const handleSearch = () => {
    if (!departureDate || !returnDate || !origin || !destination) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }

    setIsSearching(true);
    toast({
      title: "Recherche en cours",
      description: "Nous recherchons les meilleurs vols pour vous",
    });

    // Les résultats seront automatiquement mis à jour grâce à useQuery
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <img
          src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Shinkansen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Réservez votre voyage au Japon
          </h1>
        </div>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto px-4 py-8">
        <BookingForm
          onSearch={handleSearch}
          isSearching={isSearching}
          departureDate={departureDate}
          returnDate={returnDate}
          setDepartureDate={setDepartureDate}
          setReturnDate={setReturnDate}
          setOrigin={setOrigin}
          setDestination={setDestination}
        />

        {/* Results Section */}
        {isLoadingFlights ? (
          <div className="mt-8 text-center">
            <p>Chargement des vols...</p>
          </div>
        ) : flightsData ? (
          <div className="mt-8 grid gap-4">
            {/* Afficher les résultats des vols ici */}
            <pre className="bg-white p-4 rounded-lg shadow">
              {JSON.stringify(flightsData, null, 2)}
            </pre>
          </div>
        ) : null}

        {/* Map Section */}
        <div className="mt-8">
          <Map type="booking" />
        </div>
      </div>
    </div>
  );
};

export default Booking;