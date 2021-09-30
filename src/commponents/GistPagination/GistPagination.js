import React from 'react';
import PropTypes from 'prop-types';

import './gistPagination.scss';

const GistPagination = (props) => {

    /**
     * NEXT page
     */
    const onNextPageClick = () => {
        if((props.page * props.perPage) >= 2999) return;
        props.setPage(props.page + 1);
    }

    /**
     * PREV page
     */
    const onPrevPageClick = () => {
        if(props.page === 1) return;
        props.setPage(props.page - 1);
    }

    return (
        <div className="gistPagination">
            <div className="gistPagination__bar">
                <div
                    data-testid="prevPage"
                    className="gistPagination__bar__button border left"
                    onClick={onPrevPageClick}
                >Prev</div>
                <div
                    data-testid="pageValue"
                    className="gistPagination__bar__button border center"
                >{props.page}</div>
                <div
                    data-testid="nextPage"
                    className="gistPagination__bar__button border right"
                    onClick={onNextPageClick}
                >Next</div>
            </div>
        </div>
    );
};

GistPagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    perPage: PropTypes.number.isRequired
}

export default GistPagination;