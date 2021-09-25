import React from 'react';
import PropTypes from 'prop-types';

import './gistContent.scss';

import svgDate from './icons/schedule_black_24dp.svg';
import svgUser from './icons/person_black_24dp.svg';
import svgLink from './icons/link_black_24dp.svg';

const GistsContent = ({gist}) => {

    /**
     * Returns properly formatted date OR time - date OR N/A
     * @param dateString
     * @param mode
     * @returns {string}
     */
    const formatDate = (dateString, mode='date') => {
        if(typeof dateString === 'string'){
            const date = new Date(dateString);
            if(date.toString() !== 'Invalid Date'){
                if(mode === 'date'){
                    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                }else{
                    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} - 
                ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                }
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
                        <span>{gist?.owner?.login}</span>
                    </div>
                </div>
                <hr/>
                <div className="gistContent__body">
                    <div className="gistsContent__body__top">
                        <img className="gistsContent__body__avatar" src={gist?.owner?.avatar_url}/>
                        <div className="gistsContent__body__link">
                            <img src={svgLink}/>
                            <a href={gist?.owner?.html_url} target="_blank">Go to Repository</a>
                        </div>
                    </div>
                    <div className="gistsContent__body__info">
                        <p>updated:{formatDate(gist?.updated_at, 'full')}</p>
                        <div className="gistsContent__body__info__desc">
                            <p><em>{gist?.description}</em></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

GistsContent.propTypes = {
    gist: PropTypes.object.isRequired,
}

export default GistsContent;