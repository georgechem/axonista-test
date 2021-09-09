import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import svgSortOrder from './icons/sort_black_24dp.svg';
import svgByDate from './icons/date_range_black_24dp.svg';
import svgByDescription from './icons/description_black_24dp.svg';
import svgByPerson from './icons/person_black_24dp.svg';

import './gistNav.scss';

const GistsNav = ({
                      setGists, gistsCopy,
                      onSortingOrderChange, sortingAttribute,
                      setSortingAttribute, onInputChange,
                      onSelectPerPage,}) => {

    /**
     * array of elements ID for all SortBy button in Nav
     * @type {string[]}
     */
    const allSwitches = ['sortByDateSwitch', 'sortByDescriptionSwitch', 'sortByLoginSwitch'];

    /**
     * Remove certain class from all SortBy buttons
     */
    const turnOfAllSwitches = () => {
        allSwitches.forEach((switchButton) => {
            const el = document?.getElementById(switchButton);
            if(el !== null){
                el.classList.remove('turnedOn');
            }
        })
    }
    /**
     * Make sure one of button is pressed when application starts
     */
    useEffect(()=>{
        onSortBy('sortByLoginSwitch', sortingAttribute);
    },[]);

    /**
     * Restore all gists as user modifying input value
     * @param event
     */
    const onBackSpaceClick = (event) => {
        if(event.key === 'Backspace' || event.code === 'Backspace'){
            setGists(gistsCopy);
        }
    }
    /**
     * Set SortingAttribute & make button pressed by adding class
     * @param elementId
     * @param state
     */
    const onSortBy = (elementId, state) => {
        const el = document?.getElementById(elementId);
        if(el !== null){
            turnOfAllSwitches();
            el.classList.add('turnedOn');
            setSortingAttribute(state);
        }

    }

    const onSortByDateSwitchClick = () => {
        onSortBy('sortByDateSwitch', 'date');
    }
    const onSortByDescriptionSwitchClick = () => {
        onSortBy('sortByDescriptionSwitch', 'description');
    }
    const onSortByLoginSwitchClick = () => {
        onSortBy('sortByLoginSwitch', 'login');
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
                        onChange={onInputChange}
                        onKeyDown={onBackSpaceClick}
                    />
                    <select
                        className="gistNav__top__select"
                        id="itemsPerPage"
                        name="itemsPerPage"
                        onChange={onSelectPerPage}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div className="gistNav__top__buttons">
                    <img
                        title="Sort Order"
                        className="gistNav__top__buttons__sortOrder"
                        src={svgSortOrder}
                        onClick={onSortingOrderChange}
                    alt="icon order"/>
                    <div className="gistNav__top__buttons__switchGroup">
                        <p>Sort By:&nbsp;</p>
                        <img
                            id="sortByDateSwitch"
                            title="Sort By Date"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByDate}
                            onClick={onSortByDateSwitchClick}
                        />
                        <img
                            id="sortByDescriptionSwitch"
                            title="Sort By Description"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByDescription}
                            onClick={onSortByDescriptionSwitchClick}
                        />
                        <img
                            id="sortByLoginSwitch"
                            title="Sort By Login"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByPerson}
                            onClick={onSortByLoginSwitchClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

GistsNav.propTypes = {
    setGists: PropTypes.func.isRequired,
    gistsCopy: PropTypes.array.isRequired,
    onSortingOrderChange: PropTypes.func.isRequired,
    sortingAttribute: PropTypes.string.isRequired,
    setSortingAttribute: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSelectPerPage: PropTypes.func.isRequired
}

export default GistsNav;