import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getSettings } from '../../services/apiSettings'

const useSetting = () => {
    const {isLoading, data:settings} = useQuery({
        queryKey: ['setting'],
        queryFn: getSettings
    })
 
    return {isLoading, settings}
}

export default useSetting