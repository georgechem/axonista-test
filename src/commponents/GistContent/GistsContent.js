import React from 'react';

import './gistContent.scss';

import svgDate from './icons/schedule_black_24dp.svg';
import svgUser from './icons/person_black_24dp.svg';
import svgLink from './icons/link_black_24dp.svg';

const GistsContent = ({gist}) => {

    const addLeadingZero = (number) => {
        let value = parseInt(number);
        if(value < 10){
            return ('0' + value.toString());
        }else{
            return value.toString();
        }
    }

    const formatDate = (dateString, mode='date') => {
        if(dateString !== null){
            const date = new Date(dateString);

            if(mode === 'date'){
                return `${addLeadingZero(date.getDate())}/${addLeadingZero(date.getMonth() + 1)}/${date.getFullYear()}`;
            }else{
                return `${date.getHours()}:${addLeadingZero(date.getMinutes())}:${addLeadingZero(date.getSeconds())} - 
                ${addLeadingZero(date.getDate())}/${addLeadingZero(date.getMonth() + 1)}/${date.getFullYear()}`;
            }

        }
        return 'N/A';
    }

    return (
        <div className="gistsContent">
            <div className="gistsContent__item">
                <div className="gistsContent__header">
                    <div className="gistsContent__header__bar">
                        <img className="gistsContent__header_svgDate" src={svgDate} alt="time_icon"/>
                        <span>{formatDate(gist?.created_at)}</span>
                    </div>
                    <div className="gistsContent__header__bar">
                        <img src={svgUser} alt="person_icon"/>
                        <span>{gist?.owner.login}</span>
                    </div>
                </div>
                <hr/>
                <div className="gistContent__body">
                    <div className="gistsContent__body__top">
                        <img className="gistsContent__body__avatar" src={gist?.owner.avatar_url}/>
                        <div className="gistsContent__body__link">
                            <img src={svgLink}/>
                            <a href={gist?.owner.html_url} target="_blank">Go to Repository</a>
                        </div>
                    </div>
                    <div className="gistsContent__body__info">
                        updated:{formatDate(gist?.updated_at, 'full')}
                        <div className="gistsContent__body__info__desc">
                            <p><em>{gist?.description}</em></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GistsContent;