import { useQuery } from "@tanstack/react-query";
import { amadeusService } from "@/services/amadeus";

export const useAmadeusActivities = (latitude: string, longitude: string) => {
  return useQuery({
    queryKey: ['activities', latitude, longitude],
    queryFn: () => amadeusService.searchActivities(latitude, longitude),
    enabled: Boolean(latitude && longitude),
  });
};

export const useAmadeusHotels = (cityCode: string, checkIn: string, checkOut: string) => {
  return useQuery({
    queryKey: ['hotels', cityCode, checkIn, checkOut],
    queryFn: () => amadeusService.searchHotels(cityCode, checkIn, checkOut),
    enabled: Boolean(cityCode && checkIn && checkOut),
  });
};

export const useAmadeusFlights = (
  origin: string,
  destination: string,
  date: string,
  adults: string = "1"
) => {
  return useQuery({
    queryKey: ['flights', origin, destination, date, adults],
    queryFn: () => amadeusService.searchFlights(origin, destination, date, adults),
    enabled: Boolean(origin && destination && date),
  });
};