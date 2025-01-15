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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fr } from 'date-fns/locale';
import { useToast } from "@/components/ui/use-toast";

interface BookingFormProps {
  onSearch: () => void;
  isSearching: boolean;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  setDepartureDate: (date: Date | undefined) => void;
  setReturnDate: (date: Date | undefined) => void;
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
}

export const BookingForm = ({
  onSearch,
  isSearching,
  departureDate,
  returnDate,
  setDepartureDate,
  setReturnDate,
  setOrigin,
  setDestination,
}: BookingFormProps) => {
  const { toast } = useToast();
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<string>("");

  const handleOriginChange = (value: string) => {
    setSelectedOrigin(value);
    setOrigin(value);
  };

  const handleDestinationChange = (value: string) => {
    setSelectedDestination(value);
    setDestination(value);
  };

  const handleSearch = () => {
    if (!selectedOrigin || !selectedDestination || !departureDate || !returnDate) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
      });
      return;
    }
    onSearch();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Departure City */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Ville de départ</label>
          <Select onValueChange={handleOriginChange} value={selectedOrigin}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CDG">Paris (CDG)</SelectItem>
              <SelectItem value="LYS">Lyon (LYS)</SelectItem>
              <SelectItem value="MRS">Marseille (MRS)</SelectItem>
              <SelectItem value="TLS">Toulouse (TLS)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Destination</label>
          <Select onValueChange={handleDestinationChange} value={selectedDestination}>
            <SelectTrigger>
              <SelectValue placeholder="Choisissez votre destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HND">Tokyo (Haneda)</SelectItem>
              <SelectItem value="NRT">Tokyo (Narita)</SelectItem>
              <SelectItem value="KIX">Osaka (Kansai)</SelectItem>
              <SelectItem value="ITM">Osaka (Itami)</SelectItem>
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
              <SelectItem value="ECONOMY">Économique</SelectItem>
              <SelectItem value="PREMIUM_ECONOMY">Premium</SelectItem>
              <SelectItem value="BUSINESS">Business</SelectItem>
              <SelectItem value="FIRST">Première</SelectItem>
            </SelectContent>
          </Select>
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
  );
};