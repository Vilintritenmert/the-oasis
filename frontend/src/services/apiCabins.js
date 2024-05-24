import { deleteData, fetchData, updateData, createData } from './api';

export async function getCabins() {
  return await fetchData('cabin');
}

export async function createOrEditCabin({ id, ...data}) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if(data[key]) formData.append(key, data[key]);
  });

  if (id) return await updateData(`cabin/${id}`, formData);

  return await createData('cabin', formData);
}

export async function deleteCabin(id) {
  await deleteData(`cabin/${id}`);
}
