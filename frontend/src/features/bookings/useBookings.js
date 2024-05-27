import { getBookings } from '../../services/apiBookings';
import { useQuery } from '@tanstack/react-query';

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['booking'],
    queryFn: getBookings,
  });

  return { isLoading, bookings, error };
}
