import React from 'react';
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
        const el = document.getElementById('sortOrderBtn');
        el.classList.toggle('rotate180deg');
    }

    return (
        <div className="gistNav">
            <div className="gistNav__top">
                <div className="gistNav__top__search">
                    <input
                        data-testid="nav-input"
                        id="inputSearch"
                        className="gistNav__top__input"
                        type="text"
                        name="input"
                        title="user input"
                        onChange={(event) => props.onInputChange(event)}
                        onKeyDown={(event) => props.onBackSpaceClick(event)}
                    />
                    <select
                        data-testid="nav-select"
                        className="gistNav__top__select"
                        id="itemsPerPage"
                        name="itemsPerPage"
                        title="Items per page"
                        defaultValue={props.perPage}
                        onChange={(e)=>{props.onSelectPerPage(e)}}
                    >
                        <option data-testid="navOption5" value="5">5</option>
                        <option data-testid="navOption10" value="10">10</option>
                        <option data-testid="navOption30" value="30">30</option>
                        <option data-testid="navOption100" value="100">100</option>
                    </select>
                </div>
                <div className="gistNav__top__buttons">
                    <img
                        data-testid="nav-sortOrderBtn"
                        id="sortOrderBtn"
                        title="Sort Order"
                        className="gistNav__top__buttons__sortOrder rotate180deg"
                        src={svgSortOrder}
                        onClick={onSortingOrderChange}
                    alt="icon order"/>
                    <div className="gistNav__top__buttons__switchGroup">
                        <p><small data-testid="nav-sortingAttribute">{props.sortingAttribute?.sortingCategory}</small></p>
                        <img
                            data-testid="nav-sortByDateSwitch"
                            id="sortByDateSwitch"
                            alt="icon of calendar"
                            title="Sort By Date"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByDate}
                            onClick={(e) => props.onSortingAttributeChange(e, {sortingCategory: 'date'})}
                        />
                        <img
                            data-testid="nav-sortByDescriptionSwitch"
                            id="sortByDescriptionSwitch"
                            alt="icon of paper sheet"
                            title="Sort By Description"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByDescription}
                            onClick={(e) => props.onSortingAttributeChange(e, {sortingCategory: 'description'})}
                        />
                        <img
                            data-testid="nav-sortByLoginSwitch"
                            id="sortByLoginSwitch"
                            alt="icon of user"
                            title="Sort By Login"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByPerson}
                            onClick={(e) => props.onSortingAttributeChange(e, {sortingCategory: 'login'})}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

GistsNav.propTypes = {
    perPage: PropTypes.number.isRequired,
    onSortingAttributeChange: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onBackSpaceClick: PropTypes.func.isRequired,
    onSelectPerPage: PropTypes.func.isRequired,
    sortingOrder: PropTypes.object.isRequired,
    setSortingOrder: PropTypes.func.isRequired
}

export default GistsNav;