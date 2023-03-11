import React from 'react';

const Title = ({children}) => {
    return (
        <h1 className="text-xl dark:text-white text-secondary font-semibold text-center">
            {children}
        </h1>
    );
};

export default Title;