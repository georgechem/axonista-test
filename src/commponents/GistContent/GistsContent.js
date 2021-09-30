import React from 'react';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';

import './gistContent.scss';

const GistsContent = ({gist}) => {

    /**
     * From react-id-generator by Tomek Mularczyk
     * @type {string}
     */
    const htmlId = nextId();

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
    /**
     * Reveals details of clicked file
     * @param e
     */
    const onFilenameClick = (e) => {
        const el = document.getElementById(e.target.id);
        let next = el.nextSibling;
        while(next){
            next.classList.toggle('hidden');
            next = next.nextSibling;
        }

    }

    return (
        <>
            <div className="gist">
                <table>
                    <thead>
                        <tr className="gist__row__header">
                            <th className="gist__cell">
                                <div className="gist__heading">
                                    <div className="gist__heading-text">
                                        <small>Created At</small>
                                    </div>
                                    <small
                                        title="created at"
                                    >
                                        {formatDate(gist?.created_at)}
                                    </small>

                                </div>

                            </th>
                            <th className="gist__cell">
                                <div className="gist__heading">
                                    <div className="gist__heading-text">
                                        <small>Avatar</small>
                                    </div>
                                </div>
                            </th>
                            <th className="gist__cell">
                                <div className="gist__heading">
                                    <div className="gist__heading-text">
                                        <small>Files</small>
                                    </div>
                                </div>
                            </th>
                            <th className="gist__cell">
                                <div className="gist__heading">
                                    <div className="gist__heading-text">
                                        <small>Links</small>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr className="gist__row__body">
                        <td>
                            <div
                                className="gist__body"
                            >
                            </div>
                        </td>
                        <td>
                            <div className="gist__body">
                                <img
                                    className="gist__avatar"
                                    src={gist?.owner?.avatar_url}
                                    alt="user avatar"
                                    title="avatar"
                                />
                            </div>
                        </td>
                        <td>
                            <div className="gist__body">
                                <ul className="gist__body__list">
                                    {Object.values(gist?.files || {}).map((file, key) =>
                                        <li
                                            className="gits__body__list__item"
                                            key={'files_'+key}>
                                            <div className="gist__body__list__item-files">
                                                <small
                                                    id={htmlId + key}
                                                    onClick={onFilenameClick}
                                                >{file?.filename?.slice(0,25) || 'n/a'}</small>
                                                <small className="hidden">language: {file?.language?.slice(0,20) || 'n/a'}</small>
                                                <small className="hidden">size: {((+parseInt(file?.size)/1024)?.toFixed(1) + 'kB')?.slice(0,20) || 'n/a'}</small>
                                                <small className="hidden">type: {file?.type?.slice(0, 20) || 'n/a'}</small>
                                            </div>
                                        </li>)}
                                </ul>
                            </div>
                        </td>
                        <td>
                            <div className="gist__body">
                                <ul className="gist__body__list">
                                    <li><a href={gist?.url} target="_blank">Gist Url</a></li>
                                    <li><a href={gist?.forks_url} target="_blank">Forks Url</a></li>
                                    <li><a href={gist?.commits_url} target="_blank">Commits URL</a></li>
                                    <li><a href={gist?.html_url} target="_blank">Html URL</a></li>
                                    <li><a href={gist?.owner?.repos_url} target="_blank">Repos URL</a></li>
                                    <li><a href={gist?.owner?.url} target="_blank">Owner URL</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                        <tr className="gist__row__footer">
                            <td className="gist__footer">
                                <div className="gist__footer-text">
                                    <small>Last update</small>
                                    <span
                                        title="last updated at"
                                    >
                                        <small>{formatDate(gist?.updated_at, 'full')}</small>
                                </span>
                                </div>
                            </td>
                            <td>
                                <div className="gist__footer-text">
                                    <small>Owner login</small>
                                    <span
                                        title="owner login"
                                    >
                                        <small>{gist?.owner?.login || 'n/a'}</small>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div>

                                </div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </>
    );
};

GistsContent.propTypes = {
    gist: PropTypes.object.isRequired,
}

export default GistsContent;