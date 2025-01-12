import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee,
  Bath,
  Star,
  Image as ImageIcon
} from "lucide-react";
import Map from "@/components/Map";

interface AccommodationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodation: {
    name: string;
    type: string;
    rating: number;
    totalReviews: number;
    description: string;
    history?: string;
    address: {
      full: string;
      distance: {
        station?: string;
        attractions?: string[];
      };
    };
    amenities: string[];
    images: string[];
    rooms: Array<{
      type: string;
      description: string;
      price: string;
      images: string[];
    }>;
    policies: {
      checkIn: string;
      checkOut: string;
      cancellation: string;
    };
    reviews: Array<{
      author: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
}

const AccommodationDetailsModal = ({ 
  isOpen, 
  onClose, 
  accommodation 
}: AccommodationDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {accommodation.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="summary" className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summary">Résumé</TabsTrigger>
            <TabsTrigger value="rooms">Chambres</TabsTrigger>
            <TabsTrigger value="amenities">Services</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
            <TabsTrigger value="location">Localisation</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">{accommodation.type}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">
                      {accommodation.rating}/5 ({accommodation.totalReviews} avis)
                    </span>
                  </div>
                </div>
              </div>

              {accommodation.history && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Histoire</h4>
                  <p className="text-sm text-gray-600">{accommodation.history}</p>
                </div>
              )}

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-gray-600">{accommodation.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Check-in</h4>
                  <p className="text-sm text-gray-600">{accommodation.policies.checkIn}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Check-out</h4>
                  <p className="text-sm text-gray-600">{accommodation.policies.checkOut}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rooms" className="mt-4">
            <div className="space-y-6">
              {accommodation.rooms.map((room, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{room.type}</h4>
                      <p className="text-sm text-gray-600 mt-1">{room.description}</p>
                    </div>
                    <p className="text-lg font-bold text-primary">{room.price}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {room.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`${room.type} - Image ${imgIndex + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="amenities" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {accommodation.amenities.map((amenity, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-center space-x-4">
                  {amenity.toLowerCase().includes('wifi') && <Wifi className="w-6 h-6 text-primary" />}
                  {amenity.toLowerCase().includes('parking') && <Car className="w-6 h-6 text-primary" />}
                  {amenity.toLowerCase().includes('petit-déjeuner') && <Coffee className="w-6 h-6 text-primary" />}
                  {amenity.toLowerCase().includes('onsen') && <Bath className="w-6 h-6 text-primary" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {accommodation.reviews.map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.date}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="location" className="mt-4">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Adresse</h4>
                <p className="text-sm text-gray-600">{accommodation.address.full}</p>
                {accommodation.address.distance.station && (
                  <p className="text-sm text-gray-600 mt-2">
                    {accommodation.address.distance.station}
                  </p>
                )}
                {accommodation.address.distance.attractions?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Attractions à proximité :</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {accommodation.address.distance.attractions.map((attraction, index) => (
                        <li key={index}>{attraction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <Map type="accommodation" />
              </div>
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

export default AccommodationDetailsModal;