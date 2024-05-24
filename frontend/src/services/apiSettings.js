import { fetchData, createData } from './api';

export async function getSettings() {
  return await fetchData('setting');
}

export async function updateSetting(newSetting) {
  const formData = new FormData();
  Object.keys(newSetting).forEach(key => {
    formData.append(key, newSetting[key]);
  });

  return await createData('setting', formData);
}
