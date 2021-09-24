import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import svgSortOrder from './icons/sort_black_24dp.svg';
import svgByDate from './icons/date_range_black_24dp.svg';
import svgByDescription from './icons/description_black_24dp.svg';
import svgByPerson from './icons/person_black_24dp.svg';

import './gistNav.scss';

const GistsNav = (props) => {

    const onSortingOrderChange = () => {
        if(props.sortingOrder.direction === 'desc') props.setSortingOrder({direction: 'asc'});
        else props.setSortingOrder({direction: 'desc'});

    }

    return (
        <div className="gistNav">
            <div className="gistNav__top">
                <div className="gistNav__top__search">
                    <input
                        id="inputSearch"
                        className="gistNav__top__input"
                        type="text"
                        name="input"
                        onChange={(event) => props.onInputChange(event)}
                        onKeyDown={(event) => props.onBackSpaceClick(event)}
                    />
                    <select
                        className="gistNav__top__select"
                        id="itemsPerPage"
                        name="itemsPerPage"
                        defaultValue={props.perPage}
                        onChange={(e)=>{props.onSelectPerPageFn(e)}}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div className="gistNav__top__buttons">
                    <img
                        id="sortOrderBtn"
                        title="Sort Order"
                        className="gistNav__top__buttons__sortOrder"
                        src={svgSortOrder}
                        //onClick={props.onSetOrderChange}//
                        onClick={onSortingOrderChange}
                    alt="icon order"/>
                    <div className="gistNav__top__buttons__switchGroup">
                        <p>Sort By:&nbsp;</p>
                        <img
                            id="sortByDateSwitch"
                            title="Sort By Date"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByDate}
                            onClick={() => props.onSortBy('sortByDateSwitch', {sortingCategory: 'date'})}
                        />
                        <img
                            id="sortByDescriptionSwitch"
                            title="Sort By Description"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByDescription}
                            onClick={() => props.onSortBy('sortByDescriptionSwitch', {sortingCategory: 'description'})}
                        />
                        <img
                            id="sortByLoginSwitch"
                            title="Sort By Login"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByPerson}
                            onClick={() => props.onSortBy('sortByLoginSwitch', {sortingCategory: 'login'})}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

GistsNav.propTypes = {
    onSelectPerPageFn: PropTypes.func.isRequired,
}

export default GistsNav;