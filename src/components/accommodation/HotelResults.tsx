import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Building, Star, MapPin } from "lucide-react";

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
  hotels: HotelOffer[];
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

  if (!hotels?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun hébergement trouvé pour ces critères.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4">
            <Building className="w-6 h-6 text-primary flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{hotel.hotel.name}</h3>
                {hotel.hotel.rating && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{hotel.hotel.rating}/5</span>
                  </div>
                )}
              </div>

              {(hotel.hotel.address?.cityName || hotel.hotel.hotelDistance?.distance) && (
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {hotel.hotel.address?.cityName}
                    {hotel.hotel.hotelDistance && ` (${hotel.hotel.hotelDistance.distance}km du centre)`}
                  </span>
                </div>
              )}

              <div className="mt-4 space-y-4">
                {hotel.offers.map((offer) => (
                  <div key={offer.id} className="border-t pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{offer.room.type}</h4>
                        {offer.room.description?.text && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {offer.room.description.text}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {offer.price.total} {offer.price.currency}
                        </div>
                        <div className="text-xs text-gray-500">par nuit</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-600">
                        Du {new Date(offer.checkInDate).toLocaleDateString('fr-FR')} au{' '}
                        {new Date(offer.checkOutDate).toLocaleDateString('fr-FR')}
                      </div>
                      <Button 
                        onClick={() => handleBooking(hotel.id, offer.id)}
                        size="sm"
                      >
                        Réserver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelResults;