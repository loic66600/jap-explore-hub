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
        return <Wifi className="w-5 h-5" />;
      case 'restaurant':
        return <Utensils className="w-5 h-5" />;
      case 'parking':
        return <Car className="w-5 h-5" />;
      case 'onsen':
        return <Bath className="w-5 h-5" />;
      case 'breakfast':
        return <Coffee className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
      {/* Image Gallery */}
      <div className="relative h-96">
        <img
          src={accommodation.images[currentImageIndex]}
          alt={`${accommodation.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {accommodation.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-primary' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary mb-2">
              {accommodation.name}
            </h1>
            <p className="text-gray-600">Type: {accommodation.type}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {accommodation.price}¥ <span className="text-sm">/ nuit</span>
            </p>
            <div className="flex items-center mt-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1">{accommodation.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{accommodation.description}</p>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Services inclus</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {accommodation.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2">
                {renderAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Politique d'annulation</h2>
          <p className="text-gray-600">{accommodation.cancellationPolicy}</p>
        </div>

        {/* Booking Button */}
        <Button 
          onClick={handleBooking}
          className="w-full"
          size="lg"
        >
          Réserver maintenant
        </Button>
      </div>
    </div>
  );
};

export default AccommodationDetail;