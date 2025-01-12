import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Map from "@/components/Map";
import { BookingForm } from "@/components/booking/BookingForm";
import FlightResults from "@/components/booking/FlightResults";
import { useAmadeusFlights } from "@/hooks/useAmadeus";
import { format } from 'date-fns';
import { supabase } from "@/integrations/supabase/client";

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

  // Filtrer uniquement les vols vers le Japon
  const japanAirports = ['HND', 'NRT', 'KIX', 'ITM', 'FUK', 'CTS'];
  const filteredFlights = flightsData?.data?.filter(flight => 
    japanAirports.includes(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode)
  );

  const handleSearch = async () => {
    if (!departureDate || !returnDate || !origin || !destination) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }

    setIsSearching(true);
    
    try {
      // Sauvegarder la recherche dans l'historique
      const { error } = await supabase
        .from('search_history')
        .insert({
          search_type: 'flight',
          search_params: {
            origin,
            destination,
            departureDate: format(departureDate, 'yyyy-MM-dd'),
            returnDate: format(returnDate, 'yyyy-MM-dd')
          }
        });

      if (error) throw error;

      toast({
        title: "Recherche en cours",
        description: "Nous recherchons les meilleurs vols pour vous",
      });
    } catch (error) {
      console.error('Error saving search history:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <img
          src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Avion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Réservez votre vol pour le Japon
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
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-secondary mb-4">Résultats de votre recherche</h2>
          <FlightResults 
            flights={filteredFlights || []} 
            isLoading={isLoadingFlights} 
          />
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <Map type="booking" />
        </div>
      </div>
    </div>
  );
};

export default Booking;