import { fetchData, updateData, deleteData } from './api';

export async function getBookings() {
  return await fetchData('booking');
}

export async function getBooking(id) {
  return await fetchData(`booking/${id}`);
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  return await fetchData(`booking/afterDate?date=${date}`);
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  return await fetchData(`booking/staysAfterDate?date=${date}`);
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  return await fetchData('booking/staysToday');
}

export async function updateBooking(id, obj) {
  return await updateData(`booking/${id}`, obj);
}

export async function deleteBooking(id) {
  await deleteData(`/booking/${id}`);
}
