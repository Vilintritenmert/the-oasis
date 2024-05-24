import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export function useEditSettings() {
  const queryClient = useQueryClient();

  const { isLoading: isSettingsUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings successfully updated');
      queryClient.invalidateQueries(['setting']);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  return {isSettingsUpdating, updateSetting}
}