import React, { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProtectedRoute = (infos) => {
    const { children } = infos
    const navigate = useNavigate();

    const { isLoading, isAuthenticated } = useUser();
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate("/login/");
        },
        [isAuthenticated, isLoading, navigate]
    );


    if (isLoading) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    }

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return null;
};

export default ProtectedRoute;
