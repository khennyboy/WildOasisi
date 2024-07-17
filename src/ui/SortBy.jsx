import React from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom'

const SortBy = (info) => {
    const { options } = info
    const [searchParams, setSearchParams] = useSearchParams()

    const sortBy = searchParams.get('sortBy') || ''

    function onChange(e) {
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams)
    }
    return (
        <Select
            options={options}
            type='white'
            onChange={onChange}
            value={sortBy} />
    )
}

export default SortBy