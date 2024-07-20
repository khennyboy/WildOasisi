import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins = [], error, isError } = useCabins();
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get('discount') || 'all'

  // filter
  let filteredCabins;

  if (filterValue === 'all') filteredCabins = cabins;

  if (filterValue === 'no-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount == 0)

  if (filterValue === 'with-discount')
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0)
  // sort 
  const sortBy = searchParams.get('sortBy') || 'name-asc'
  const [field, direction] = sortBy.split('-')

  const modifier = direction === 'asc' ? 1 : -1
  filteredCabins = filteredCabins?.sort((a, b) => {
    return (
      (a[field] - b[field]) * modifier
    )
  })

  if (isLoading) return <Spinner />;
  if (isError) return <p>{error.message}</p>;
  if (!cabins.length) return <Empty resourceName='cabins' />

  return (
    <Menus>
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
          render={(eachCabin) => (
            <CabinRow cabin={eachCabin} key={eachCabin.id} />
          )}
        />
      </Table>
    </Menus>

  );
}

export default CabinTable;
