import React, {useEffect} from 'react';

import svgSortOrder from './icons/sort_black_24dp.svg';
import svgByDate from './icons/date_range_black_24dp.svg';
import svgByDescription from './icons/description_black_24dp.svg';
import svgByPerson from './icons/person_black_24dp.svg';

import './gistNav.scss';



const GistsNav = ({
                      gists,
                      setGists,
                      gistsCopy,
                      onSortingOrderChange,
                      sortingAttribute,
                      setSortingAttribute,
                      onInputChange}) => {

    const allSwitches = ['sortByDateSwitch', 'sortByDescriptionSwitch', 'sortByLoginSwitch'];

    const turnOfAllSwitches = () => {
        allSwitches.forEach((switchButton) => {
            const el = document?.getElementById(switchButton);
            if(el !== null){
                el.classList.remove('turnedOn');
            }
        })
    }

    useEffect(()=>{
        onSortBy('sortByLoginSwitch', sortingAttribute);
    },[]);

    const onBackSpaceClick = (e) => {
        if(e.key === 'Backspace' || e.code === 'Backspace'){
            setGists(gistsCopy);
        }
    }

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
                <input
                    id="inputSearch"
                    className="gistNav__top__input"
                    type="text"
                    name="input"
                    onChange={onInputChange}
                    onKeyDown={onBackSpaceClick}
                />
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

export default GistsNav;