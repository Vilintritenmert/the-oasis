import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;

  if (filterValue === 'all') {
    filteredCabins = cabins;
  }

  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter(({ discount }) => discount === 0);
  }

  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter(({ discount }) => discount);
  }

  const sortParams = searchParams.get('sort-field') || 'name-asc'

  if (sortParams === 'name-desc') {
    filteredCabins = filteredCabins.sort(({name: name1}, {name: name2}) => name1 > name2 ? -1 : 1)
  }

  if (sortParams === 'name-asc') {
    filteredCabins = filteredCabins.sort(({name: name1}, {name: name2}) => name1 > name2 ? 1 : -1)
  }
  
  if (sortParams === 'regular-price-asc') {
    filteredCabins = filteredCabins.sort(({regularPrice: price1}, {regularPrice: price2}) => price1 > price2 ? 1 : -1)
  }
    
  if (sortParams === 'regular-price-desc') {
    filteredCabins = filteredCabins.sort(({regularPrice: price1}, {regularPrice: price2}) => price1 > price2 ? -1 : 1)
  }
   
  if (sortParams === 'max-capacity-asc') {
    filteredCabins = filteredCabins.sort(({maxCapacity: capacity1}, {maxCapacity: capacity2}) => capacity1 > capacity2 ? 1 : -1)
  }
  
  if (sortParams === 'max-capacity-desc') {
    filteredCabins = filteredCabins.sort(({maxCapacity: capacity1}, {maxCapacity: capacity2}) => capacity1 > capacity2 ? -1 : 1)
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={filteredCabins}
        render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
