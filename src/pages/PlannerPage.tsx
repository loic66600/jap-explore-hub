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
    // Logique pour calculer le budget total
    return budget;
  };

  const saveItinerary = async (itinerary: Omit<Itinerary, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .insert([itinerary]);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Itinéraire sauvegardé avec succès',
      });

      return data;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Échec de la sauvegarde de l\'itinéraire',
        variant: 'destructive',
      });
      console.error('Erreur lors de la sauvegarde de l\'itinéraire:', error);
    }
  };

  const shareItinerary = () => {
    // Logique pour partager l'itinéraire
    toast({
      title: 'Partage',
      description: 'Fonctionnalité de partage en cours de développement',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
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
                user_id: 'user_id',
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Recherche de Vols</h3>
                    {/* Contenu pour les vols */}
                  </div>
                </TabsContent>

                <TabsContent value="hotels" className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Hébergements</h3>
                    {/* Contenu pour les hébergements */}
                  </div>
                </TabsContent>

                <TabsContent value="activities" className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Activités</h3>
                    {/* Contenu pour les activités */}
                  </div>
                </TabsContent>

                <TabsContent value="transport" className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Transport Local</h3>
                    {/* Contenu pour le transport */}
                  </div>
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