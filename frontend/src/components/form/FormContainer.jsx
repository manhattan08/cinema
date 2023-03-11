import React from 'react';

const FormContainer = ({children}) => {
    return (
        <div className="fixed  inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center">
            {children}
        </div>
    );
};

export default FormContainer;