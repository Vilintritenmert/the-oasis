import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import { useSearchParams } from 'react-router-dom';

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterParam = searchParams.get('status') || 'all';

  let filteredBookings = bookings;

  if (filterParam !== 'all') {
    filteredBookings = bookings.filter(
      ({ status }) => status === filterParam
    );
  }

  const sortField = searchParams.get('sort-field') || 'id-asc';
  const [field, order] = sortField.split('-')
  const modifier = order === 'asc' ? 1 : -1;
  const sortedBookings = filteredBookings.sort((a, b) => (a[field] - b[field]) * modifier);
  
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings}
          render={booking => <BookingRow key={booking.id} booking={booking} />}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
