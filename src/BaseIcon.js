import React from 'react';
import PropTypes from 'prop-types';

const BaseIcon = ({ children, title, description, ...rest }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        aria-label={ title || description }
        { ...rest }
    >
        { title && <title>{ title }</title> }
        { description && <desc>{ description }</desc> }
        { children }
    </svg>
);

BaseIcon.propTypes = {
    title:       PropTypes.string,
    description: PropTypes.string,
    children:    PropTypes.node.isRequired,
};

BaseIcon.defaultProps = {
    title:       undefined,
    description: undefined,
};

export default BaseIcon;
