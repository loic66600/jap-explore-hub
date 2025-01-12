import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plane, Clock, MapPin, Luggage, Coffee, Wifi, Monitor } from "lucide-react";
import Map from "@/components/Map";

interface FlightDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: {
    carrier: {
      name: string;
      logo?: string;
    };
    flightNumber: string;
    departure: {
      airport: string;
      iataCode: string;
      time: string;
      terminal?: string;
    };
    arrival: {
      airport: string;
      iataCode: string;
      time: string;
      terminal?: string;
    };
    duration: string;
    aircraft?: string;
    class: string;
    price: {
      total: string;
      currency: string;
    };
    services: {
      baggage: string;
      meal: boolean;
      entertainment: boolean;
      wifi: boolean;
    };
  };
}

const FlightDetailsModal = ({ isOpen, onClose, flight }: FlightDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Détails du vol {flight.flightNumber}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="summary" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Résumé</TabsTrigger>
            <TabsTrigger value="journey">Trajet</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="map">Carte</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  {flight.carrier.logo && (
                    <img 
                      src={flight.carrier.logo} 
                      alt={flight.carrier.name}
                      className="w-12 h-12 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{flight.carrier.name}</h3>
                    <p className="text-sm text-gray-600">Vol {flight.flightNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {flight.price.total} {flight.price.currency}
                  </p>
                  <p className="text-sm text-gray-600">Taxes incluses</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Classe</p>
                  <p className="font-semibold">{flight.class}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Durée</p>
                  <p className="font-semibold">{flight.duration}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Type d'appareil</p>
                  <p className="font-semibold">{flight.aircraft || "Non spécifié"}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="journey" className="mt-4">
            <div className="space-y-6">
              <div className="relative pb-8">
                <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gray-200" />
                <div className="flex items-start space-x-4">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Plane className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold">{flight.departure.airport} ({flight.departure.iataCode})</p>
                    <p className="text-sm text-gray-600">Départ: {flight.departure.time}</p>
                    {flight.departure.terminal && (
                      <p className="text-sm text-gray-600">Terminal: {flight.departure.terminal}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-start space-x-4">
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold">{flight.arrival.airport} ({flight.arrival.iataCode})</p>
                    <p className="text-sm text-gray-600">Arrivée: {flight.arrival.time}</p>
                    {flight.arrival.terminal && (
                      <p className="text-sm text-gray-600">Terminal: {flight.arrival.terminal}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-4">
                <Luggage className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">Bagages</p>
                  <p className="text-sm text-gray-600">{flight.services.baggage}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-4">
                <Coffee className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">Repas</p>
                  <p className="text-sm text-gray-600">
                    {flight.services.meal ? "Inclus" : "Non inclus"}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-4">
                <Monitor className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">Divertissement</p>
                  <p className="text-sm text-gray-600">
                    {flight.services.entertainment ? "Disponible" : "Non disponible"}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-center space-x-4">
                <Wifi className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">Wi-Fi</p>
                  <p className="text-sm text-gray-600">
                    {flight.services.wifi ? "Disponible" : "Non disponible"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-4">
            <div className="h-[400px] rounded-lg overflow-hidden">
              <Map type="flight" />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button onClick={() => {/* Implement booking logic */}}>
            Réserver maintenant
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightDetailsModal;