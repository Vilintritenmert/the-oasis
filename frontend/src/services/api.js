const URL = 'http://localhost:8001/api';

export async function fetchData(uri) {
  const response = await fetch(`${URL}/${uri}`);

  if (!response.ok) {
    throw new Error('Fetch Request is failed');
  }

  return await response.json();
}

export async function createData(uri, obj) {
  const response = await fetch(`${URL}/${uri}`, {
    method: 'POST',
    body: obj,
  });

  if (!response.ok) {
    throw new Error(`Update '${uri}' Request is failed`);
  }

  return await response.json();
}

export async function updateData(uri, obj) {
  const response = await fetch(`${URL}/${uri}`, {
    method: 'PATCH',
    body: obj,
  });

  if (!response.ok) {
    throw new Error(`Update '${uri}' Request is failed`);
  }

  return await response.json();
}

export async function deleteData(uri) {
  const response = await fetch(`${URL}/${uri}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Delete '${uri}' Request is failed`);
  }
}
