import React, {useState, useEffect} from 'react';
import GistsNav from "./commponents/GistNav/GistsNav";
import GistsContent from "./commponents/GistContent/GistsContent";
import GistPagination from "./commponents/GistPagination/GistPagination";
import './style.scss';


const App = () => {
    const [gists, setGists] = useState([]);
    const [gistsCopy, setGistsCopy] = useState([]);
    const [sortingOrder, setSortingOrder] = useState('desc');
    const [sortingAttribute, setSortingAttribute] = useState('login');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [content, setContent] = useState('');


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
     * Handle every change of content in input element | text sortingByDate excluded
     * @param event
     */
    const onInputChange = (event) => {
        // if icon date selected do not sort with input text
        if(sortingAttribute === 'date') return;
        setContent(event?.target?.value || '');
    }

    useEffect(()=>{
        matchGists();
    }, [content, page, gistsCopy])

    /**
     * Filter Gits to match user pattern
     * @param data
     */
    const matchGists = (data) => {
        let findings = [];
        if(sortingAttribute === 'login') findings = gistsCopy.filter(gist => (gist?.owner?.login?.toLowerCase().search(content) !== -1));
        else if(sortingAttribute === 'description') findings = gistsCopy.filter(gist => gist?.description?.toLowerCase().search(content) !== -1);
        else findings = gistsCopy.filter(gist => true);
        setGists(findings);
    };
    /**
     * Sorting gists by - LOGIN | DATE | DESCRIPTION and ASC | DESC
     */
    const sortGists = () => {
        const compareStrings = (a, b) => {
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        }

        if(sortingOrder === 'desc'){
            if(sortingAttribute === 'login') gists.sort((a, b) => compareStrings(a?.owner?.login?.toLowerCase(), b?.owner?.login?.toLowerCase()));
            if(sortingAttribute === 'date') gists.sort((a, b) => compareStrings(a?.updated_at, b?.updated_at));
            if(sortingAttribute === 'description') gists.sort((a, b) => compareStrings(a?.description?.toLowerCase(), b?.description?.toLowerCase()));
        }else{
            if(sortingAttribute === 'login') gists.sort((a, b) => compareStrings(b?.owner?.login?.toLowerCase(), a?.owner?.login?.toLowerCase()));
            if(sortingAttribute === 'date') gists.sort((a, b) => compareStrings(b?.updated_at, a?.updated_at));
            if(sortingAttribute === 'description') gists.sort((a, b) => compareStrings(b?.description?.toLowerCase(), a?.description?.toLowerCase()));
        }
        setGists(gists);
    }
    /**
     * NEXT page
     */
    const onNextPageClick = () => {
        if((page * perPage) >= 2999) return;
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
                // filter data here also
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