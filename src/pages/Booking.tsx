import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Map from "@/components/Map";
import { BookingForm } from "@/components/booking/BookingForm";

const Booking = () => {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!departureDate || !returnDate) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner les dates de départ et de retour",
      });
      return;
    }

    setIsSearching(true);
    toast({
      title: "Recherche en cours",
      description: "Nous recherchons les meilleures offres pour vous",
    });

    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Recherche terminée",
        description: "Voici les résultats de votre recherche",
      });
    }, 2000);
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
        />

        {/* Map Section */}
        <div className="mt-8">
          <Map type="booking" />
        </div>
      </div>
    </div>
  );
};

export default Booking;
