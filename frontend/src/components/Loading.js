import React from 'react';
import { LoaderContainer, Loader, Dot } from './StyledComponents';

const Loading = () => {
    return (
        <LoaderContainer>
            <Loader>
                <Dot delay="0s" />
                <Dot delay="0.2s" />
                <Dot delay="0.4s" />
            </Loader>
        </LoaderContainer>
    );
};

export default Loading;
