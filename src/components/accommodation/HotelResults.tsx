import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Building, Star, MapPin, Wifi, Coffee, Bath, Car } from "lucide-react";
import { mockAccommodations } from "@/fixtures/accommodations";

interface HotelOffer {
  id: string;
  hotel: {
    name: string;
    rating?: string;
    hotelDistance?: {
      distance: number;
    };
    address?: {
      cityName: string;
    };
  };
  offers: Array<{
    id: string;
    checkInDate: string;
    checkOutDate: string;
    price: {
      total: string;
      currency: string;
    };
    room: {
      type: string;
      description?: {
        text: string;
      };
    };
  }>;
}

interface HotelResultsProps {
  hotels?: HotelOffer[];
  isLoading: boolean;
}

const HotelResults = ({ hotels, isLoading }: HotelResultsProps) => {
  const handleBooking = (hotelId: string, offerId: string) => {
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

  // Use mockAccommodations if no hotels are provided
  const accommodationsToDisplay = mockAccommodations;

  return (
    <div className="grid gap-6">
      {accommodationsToDisplay.map((accommodation) => (
        <div
          key={accommodation.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="grid md:grid-cols-3 gap-4">
            {/* Image Section */}
            <div className="relative h-64 md:h-full">
              <img
                src={accommodation.images[0]}
                alt={accommodation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{accommodation.rating}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 md:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{accommodation.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{accommodation.type}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{accommodation.address.full}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {accommodation.price}¥
                  </div>
                  <div className="text-sm text-gray-500">par nuit</div>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{accommodation.description}</p>

              {/* Amenities */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {accommodation.amenities.slice(0, 6).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    {amenity.toLowerCase().includes('wifi') && <Wifi className="w-4 h-4" />}
                    {amenity.toLowerCase().includes('petit-déjeuner') && <Coffee className="w-4 h-4" />}
                    {amenity.toLowerCase().includes('onsen') && <Bath className="w-4 h-4" />}
                    {amenity.toLowerCase().includes('parking') && <Car className="w-4 h-4" />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  {accommodation.policies.checkIn} - {accommodation.policies.checkOut}
                </div>
                <Button 
                  onClick={() => handleBooking(accommodation.id.toString(), "1")}
                  size="sm"
                >
                  Réserver maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelResults;