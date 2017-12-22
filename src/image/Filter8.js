import React from 'react';
import BaseIcon from '../BaseIcon';

export default props => (
    <BaseIcon
        { ...props }
    >
        <path d="M6 10H2v32c0 2.21 1.79 4 4 4h32v-4H6V10zm36-8H14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4zm0 32H14V6h28v28zm-16-4h4c2.21 0 4-1.79 4-4v-3c0-1.66-1.34-3-3-3 1.66 0 3-1.34 3-3v-3c0-2.21-1.79-4-4-4h-4c-2.21 0-4 1.79-4 4v3c0 1.66 1.34 3 3 3-1.66 0-3 1.34-3 3v3c0 2.21 1.79 4 4 4zm0-16h4v4h-4v-4zm0 8h4v4h-4v-4z"/>
    </BaseIcon>
);
