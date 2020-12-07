import React from 'react';

function renderError(state) {
    return (
        <div>
            Oh no!  {state.error.message}
        </div>
    );
}
export default renderError;
