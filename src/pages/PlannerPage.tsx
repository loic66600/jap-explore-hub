import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Map from '@/components/Map';
import { Plane, Hotel, MapPin, Train, Calculator } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PlannerItem {
  type: 'flight' | 'hotel' | 'activity';
  id: string;
  title: string;
  price: number;
  details: string;
}

const PlannerPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<PlannerItem[]>([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate('/');
        toast({
          title: "Connexion requise",
          description: "Veuillez vous connecter pour accéder à la planification",
          variant: "destructive",
        });
      }
    });
  }, [navigate]);

  const calculateTotalBudget = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  const handleSaveItinerary = async () => {
    if (!session?.user) return;

    try {
      const { error } = await supabase
        .from('itineraries')
        .insert([
          {
            user_id: session.user.id,
            items: selectedItems,
            total_budget: calculateTotalBudget(),
          },
        ]);

      if (error) throw error;

      toast({
        title: "Itinéraire sauvegardé",
        description: "Votre plan de voyage a été enregistré avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'itinéraire",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Planifiez Votre Voyage au Japon</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="flights" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Vols
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center gap-2">
                <Hotel className="w-4 h-4" />
                Hébergements
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Activités
              </TabsTrigger>
              <TabsTrigger value="transport" className="flex items-center gap-2">
                <Train className="w-4 h-4" />
                Transport
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  {/* Contenu des vols */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hotels" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  {/* Contenu des hôtels */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activities" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  {/* Contenu des activités */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transport" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  {/* Contenu du transport */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Budget Total</h3>
                <Calculator className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-2xl font-bold">{totalBudget.toLocaleString()} €</p>
            </CardContent>
          </Card>

          <div className="h-[400px] relative">
            <Map type="cities" />
          </div>

          <Button 
            className="w-full"
            onClick={handleSaveItinerary}
          >
            Sauvegarder l'Itinéraire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;