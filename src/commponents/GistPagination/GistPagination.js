import React from 'react';
import PropTypes from 'prop-types';

import './gistPagination.scss';

const GistPagination = ({onNextPageClick, page, onPrevPageClick}) => {

    return (
        <div className="gistPagination">
            <div className="gistPagination__bar">
                <div
                    className="gistPagination__bar__button border left"
                    onClick={onPrevPageClick}
                >Prev</div>
                <div className="gistPagination__bar__button border center">{page}</div>
                <div
                    className="gistPagination__bar__button border right"
                    onClick={onNextPageClick}
                >Next</div>
            </div>
        </div>
    );
};

GistPagination.propTypes = {
    onNextPageClick: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    onPrevPageClick: PropTypes.func.isRequired
}

export default GistPagination;