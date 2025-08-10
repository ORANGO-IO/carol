import React from 'react';
import { FullScreenLoading, LoadingSpinner } from './styles';

const Loading = () => {
    return (
        <FullScreenLoading>
            <LoadingSpinner />
        </FullScreenLoading>
    );
};

export default Loading;