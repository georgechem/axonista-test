import React, {useState, useEffect} from 'react';
import GistsNav from "./commponents/GistNav/GistsNav";
import GistsContent from "./commponents/GistContent/GistsContent";
import GistPagination from "./commponents/GistPagination/GistPagination";
import './style.scss';


const App = () => {
    const [gists, setGists] = useState([]);
    const [gistsCopy, setGistsCopy] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [content, setContent] = useState('');
    const [sortingOrder, setSortingOrder] = useState({direction: 'desc'});
    const [sortingAttribute, setSortingAttribute] = useState({sortingCategory: 'login'});

    /**
     * array of elements ID for all SortBy Switches in Nav
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
     * Restore all gists as user modifying input value
     * @param event
     */
    const onBackSpaceClick = (event) => {
        if(event.key === 'Backspace' || event.code === 'Backspace'){
            setGists(gistsCopy);
        }
    }

    /**
     * Handle every change of content in input element | text sortingByDate excluded
     * @param event
     */
    const onInputChange = (event) => {
        // if icon date selected do not sort with input text
        if(sortingAttribute.sortingCategory === 'date') return;
        setContent(event?.target?.value || '');
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
        sortGists();
    }

    /**
     * Filter Gits to match user pattern
     * @param data
     */
    const matchGists = (data) => {
        let findings = [];
        if(sortingAttribute.sortingCategory === 'login') findings = gistsCopy.filter(gist => (gist?.owner?.login?.toLowerCase().search(content) !== -1));
        else if(sortingAttribute.sortingCategory === 'description') findings = gistsCopy.filter(gist => gist?.description?.toLowerCase().search(content) !== -1);
        else findings = gistsCopy.filter(gist => true);
        setGists(findings);
    };

    /**
     * Sorting gists by - LOGIN | DATE | DESCRIPTION and ASC | DESC
     */
    const sortGists = () => {
        const tmp = [...gistsCopy];
        const compareStrings = (a, b) => {
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
        }

        if(sortingOrder.direction === 'desc'){
            if(sortingAttribute.sortingCategory === 'login') tmp.sort((a, b) => compareStrings(a?.owner?.login?.toLowerCase(), b?.owner?.login?.toLowerCase()));
            if(sortingAttribute.sortingCategory === 'date') tmp.sort((a, b) => compareStrings(a?.updated_at, b?.updated_at));
            if(sortingAttribute.sortingCategory === 'description') tmp.sort((a, b) => compareStrings(a?.description?.toLowerCase(), b?.description?.toLowerCase()));
        }else{
            if(sortingAttribute.sortingCategory === 'login') tmp.sort((a, b) => compareStrings(b?.owner?.login?.toLowerCase(), a?.owner?.login?.toLowerCase()));
            if(sortingAttribute.sortingCategory === 'date') tmp.sort((a, b) => compareStrings(b?.updated_at, a?.updated_at));
            if(sortingAttribute.sortingCategory === 'description') tmp.sort((a, b) => compareStrings(b?.description?.toLowerCase(), a?.description?.toLowerCase()));
        }
        setGists(tmp);
    }
    // Sort gists at direction sort change
    useEffect(() => {
        sortGists();
    }, [sortingOrder, sortingAttribute])
    /*
    useEffect(() => {
        sortGists();
    },[page, perPage])*/

    useEffect(() => {
        const el = document.getElementById('sortOrderBtn');
        el.classList.toggle('rotate180deg');
    }, [sortingOrder]);

    /**
     * Make sure one of button is pressed when application starts
     */
    useEffect(()=>{
        onSortBy('sortByLoginSwitch', sortingAttribute);
    },[]);

    useEffect(()=>{
        matchGists();
    }, [gistsCopy]);


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
        const value = parseInt(options[index].value) | 1;
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
                setGists([]);
                setGistsCopy(data);
                sortGists();
            })
            .catch(err => {
                console.log(err);
            });
    },[page, perPage]);

    return (
        <div>
            <GistsNav
                perPage={perPage}
                onSortBy={onSortBy}
                onInputChange={onInputChange}
                onBackSpaceClick={onBackSpaceClick}
                onSelectPerPageFn={onSelectPerPage}
                sortingOrder={sortingOrder} setSortingOrder={setSortingOrder}
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