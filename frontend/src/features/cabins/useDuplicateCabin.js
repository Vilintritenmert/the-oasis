import { createOrEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDuplicating , mutate: duplicate } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries(['cabin']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {isDuplicating, duplicate}
}