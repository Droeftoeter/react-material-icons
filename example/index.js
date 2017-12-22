import React from 'react';
import ReactDOM from 'react-dom';

import { Alarm } from '@kobalt/react-material-icons/action'

ReactDOM.render(
    <div>
        <Alarm
            title="Alarm"
            description="Set your alarm"
        />
    </div>,
    document.getElementById('react-container'),
);
