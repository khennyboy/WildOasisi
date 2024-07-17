import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

const CabinsTableOperations = () => {
    return (
        <TableOperations>
            <Filter filterField="discount" options={[
                { value: 'all', label: 'All' },
                { value: 'no-discount', label: 'no-discount' },
                { value: 'with-discount', label: 'with-discount' }
            ]} />
            <SortBy options={[
                { value: 'name-asc', label: "Sort by name (A-Z)" },
                { value: 'name-dsc', label: 'Sort by name (Z-A)' },
                { value: 'regularPrice-asc', label: 'Sort by price(low first)' },
                { value: 'regularPrice-dsc', label: 'Sort by price(high first)' },
                { value: 'maxCapacity-asc', label: 'Sort by price(low first)' },
                { value: 'maxCapacity-dsc', label: 'Sort by price(high first)' }
            ]} />
        </TableOperations>
    )
}

export default CabinsTableOperations