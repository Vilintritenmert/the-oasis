import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(event) {
    searchParams.set('sort-field', event.target.value);
    setSearchParams(searchParams);
  }

  const sortFieldSelected =
    searchParams.get('sort-field') || options.at(0).value;

  return (
    <Select
      value={sortFieldSelected}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
