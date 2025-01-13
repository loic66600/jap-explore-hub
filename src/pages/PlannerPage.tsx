import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Navigation from '@/components/Navigation';
import Map from '@/components/Map';

interface Itinerary {
  id?: string;
  user_id: string;
  items: any[];
  total_budget: number;
  created_at?: string;
}

const PlannerPage = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  const saveItinerary = async (itinerary: Omit<Itinerary, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .insert([itinerary]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Itinerary saved successfully',
      });

      return data;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save itinerary',
        variant: 'destructive',
      });
      console.error('Error saving itinerary:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Trip Planner</h1>
        <Map type="planner" />
      </div>
    </div>
  );
};

export default PlannerPage;