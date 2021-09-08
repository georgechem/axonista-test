import React from 'react';

import svgSortOrder from './icons/sort_black_24dp.svg';
import svgByDate from './icons/date_range_black_24dp.svg';
import './gistNav.scss';



const GistsNav = ({onSortingOrderChange, sortingAttribute, setSortingAttribute}) => {

    const onSortByDateSwitchClick = () => {
        const el = document.getElementById('sortByDateSwitch');
        el.classList.toggle('turnedOn');
        if(el.classList.contains('turnedOn')){
            setSortingAttribute('date');
        }else{
            setSortingAttribute('login');
        }
    }

    return (
        <div className="gistNav">
            <div className="gistNav__top">
                <input className="gistNav__top__input" type="text" name="input"/>
                <div className="gistNav__top__buttons">
                    <img
                        className="gistNav__top__buttons__sortOrder"
                        src={svgSortOrder}
                        onClick={onSortingOrderChange}
                    alt="icon order"/>
                    <div className="gistNav__top__buttons__switchGroup">
                        <p>Sort By:&nbsp;</p>
                        <img
                            id="sortByDateSwitch"
                            className="gistNav__top__buttons__switchGroup__switch"
                            src={svgByDate}
                            onClick={onSortByDateSwitchClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GistsNav;