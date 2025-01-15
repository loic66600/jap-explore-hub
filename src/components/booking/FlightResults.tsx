import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Plane, Clock, Calendar } from "lucide-react";
import { mockFlights } from "@/fixtures/flights";

interface FlightResult {
  id: string;
  itineraries: Array<{
    duration: string;
    segments: Array<{
      departure: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      carrierCode: string;
      number: string;
    }>;
  }>;
  price: {
    total: string;
    currency: string;
  };
}

interface FlightResultsProps {
  flights: FlightResult[];
  isLoading: boolean;
}

const FlightResults = ({ flights = mockFlights, isLoading }: FlightResultsProps) => {
  const handleBooking = (flightId: string) => {
    toast({
      title: "Réservation initiée",
      description: "Redirection vers le formulaire de paiement...",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!flights?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun vol trouvé pour ces critères.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          {flight.itineraries.map((itinerary, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-4 mb-2">
                <Plane className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {itinerary.segments[0].departure.iataCode} →{" "}
                      {itinerary.segments[itinerary.segments.length - 1].arrival.iataCode}
                    </span>
                    <span className="text-sm text-gray-500">
                      Vol {itinerary.segments[0].carrierCode}
                      {itinerary.segments[0].number}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Clock className="w-4 h-4" />
                <span>Durée: {itinerary.duration}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Départ: {new Date(itinerary.segments[0].departure.at).toLocaleString('fr-FR')}
                </span>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-lg font-bold text-primary">
              {flight.price.total} {flight.price.currency}
            </div>
            <Button onClick={() => handleBooking(flight.id)} size="sm">
              Réserver
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;