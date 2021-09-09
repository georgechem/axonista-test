import React, {useState, useEffect} from 'react';
import GistsNav from "./commponents/GistNav/GistsNav";
import GistsContent from "./commponents/GistContent/GistsContent";

import './style.scss';
import GistPagination from "./commponents/GistPagination/GistPagination";


const App = () => {
    const [gists, setGists] = useState([]);
    const [gistsCopy, setGistsCopy] = useState([]);
    const [sortingOrder, setSortingOrder] = useState('desc');
    const [sortingAttribute, setSortingAttribute] = useState('login');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);

    /**
     * Handle Sorting Icon appearance change and fires sorting function
     */
    const onSortingOrderChange = () => {
        const el = document.getElementsByClassName('gistNav__top__buttons__sortOrder')[0];
        if(sortingOrder === 'asc'){
            setSortingOrder( 'desc');
            el.classList.remove('rotate180deg');
        }else{
            setSortingOrder( 'asc');
            el.classList.add('rotate180deg');
        }
        sortGists();
    }
    /**
     * Limit number of gists to those who met searching criteria
     * @param content
     */
    const findGistsWithContent = (content) => {

        const findings = [];
        if(sortingAttribute === 'login'){
            gists.forEach(gist => {
                if(gist?.owner?.login?.search(content) !== -1){
                    findings.push(gist);
                }
            })
        }
        else if(sortingAttribute === 'description'){
            gists.forEach(gist => {
                if(gist?.description?.search(content) !== -1){
                    findings.push(gist);
                }
            });
        }
        setGists(findings);
    }
    /**
     * Handle every change of content in input element | sortingByDate excluded
     * @param event
     */
    const onInputChange = (event) => {
        const content = event.target.value;
        if(sortingAttribute === 'date') return;
        findGistsWithContent(content);
    }
    /**
     * Sorting gists by - LOGIN | DATE | DESCRIPTION and ASC | DESC
     */
    const sortGists = () => {
        const compareStrings = (a, b, type = sortingAttribute) => {
            let gistA = '';
            let gistB = '';
            if(sortingAttribute === 'login'){
                gistA = a?.owner?.login?.toLowerCase();
                gistB = b?.owner?.login?.toLowerCase();
            }else if(sortingAttribute === 'date'){
                gistA = a?.updated_at;
                gistB = b?.updated_at;
            }else if(sortingAttribute === 'description'){
                gistA = a?.description?.toLowerCase();
                gistB = b?.description?.toLowerCase();
            }
            if(gistA < gistB){
                return -1;
            }
            if(gistA > gistB){
                return 1;
            }
            return 0;
        }
            if(sortingOrder === 'desc'){
                //gistsCopy.sort((a, b) => b.owner.id - a.owner.id);
                gists.sort((a,b) => compareStrings(a, b, sortingAttribute));

            }else{
                //gistsCopy.sort((a,b) => a.owner.id- b.owner.id);
                gists.sort((a, b) => compareStrings(b, a, sortingAttribute));
            }
        setGists(gists);
    }
    /**
     * NEXT page
     */
    const onNextPageClick = () => {
        setPage(page + 1);
    }
    /**
     * PREV page
     */
    const onPrevPageClick = () => {
        if(page === 1) return;
        setPage(page - 1);
    }
    /**
     * Set elements per Page
     */
    const onSelectPerPage = (e) => {
        const options = e.target.options;
        const index = e.target.options.selectedIndex;
        const value = parseInt(options[index].value);
        setPerPage(value);
    }

    /**
     * Fetch data from Github API
     */
    useEffect(()=>{
        const url = `https://api.github.com/gists?page=${page}&per_page=${perPage}`;
        fetch(url,{
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setGists(data);
                setGistsCopy(data);
            })
            .catch(err => {
                console.log(err);
            });
    },[page, perPage]);

    return (
        <div>
            <GistsNav
                gists={gists}
                setGists={setGists}
                gistsCopy={gistsCopy}
                onSortingOrderChange={onSortingOrderChange}

                sortingAttribute={sortingAttribute}
                setSortingAttribute={setSortingAttribute}

                onInputChange={onInputChange}
                onSelectPerPage={onSelectPerPage}
            />
            {gists?.map((gist, key) => <GistsContent
                key={'gistKey_' + key}
                gist={gist}
                gists={gists}
            />)}
            <GistPagination
                onNextPageClick={onNextPageClick}
                page={page}
                onPrevPageClick={onPrevPageClick}
            />
        </div>
    );
};

export default App;