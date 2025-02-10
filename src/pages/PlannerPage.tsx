
import { useState, useEffect } from 'react';
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
import { plannerItems, type PlannerItem, type Itinerary } from '@/fixtures/plannerItems';

const PlannerPage = () => {
  const [currentItinerary, setCurrentItinerary] = useState<Partial<Itinerary>>({
    name: 'Mon voyage au Japon',
    start_date: '2024-06-15',
    end_date: '2024-06-30',
    total_budget: 0,
    items: []
  });
  const [selectedTab, setSelectedTab] = useState("flights");

  const saveItinerary = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error('Vous devez être connecté pour sauvegarder un itinéraire');
      }

      if (!user) {
        throw new Error('Aucun utilisateur authentifié trouvé');
      }

      const { data, error } = await supabase
        .from('itineraries')
        .insert([{
          ...currentItinerary,
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

  const addItemToItinerary = (item: PlannerItem) => {
    setCurrentItinerary(prev => ({
      ...prev,
      items: [...(prev.items || []), item.id],
      total_budget: (prev.total_budget || 0) + Number(item.details.price)
    }));

    toast({
      title: 'Élément ajouté',
      description: `${item.details.name || item.type} ajouté à votre itinéraire`,
    });
  };

  const renderItems = (type: PlannerItem['type']) => {
    const items = plannerItems.filter(item => item.type === type);
    
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg hover:shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{item.details.name || `${item.type} ${item.id}`}</h4>
                <p className="text-sm text-gray-600">{item.details.location || item.details.destination}</p>
                {item.type === 'flight' && (
                  <p className="text-sm text-gray-500">
                    {item.details.duration} - {item.details.class}
                  </p>
                )}
                {item.type === 'accommodation' && (
                  <div className="flex gap-2 mt-1">
                    {item.details.amenities?.slice(0, 2).map((amenity: string, index: number) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold">{item.details.price}€</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => addItemToItinerary(item)}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
              onClick={saveItinerary}
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
                  {renderItems('flight')}
                </TabsContent>

                <TabsContent value="hotels" className="p-4">
                  {renderItems('accommodation')}
                </TabsContent>

                <TabsContent value="activities" className="p-4">
                  {renderItems('activity')}
                </TabsContent>

                <TabsContent value="transport" className="p-4">
                  {renderItems('transport')}
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
                    <Label htmlFor="tripName">Nom du voyage</Label>
                    <Input
                      id="tripName"
                      value={currentItinerary.name}
                      onChange={(e) => setCurrentItinerary(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Total</span>
                      <span>€{currentItinerary.total_budget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Éléments sélectionnés</span>
                      <span>{currentItinerary.items?.length || 0}</span>
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
