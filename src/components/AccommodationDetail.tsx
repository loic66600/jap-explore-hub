import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { 
  Wifi, 
  Utensils, 
  Car, 
  Star,
  Bath,
  Coffee
} from "lucide-react";

interface AccommodationDetailProps {
  accommodation: {
    id: number;
    name: string;
    type: string;
    price: string;
    rating: number;
    images: string[];
    description: string;
    amenities: string[];
    cancellationPolicy: string;
  };
}

const AccommodationDetail = ({ accommodation }: AccommodationDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBooking = () => {
    toast({
      title: "Réservation initiée",
      description: "Redirection vers le formulaire de paiement...",
    });
  };

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'parking':
        return <Car className="w-4 h-4" />;
      case 'onsen':
        return <Bath className="w-4 h-4" />;
      case 'breakfast':
        return <Coffee className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Image Gallery Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48">
          <img
            src={accommodation.images[currentImageIndex]}
            alt={`${accommodation.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {accommodation.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-primary' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-semibold text-secondary">
              {accommodation.name}
            </h2>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{accommodation.rating}/5</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{accommodation.type}</p>
          <p className="text-primary font-semibold">
            {accommodation.price}¥ <span className="text-xs text-gray-500">/ nuit</span>
          </p>
        </div>
      </div>

      {/* Amenities Card */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">Services inclus</h3>
        <div className="grid grid-cols-2 gap-2">
          {accommodation.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              {renderAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description & Booking Card */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {accommodation.description}
        </p>
        <div className="text-xs text-gray-500 mb-4">
          <h4 className="font-semibold mb-1">Politique d'annulation</h4>
          <p className="line-clamp-2">{accommodation.cancellationPolicy}</p>
        </div>
        <Button 
          onClick={handleBooking}
          className="w-full"
          size="sm"
        >
          Réserver maintenant
        </Button>
      </div>
    </div>
  );
};

export default AccommodationDetail;