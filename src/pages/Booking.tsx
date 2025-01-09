import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Map from "@/components/Map";

const Booking = () => {
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!departureDate || !returnDate) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez sélectionner les dates de départ et de retour",
      });
      return;
    }

    setIsSearching(true);
    toast({
      title: "Recherche en cours",
      description: "Nous recherchons les meilleures offres pour vous",
    });

    // Simuler une recherche
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Recherche terminée",
        description: "Voici les résultats de votre recherche",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <img
          src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Shinkansen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Réservez votre voyage au Japon
          </h1>
        </div>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Departure City */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Ville de départ</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paris">Paris</SelectItem>
                  <SelectItem value="lyon">Lyon</SelectItem>
                  <SelectItem value="marseille">Marseille</SelectItem>
                  <SelectItem value="toulouse">Toulouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tokyo">Tokyo</SelectItem>
                  <SelectItem value="kyoto">Kyoto</SelectItem>
                  <SelectItem value="osaka">Osaka</SelectItem>
                  <SelectItem value="hiroshima">Hiroshima</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date de départ</label>
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                locale={fr}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date de retour</label>
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                locale={fr}
                className="rounded-md border"
              />
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre de voyageurs</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500">Adultes</label>
                  <Input type="number" min="1" defaultValue="1" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Enfants</label>
                  <Input type="number" min="0" defaultValue="0" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Bébés</label>
                  <Input type="number" min="0" defaultValue="0" />
                </div>
              </div>
            </div>

            {/* Travel Class */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Classe de voyage</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Économique</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transport Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de transport</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez votre transport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plane">Avion</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                  <SelectItem value="bus">Bus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Activities */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Activités supplémentaires</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="guided-tour" />
                  <Label htmlFor="guided-tour">Visite guidée</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="tea-ceremony" />
                  <Label htmlFor="tea-ceremony">Cérémonie du thé</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cooking-class" />
                  <Label htmlFor="cooking-class">Cours de cuisine</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="w-full md:w-auto min-w-[200px] animate-fade-up"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? "Recherche en cours..." : "Rechercher"}
            </Button>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Booking;