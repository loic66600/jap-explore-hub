
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Map from '@/components/Map';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, Hotel, MapPin, Train, Calculator, Share2 } from 'lucide-react';
import { plannerFlights } from '@/fixtures/plannerFlights';
import { plannerAccommodations } from '@/fixtures/plannerAccommodations';
import { plannerActivities } from '@/fixtures/plannerActivities';
import { plannerTransports } from '@/fixtures/plannerTransports';

interface Itinerary {
  id?: string;
  user_id: string;
  items: any[];
  total_budget: number;
  created_at?: string;
}

const PlannerPage = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState("flights");

  const calculateTotalBudget = () => {
    return budget;
  };

  const saveItinerary = async (itinerary: Omit<Itinerary, 'id' | 'created_at'>) => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error('You must be logged in to save an itinerary');
      }

      if (!user) {
        throw new Error('No authenticated user found');
      }

      const { data, error } = await supabase
        .from('itineraries')
        .insert([{
          ...itinerary,
          user_id: user.id
        }]);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Itinéraire sauvegardé avec succès',
      });

      return data;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Échec de la sauvegarde de l\'itinéraire',
        variant: 'destructive',
      });
      console.error('Erreur lors de la sauvegarde de l\'itinéraire:', error);
    }
  };

  const shareItinerary = () => {
    toast({
      title: 'Partage',
      description: 'Fonctionnalité de partage en cours de développement',
    });
  };

  const renderFlights = () => (
    <div className="space-y-4">
      {plannerFlights.map((flight) => (
        <div key={flight.id} className="p-4 border rounded-lg hover:shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{flight.airline}</h4>
              <p className="text-sm text-gray-600">
                {flight.origin} → {flight.destination}
              </p>
              <p className="text-sm text-gray-500">
                {flight.duration} - {flight.class}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{flight.price}€</p>
              <Button size="sm" variant="outline" className="mt-2">
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAccommodations = () => (
    <div className="space-y-4">
      {plannerAccommodations.map((accommodation) => (
        <div key={accommodation.id} className="p-4 border rounded-lg hover:shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{accommodation.name}</h4>
              <p className="text-sm text-gray-600">{accommodation.location}</p>
              <p className="text-sm text-gray-500">{accommodation.room}</p>
              <div className="flex gap-2 mt-1">
                {accommodation.amenities.slice(0, 2).map((amenity, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{accommodation.price}€/nuit</p>
              <Button size="sm" variant="outline" className="mt-2">
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-4">
      {plannerActivities.map((activity) => (
        <div key={activity.id} className="p-4 border rounded-lg hover:shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{activity.name}</h4>
              <p className="text-sm text-gray-600">{activity.location}</p>
              <p className="text-sm text-gray-500">
                {activity.duration} - {activity.type}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{activity.price}€</p>
              <Button size="sm" variant="outline" className="mt-2">
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTransport = () => (
    <div className="space-y-4">
      {plannerTransports.map((transport) => (
        <div key={transport.id} className="p-4 border rounded-lg hover:shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{transport.name}</h4>
              <p className="text-sm text-gray-600">{transport.coverage}</p>
              <p className="text-sm text-gray-500">Validité: {transport.validity}</p>
              <div className="flex gap-2 mt-1">
                {transport.benefits.slice(0, 1).map((benefit, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{transport.price}€</p>
              <Button size="sm" variant="outline" className="mt-2">
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold">Planificateur de Voyage</h1>
          <div className="flex gap-4">
            <Button
              onClick={shareItinerary}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Partager
            </Button>
            <Button
              onClick={() => saveItinerary({
                user_id: '',
                items: [],
                total_budget: calculateTotalBudget()
              })}
              className="flex items-center gap-2"
            >
              Sauvegarder
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <Tabs defaultValue={selectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="flights" onClick={() => setSelectedTab("flights")}>
                    <Plane className="w-4 h-4 mr-2" />
                    Vols
                  </TabsTrigger>
                  <TabsTrigger value="hotels" onClick={() => setSelectedTab("hotels")}>
                    <Hotel className="w-4 h-4 mr-2" />
                    Hébergements
                  </TabsTrigger>
                  <TabsTrigger value="activities" onClick={() => setSelectedTab("activities")}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Activités
                  </TabsTrigger>
                  <TabsTrigger value="transport" onClick={() => setSelectedTab("transport")}>
                    <Train className="w-4 h-4 mr-2" />
                    Transport
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="flights" className="p-4">
                  {renderFlights()}
                </TabsContent>

                <TabsContent value="hotels" className="p-4">
                  {renderAccommodations()}
                </TabsContent>

                <TabsContent value="activities" className="p-4">
                  {renderActivities()}
                </TabsContent>

                <TabsContent value="transport" className="p-4">
                  {renderTransport()}
                </TabsContent>

              </Tabs>
            </Card>

            <div className="mt-8">
              <Map type="planner" />
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Budget Estimé</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="budget">Budget Total (¥)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Vols</span>
                      <span>¥0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Hébergements</span>
                      <span>¥0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Activités</span>
                      <span>¥0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Transport Local</span>
                      <span>¥0</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>¥{calculateTotalBudget()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;

