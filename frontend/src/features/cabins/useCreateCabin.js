import { createOrEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreateOrUpdateLoading, mutate: createOrUpdate } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries(['cabin']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {isCreateOrUpdateLoading, createOrUpdate}
}