import React from 'react';

import './gistPagination.scss';

const GistPagination = () => {

    return (
        <div className="gistPagination">
            <div className="gistPagination__bar">
                <div className="gistPagination__bar__button border left">Prev</div>
                <div className="gistPagination__bar__button border center">1</div>
                <div className="gistPagination__bar__button border right">Next</div>
            </div>
        </div>
    );
};

export default GistPagination;