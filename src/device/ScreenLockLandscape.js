import React from 'react';
import BaseIcon from '../BaseIcon';

export default props => (
    <BaseIcon
        { ...props }
    >
        <path d="M42 10H6c-2.21 0-4 1.79-4 4v20c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4V14c0-2.21-1.79-4-4-4zm-4 24H10V14h28v20zm-18-2h8c1.11 0 2-.9 2-2v-6c0-1.1-.89-2-2-2v-2c0-2.21-1.79-4-4-4s-4 1.79-4 4v2c-1.11 0-2 .9-2 2v6c0 1.1.89 2 2 2zm1.6-12c0-1.33 1.07-2.4 2.4-2.4 1.33 0 2.4 1.08 2.4 2.4v2h-4.8v-2z"/>
    </BaseIcon>
);
